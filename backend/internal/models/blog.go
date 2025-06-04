package models

import (
	"database/sql"
	"errors"
	"fmt"
	"html"
	"os"
	"strings"
	"time"

	"github.com/dottrip/fpt-swp/internal/database"
)

// BlogPost represents a blog post in the system
type BlogPost struct {
	ID          int        `json:"id"`
	Title       string     `json:"title"`
	Content     string     `json:"content"`
	Excerpt     string     `json:"excerpt"`
	Thumbnail   string     `json:"thumbnail"`
	AuthorID    int        `json:"author_id"`
	AuthorName  string     `json:"author_name"`
	Status      string     `json:"status"` // draft, published, archived
	Category    string     `json:"category"`
	Tags        string     `json:"tags"` // comma-separated
	ViewCount   int        `json:"view_count"`
	CreatedAt   time.Time  `json:"created_at"`
	UpdatedAt   time.Time  `json:"updated_at"`
	PublishedAt *time.Time `json:"published_at,omitempty"`
}

// BlogPostFilter represents filter options for blog posts
type BlogPostFilter struct {
	Status    string
	Category  string
	AuthorID  int
	Search    string
	Limit     int
	Offset    int
	SortBy    string // title, created_at, updated_at, view_count
	SortOrder string // asc, desc
}

// getEnvBlog gets an environment variable or returns a default value
func getEnvBlog(key, defaultValue string) string {
	value := os.Getenv(key)
	if value == "" {
		return defaultValue
	}
	return value
}

// getPlaceholderBlog returns the correct placeholder for the database type
func getPlaceholderBlog(index int) string {
	dbType := getEnvBlog("DB_TYPE", "postgres")
	if dbType == "sqlite" {
		return "?"
	}
	return fmt.Sprintf("$%d", index)
}

// BeforeSave sanitizes blog post data before saving
func (b *BlogPost) BeforeSave() error {
	// Sanitize input
	b.Title = html.EscapeString(strings.TrimSpace(b.Title))
	b.Category = html.EscapeString(strings.TrimSpace(b.Category))
	b.Tags = html.EscapeString(strings.TrimSpace(b.Tags))
	b.Thumbnail = html.EscapeString(strings.TrimSpace(b.Thumbnail))

	// Generate excerpt if not provided
	if b.Excerpt == "" && len(b.Content) > 200 {
		b.Excerpt = b.Content[:200] + "..."
	}

	return nil
}

// Validate validates the blog post data
func (b *BlogPost) Validate() error {
	if b.Title == "" {
		return errors.New("title is required")
	}
	if b.Content == "" {
		return errors.New("content is required")
	}
	if b.AuthorID == 0 {
		return errors.New("author ID is required")
	}
	if b.Status == "" {
		b.Status = "draft"
	}
	if b.Status != "draft" && b.Status != "published" && b.Status != "archived" {
		return errors.New("status must be draft, published, or archived")
	}
	return nil
}

// Create creates a new blog post in the database
func (b *BlogPost) Create() error {
	if err := b.Validate(); err != nil {
		return err
	}
	if err := b.BeforeSave(); err != nil {
		return err
	}

	dbType := getEnvBlog("DB_TYPE", "postgres")

	if dbType == "sqlite" {
		query := `
			INSERT INTO blog_posts (title, content, excerpt, thumbnail, author_id, status, category, tags, created_at, updated_at)
			VALUES (?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
		`

		result, err := database.DB.Exec(query, b.Title, b.Content, b.Excerpt, b.Thumbnail, b.AuthorID, b.Status, b.Category, b.Tags)
		if err != nil {
			return err
		}

		id, err := result.LastInsertId()
		if err != nil {
			return err
		}
		b.ID = int(id)

		// Get the created timestamps
		selectQuery := `SELECT created_at, updated_at FROM blog_posts WHERE id = ?`
		err = database.DB.QueryRow(selectQuery, b.ID).Scan(&b.CreatedAt, &b.UpdatedAt)
		if err != nil {
			return err
		}
	} else {
		query := `
			INSERT INTO blog_posts (title, content, excerpt, thumbnail, author_id, status, category, tags)
			VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
			RETURNING id, created_at, updated_at
		`

		err := database.DB.QueryRow(
			query, b.Title, b.Content, b.Excerpt, b.Thumbnail, b.AuthorID, b.Status, b.Category, b.Tags,
		).Scan(&b.ID, &b.CreatedAt, &b.UpdatedAt)

		if err != nil {
			return err
		}
	}

	// Set published_at if status is published
	if b.Status == "published" {
		now := time.Now()
		b.PublishedAt = &now
		b.UpdatePublishedAt()
	}

	return nil
}

// Update updates an existing blog post
func (b *BlogPost) Update() error {
	if err := b.Validate(); err != nil {
		return err
	}
	if err := b.BeforeSave(); err != nil {
		return err
	}

	dbType := getEnvBlog("DB_TYPE", "postgres")

	var query string
	if dbType == "sqlite" {
		query = `
			UPDATE blog_posts 
			SET title = ?, content = ?, excerpt = ?, thumbnail = ?, status = ?, category = ?, tags = ?, updated_at = CURRENT_TIMESTAMP
			WHERE id = ?
		`
		_, err := database.DB.Exec(query, b.Title, b.Content, b.Excerpt, b.Thumbnail, b.Status, b.Category, b.Tags, b.ID)
		if err != nil {
			return err
		}
	} else {
		query = `
			UPDATE blog_posts 
			SET title = $1, content = $2, excerpt = $3, thumbnail = $4, status = $5, category = $6, tags = $7, updated_at = CURRENT_TIMESTAMP
			WHERE id = $8
			RETURNING updated_at
		`
		err := database.DB.QueryRow(query, b.Title, b.Content, b.Excerpt, b.Thumbnail, b.Status, b.Category, b.Tags, b.ID).Scan(&b.UpdatedAt)
		if err != nil {
			return err
		}
	}

	// Set published_at if status changed to published
	if b.Status == "published" && b.PublishedAt == nil {
		now := time.Now()
		b.PublishedAt = &now
		b.UpdatePublishedAt()
	}

	return nil
}

// UpdatePublishedAt updates the published_at timestamp
func (b *BlogPost) UpdatePublishedAt() error {
	dbType := getEnvBlog("DB_TYPE", "postgres")

	var query string
	if dbType == "sqlite" {
		query = "UPDATE blog_posts SET published_at = CURRENT_TIMESTAMP WHERE id = ?"
		_, err := database.DB.Exec(query, b.ID)
		return err
	} else {
		query = "UPDATE blog_posts SET published_at = CURRENT_TIMESTAMP WHERE id = $1"
		_, err := database.DB.Exec(query, b.ID)
		return err
	}
}

// Delete deletes a blog post
func (b *BlogPost) Delete() error {
	dbType := getEnvBlog("DB_TYPE", "postgres")

	var query string
	if dbType == "sqlite" {
		query = "DELETE FROM blog_posts WHERE id = ?"
		_, err := database.DB.Exec(query, b.ID)
		return err
	} else {
		query = "DELETE FROM blog_posts WHERE id = $1"
		_, err := database.DB.Exec(query, b.ID)
		return err
	}
}

// GetBlogPostByID retrieves a blog post by ID
func GetBlogPostByID(id int) (*BlogPost, error) {
	post := &BlogPost{}
	dbType := getEnvBlog("DB_TYPE", "postgres")

	var query string
	if dbType == "sqlite" {
		query = `
			SELECT bp.id, bp.title, bp.content, bp.excerpt, bp.thumbnail, bp.author_id, u.username as author_name,
				   bp.status, bp.category, bp.tags, bp.view_count, bp.created_at, bp.updated_at, bp.published_at
			FROM blog_posts bp
			LEFT JOIN users u ON bp.author_id = u.id
			WHERE bp.id = ?
		`
	} else {
		query = `
			SELECT bp.id, bp.title, bp.content, bp.excerpt, bp.thumbnail, bp.author_id, u.username as author_name,
				   bp.status, bp.category, bp.tags, bp.view_count, bp.created_at, bp.updated_at, bp.published_at
			FROM blog_posts bp
			LEFT JOIN users u ON bp.author_id = u.id
			WHERE bp.id = $1
		`
	}

	err := database.DB.QueryRow(query, id).Scan(
		&post.ID, &post.Title, &post.Content, &post.Excerpt, &post.Thumbnail, &post.AuthorID, &post.AuthorName,
		&post.Status, &post.Category, &post.Tags, &post.ViewCount, &post.CreatedAt, &post.UpdatedAt, &post.PublishedAt,
	)

	if err != nil {
		return nil, err
	}

	return post, nil
}

// GetBlogPosts retrieves blog posts with filtering
func GetBlogPosts(filter BlogPostFilter) ([]BlogPost, error) {
	var posts []BlogPost
	dbType := getEnvBlog("DB_TYPE", "postgres")

	// Build query with filters
	baseQuery := `
		SELECT bp.id, bp.title, bp.content, bp.excerpt, bp.thumbnail, bp.author_id, u.username as author_name,
			   bp.status, bp.category, bp.tags, bp.view_count, bp.created_at, bp.updated_at, bp.published_at
		FROM blog_posts bp
		LEFT JOIN users u ON bp.author_id = u.id
		WHERE 1=1
	`

	var args []interface{}
	argIndex := 1

	// Add filters
	if filter.Status != "" {
		if dbType == "sqlite" {
			baseQuery += " AND bp.status = ?"
		} else {
			baseQuery += fmt.Sprintf(" AND bp.status = $%d", argIndex)
		}
		args = append(args, filter.Status)
		argIndex++
	}

	if filter.Category != "" {
		if dbType == "sqlite" {
			baseQuery += " AND bp.category = ?"
		} else {
			baseQuery += fmt.Sprintf(" AND bp.category = $%d", argIndex)
		}
		args = append(args, filter.Category)
		argIndex++
	}

	if filter.AuthorID != 0 {
		if dbType == "sqlite" {
			baseQuery += " AND bp.author_id = ?"
		} else {
			baseQuery += fmt.Sprintf(" AND bp.author_id = $%d", argIndex)
		}
		args = append(args, filter.AuthorID)
		argIndex++
	}

	if filter.Search != "" {
		if dbType == "sqlite" {
			baseQuery += " AND (bp.title LIKE ? OR bp.content LIKE ?)"
		} else {
			baseQuery += fmt.Sprintf(" AND (bp.title ILIKE $%d OR bp.content ILIKE $%d)", argIndex, argIndex+1)
		}
		searchTerm := "%" + filter.Search + "%"
		args = append(args, searchTerm, searchTerm)
		argIndex += 2
	}

	// Add sorting
	if filter.SortBy != "" {
		sortOrder := "DESC"
		if filter.SortOrder == "asc" {
			sortOrder = "ASC"
		}
		baseQuery += fmt.Sprintf(" ORDER BY bp.%s %s", filter.SortBy, sortOrder)
	} else {
		baseQuery += " ORDER BY bp.created_at DESC"
	}

	// Add pagination
	if filter.Limit > 0 {
		if dbType == "sqlite" {
			baseQuery += " LIMIT ?"
		} else {
			baseQuery += fmt.Sprintf(" LIMIT $%d", argIndex)
		}
		args = append(args, filter.Limit)
		argIndex++

		if filter.Offset > 0 {
			if dbType == "sqlite" {
				baseQuery += " OFFSET ?"
			} else {
				baseQuery += fmt.Sprintf(" OFFSET $%d", argIndex)
			}
			args = append(args, filter.Offset)
		}
	}

	rows, err := database.DB.Query(baseQuery, args...)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		var post BlogPost
		err := rows.Scan(
			&post.ID, &post.Title, &post.Content, &post.Excerpt, &post.Thumbnail, &post.AuthorID, &post.AuthorName,
			&post.Status, &post.Category, &post.Tags, &post.ViewCount, &post.CreatedAt, &post.UpdatedAt, &post.PublishedAt,
		)
		if err != nil {
			return nil, err
		}
		posts = append(posts, post)
	}

	return posts, nil
}

// IncrementViewCount increments the view count for a blog post
func (b *BlogPost) IncrementViewCount() error {
	dbType := getEnvBlog("DB_TYPE", "postgres")

	var query string
	if dbType == "sqlite" {
		query = "UPDATE blog_posts SET view_count = view_count + 1 WHERE id = ?"
		_, err := database.DB.Exec(query, b.ID)
		return err
	} else {
		query = "UPDATE blog_posts SET view_count = view_count + 1 WHERE id = $1"
		_, err := database.DB.Exec(query, b.ID)
		return err
	}
}

// GetBlogStats returns blog statistics
func GetBlogStats() (map[string]interface{}, error) {
	stats := make(map[string]interface{})
	dbType := getEnvBlog("DB_TYPE", "postgres")

	// Total posts
	var totalPosts int
	query := "SELECT COUNT(*) FROM blog_posts"
	err := database.DB.QueryRow(query).Scan(&totalPosts)
	if err != nil {
		return nil, err
	}
	stats["total_posts"] = totalPosts

	// Published posts
	var publishedPosts int
	if dbType == "sqlite" {
		query = "SELECT COUNT(*) FROM blog_posts WHERE status = ?"
	} else {
		query = "SELECT COUNT(*) FROM blog_posts WHERE status = $1"
	}
	err = database.DB.QueryRow(query, "published").Scan(&publishedPosts)
	if err != nil {
		return nil, err
	}
	stats["published_posts"] = publishedPosts

	// Draft posts
	var draftPosts int
	err = database.DB.QueryRow(query, "draft").Scan(&draftPosts)
	if err != nil {
		return nil, err
	}
	stats["draft_posts"] = draftPosts

	// Total views
	var totalViews sql.NullInt64
	query = "SELECT SUM(view_count) FROM blog_posts"
	err = database.DB.QueryRow(query).Scan(&totalViews)
	if err != nil {
		return nil, err
	}
	if totalViews.Valid {
		stats["total_views"] = totalViews.Int64
	} else {
		stats["total_views"] = 0
	}

	return stats, nil
}
