package models

import (
	"errors"
	"html"
	"strings"
	"time"

	"github.com/medical/backend/internal/database"
	"golang.org/x/crypto/bcrypt"
)

// User represents a user in the system
type User struct {
	ID        int       `json:"id"`
	Username  string    `json:"username"`
	Email     string    `json:"email"`
	Password  string    `json:"-"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

// BeforeSave is a hook that gets called before saving the user
func (u *User) BeforeSave() error {
	// Hash the password
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(u.Password), bcrypt.DefaultCost)
	if err != nil {
		return err
	}
	u.Password = string(hashedPassword)

	// Sanitize username and email
	u.Username = html.EscapeString(strings.TrimSpace(u.Username))
	u.Email = html.EscapeString(strings.TrimSpace(u.Email))

	return nil
}

// Validate validates the user data
func (u *User) Validate() error {
	if u.Username == "" {
		return errors.New("username is required")
	}
	if u.Email == "" {
		return errors.New("email is required")
	}
	if u.Password == "" {
		return errors.New("password is required")
	}
	if len(u.Password) < 6 {
		return errors.New("password must be at least 6 characters")
	}
	return nil
}

// Create creates a new user in the database
func (u *User) Create() error {
	if err := u.Validate(); err != nil {
		return err
	}
	if err := u.BeforeSave(); err != nil {
		return err
	}

	query := `
		INSERT INTO users (username, email, password)
		VALUES ($1, $2, $3)
		RETURNING id, created_at, updated_at
	`

	err := database.DB.QueryRow(
		query, u.Username, u.Email, u.Password,
	).Scan(&u.ID, &u.CreatedAt, &u.UpdatedAt)

	if err != nil {
		return err
	}

	return nil
}

// GetByEmail retrieves a user by email
func GetByEmail(email string) (*User, error) {
	user := &User{}

	query := `
		SELECT id, username, email, password, created_at, updated_at
		FROM users
		WHERE email = $1
	`

	err := database.DB.QueryRow(query, email).Scan(
		&user.ID, &user.Username, &user.Email, &user.Password, &user.CreatedAt, &user.UpdatedAt,
	)

	if err != nil {
		return nil, err
	}

	return user, nil
}

// GetByID retrieves a user by ID
func GetByID(id int) (*User, error) {
	user := &User{}

	query := `
		SELECT id, username, email, created_at, updated_at
		FROM users
		WHERE id = $1
	`

	err := database.DB.QueryRow(query, id).Scan(
		&user.ID, &user.Username, &user.Email, &user.CreatedAt, &user.UpdatedAt,
	)

	if err != nil {
		return nil, err
	}

	return user, nil
}

// VerifyPassword verifies the password of a user
func (u *User) VerifyPassword(password string) error {
	return bcrypt.CompareHashAndPassword([]byte(u.Password), []byte(password))
} 