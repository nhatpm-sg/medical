package handlers

import (
	"net/http"
	"strconv"

	"github.com/dottrip/fpt-swp/internal/models"
	"github.com/gin-gonic/gin"
)

// BlogResponse represents a standard blog API response
type BlogResponse struct {
	Success bool        `json:"success"`
	Message string      `json:"message,omitempty"`
	Data    interface{} `json:"data,omitempty"`
	Error   string      `json:"error,omitempty"`
}

// CreateBlogPost handles creating a new blog post
func CreateBlogPost(c *gin.Context) {
	var blogPost models.BlogPost
	if err := c.ShouldBindJSON(&blogPost); err != nil {
		c.JSON(http.StatusBadRequest, BlogResponse{
			Success: false,
			Error:   "Invalid JSON format: " + err.Error(),
		})
		return
	}

	// TODO: Get author ID from JWT token/session
	// For now, we'll use the provided author_id or default to 1
	if blogPost.AuthorID == 0 {
		blogPost.AuthorID = 1 // Default author for testing
	}

	if err := blogPost.Create(); err != nil {
		c.JSON(http.StatusInternalServerError, BlogResponse{
			Success: false,
			Error:   err.Error(),
		})
		return
	}

	c.JSON(http.StatusCreated, BlogResponse{
		Success: true,
		Message: "Blog post created successfully",
		Data:    blogPost,
	})
}

// GetBlogPosts handles retrieving blog posts with filtering
func GetBlogPosts(c *gin.Context) {
	// Parse query parameters
	filter := models.BlogPostFilter{}

	if status := c.Query("status"); status != "" {
		filter.Status = status
	}

	if category := c.Query("category"); category != "" {
		filter.Category = category
	}

	if authorIDStr := c.Query("author_id"); authorIDStr != "" {
		if authorID, err := strconv.Atoi(authorIDStr); err == nil {
			filter.AuthorID = authorID
		}
	}

	if search := c.Query("search"); search != "" {
		filter.Search = search
	}

	if limitStr := c.Query("limit"); limitStr != "" {
		if limit, err := strconv.Atoi(limitStr); err == nil && limit > 0 {
			filter.Limit = limit
		}
	} else {
		filter.Limit = 10 // Default limit
	}

	if offsetStr := c.Query("offset"); offsetStr != "" {
		if offset, err := strconv.Atoi(offsetStr); err == nil && offset >= 0 {
			filter.Offset = offset
		}
	}

	if sortBy := c.Query("sort_by"); sortBy != "" {
		// Validate sort fields
		validSorts := []string{"title", "created_at", "updated_at", "view_count", "published_at"}
		for _, valid := range validSorts {
			if sortBy == valid {
				filter.SortBy = sortBy
				break
			}
		}
	}

	if sortOrder := c.Query("sort_order"); sortOrder != "" {
		if sortOrder == "asc" || sortOrder == "desc" {
			filter.SortOrder = sortOrder
		}
	}

	posts, err := models.GetBlogPosts(filter)
	if err != nil {
		c.JSON(http.StatusInternalServerError, BlogResponse{
			Success: false,
			Error:   err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, BlogResponse{
		Success: true,
		Data:    posts,
	})
}

// GetBlogPost handles retrieving a single blog post by ID
func GetBlogPost(c *gin.Context) {
	idStr := c.Param("id")

	id, err := strconv.Atoi(idStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, BlogResponse{
			Success: false,
			Error:   "Invalid blog post ID",
		})
		return
	}

	post, err := models.GetBlogPostByID(id)
	if err != nil {
		c.JSON(http.StatusNotFound, BlogResponse{
			Success: false,
			Error:   "Blog post not found",
		})
		return
	}

	// Increment view count (optional - only if not the author viewing)
	if c.Query("increment_view") == "true" {
		post.IncrementViewCount()
	}

	c.JSON(http.StatusOK, BlogResponse{
		Success: true,
		Data:    post,
	})
}

// UpdateBlogPost handles updating an existing blog post
func UpdateBlogPost(c *gin.Context) {
	idStr := c.Param("id")

	id, err := strconv.Atoi(idStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, BlogResponse{
			Success: false,
			Error:   "Invalid blog post ID",
		})
		return
	}

	// Get existing post
	existingPost, err := models.GetBlogPostByID(id)
	if err != nil {
		c.JSON(http.StatusNotFound, BlogResponse{
			Success: false,
			Error:   "Blog post not found",
		})
		return
	}

	// Parse updated data
	var updatedPost models.BlogPost
	if err := c.ShouldBindJSON(&updatedPost); err != nil {
		c.JSON(http.StatusBadRequest, BlogResponse{
			Success: false,
			Error:   "Invalid JSON format: " + err.Error(),
		})
		return
	}

	// Set ID and author ID from existing post
	updatedPost.ID = existingPost.ID
	updatedPost.AuthorID = existingPost.AuthorID
	updatedPost.CreatedAt = existingPost.CreatedAt
	updatedPost.ViewCount = existingPost.ViewCount

	// TODO: Check if user has permission to update this post
	// (should be author or admin)

	if err := updatedPost.Update(); err != nil {
		c.JSON(http.StatusInternalServerError, BlogResponse{
			Success: false,
			Error:   err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, BlogResponse{
		Success: true,
		Message: "Blog post updated successfully",
		Data:    updatedPost,
	})
}

// DeleteBlogPost handles deleting a blog post
func DeleteBlogPost(c *gin.Context) {
	idStr := c.Param("id")

	id, err := strconv.Atoi(idStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, BlogResponse{
			Success: false,
			Error:   "Invalid blog post ID",
		})
		return
	}

	// Get existing post to check permissions
	existingPost, err := models.GetBlogPostByID(id)
	if err != nil {
		c.JSON(http.StatusNotFound, BlogResponse{
			Success: false,
			Error:   "Blog post not found",
		})
		return
	}

	// TODO: Check if user has permission to delete this post
	// (should be author or admin)

	if err := existingPost.Delete(); err != nil {
		c.JSON(http.StatusInternalServerError, BlogResponse{
			Success: false,
			Error:   err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, BlogResponse{
		Success: true,
		Message: "Blog post deleted successfully",
	})
}

// GetBlogStats handles retrieving blog statistics
func GetBlogStats(c *gin.Context) {
	stats, err := models.GetBlogStats()
	if err != nil {
		c.JSON(http.StatusInternalServerError, BlogResponse{
			Success: false,
			Error:   err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, BlogResponse{
		Success: true,
		Data:    stats,
	})
}

// GetBlogCategories handles retrieving available blog categories
func GetBlogCategories(c *gin.Context) {
	// These could be stored in database or config
	categories := []string{
		"Sức khỏe tổng quát",
		"Tim mạch",
		"Tiêu hóa",
		"Thần kinh",
		"Nhi khoa",
		"Phụ khoa",
		"Da liễu",
		"Mắt",
		"Tai mũi họng",
		"Răng hàm mặt",
		"Dinh dưỡng",
		"Tâm lý",
		"Tin tức y tế",
		"Khuyến mãi",
	}

	c.JSON(http.StatusOK, BlogResponse{
		Success: true,
		Data:    categories,
	})
}

// PublishBlogPost handles publishing a draft blog post
func PublishBlogPost(c *gin.Context) {
	idStr := c.Param("id")

	id, err := strconv.Atoi(idStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, BlogResponse{
			Success: false,
			Error:   "Invalid blog post ID",
		})
		return
	}

	// Get existing post
	post, err := models.GetBlogPostByID(id)
	if err != nil {
		c.JSON(http.StatusNotFound, BlogResponse{
			Success: false,
			Error:   "Blog post not found",
		})
		return
	}

	// Update status to published
	post.Status = "published"
	if err := post.Update(); err != nil {
		c.JSON(http.StatusInternalServerError, BlogResponse{
			Success: false,
			Error:   err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, BlogResponse{
		Success: true,
		Message: "Blog post published successfully",
		Data:    post,
	})
}

// UnpublishBlogPost handles unpublishing a blog post (back to draft)
func UnpublishBlogPost(c *gin.Context) {
	idStr := c.Param("id")

	id, err := strconv.Atoi(idStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, BlogResponse{
			Success: false,
			Error:   "Invalid blog post ID",
		})
		return
	}

	// Get existing post
	post, err := models.GetBlogPostByID(id)
	if err != nil {
		c.JSON(http.StatusNotFound, BlogResponse{
			Success: false,
			Error:   "Blog post not found",
		})
		return
	}

	// Update status to draft
	post.Status = "draft"
	if err := post.Update(); err != nil {
		c.JSON(http.StatusInternalServerError, BlogResponse{
			Success: false,
			Error:   err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, BlogResponse{
		Success: true,
		Message: "Blog post unpublished successfully",
		Data:    post,
	})
}

// GetPublishedBlogPosts returns only published blog posts for public consumption
func GetPublishedBlogPosts(c *gin.Context) {
	// Force status to published for public endpoint
	filter := models.BlogPostFilter{
		Status: "published",
	}

	if category := c.Query("category"); category != "" {
		filter.Category = category
	}

	if search := c.Query("search"); search != "" {
		filter.Search = search
	}

	if limitStr := c.Query("limit"); limitStr != "" {
		if limit, err := strconv.Atoi(limitStr); err == nil && limit > 0 {
			filter.Limit = limit
		}
	} else {
		filter.Limit = 10 // Default limit
	}

	if offsetStr := c.Query("offset"); offsetStr != "" {
		if offset, err := strconv.Atoi(offsetStr); err == nil && offset >= 0 {
			filter.Offset = offset
		}
	}

	// Default sort by published date
	filter.SortBy = "published_at"
	filter.SortOrder = "desc"

	posts, err := models.GetBlogPosts(filter)
	if err != nil {
		c.JSON(http.StatusInternalServerError, BlogResponse{
			Success: false,
			Error:   err.Error(),
		})
		return
	}

	// Remove content field for list view to reduce payload size
	for i := range posts {
		posts[i].Content = ""
	}

	c.JSON(http.StatusOK, BlogResponse{
		Success: true,
		Data:    posts,
	})
}
