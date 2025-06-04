package handlers

import (
	"database/sql"
	"fmt"
	"net/http"
	"strings"

	"github.com/dottrip/fpt-swp/internal/models"
	"github.com/dottrip/fpt-swp/pkg/utils"
	"github.com/gin-gonic/gin"
)

// LoginInput represents the login request body
type LoginInput struct {
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required"`
}

// RegisterInput represents the register request body
type RegisterInput struct {
	Username string `json:"username" binding:"required"`
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required,min=6"`
}

// parseValidationError converts validation errors to user-friendly Vietnamese messages
func parseValidationError(err error) string {
	errMsg := err.Error()

	// Log the original error for debugging
	fmt.Printf("DEBUG - Validation error: %s\n", errMsg)

	// Handle specific Gin validation error patterns
	if strings.Contains(errMsg, "RegisterInput.Password") && strings.Contains(errMsg, "min") {
		fmt.Printf("DEBUG - Matched password min error\n")
		return "Mật khẩu phải có ít nhất 6 ký tự"
	}
	if strings.Contains(errMsg, "RegisterInput.Email") && strings.Contains(errMsg, "email") {
		return "Email không đúng định dạng"
	}
	if strings.Contains(errMsg, "RegisterInput.Username") && strings.Contains(errMsg, "required") {
		return "Tên người dùng là bắt buộc"
	}
	if strings.Contains(errMsg, "RegisterInput.Email") && strings.Contains(errMsg, "required") {
		return "Email là bắt buộc"
	}
	if strings.Contains(errMsg, "RegisterInput.Password") && strings.Contains(errMsg, "required") {
		return "Mật khẩu là bắt buộc"
	}

	// Handle LoginInput validation errors
	if strings.Contains(errMsg, "LoginInput.Email") && strings.Contains(errMsg, "email") {
		return "Email không đúng định dạng"
	}
	if strings.Contains(errMsg, "LoginInput.Email") && strings.Contains(errMsg, "required") {
		return "Email là bắt buộc"
	}
	if strings.Contains(errMsg, "LoginInput.Password") && strings.Contains(errMsg, "required") {
		return "Mật khẩu là bắt buộc"
	}

	fmt.Printf("DEBUG - No pattern matched, returning default\n")
	return "Dữ liệu nhập vào không hợp lệ"
}

// Register handles user registration
func Register(c *gin.Context) {
	var input RegisterInput

	// Bind and validate input
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": parseValidationError(err),
		})
		return
	}

	// Create user
	user := models.User{
		Username: input.Username,
		Email:    input.Email,
		Password: input.Password,
	}

	// Save user to database
	if err := user.Create(); err != nil {
		// Check for common database errors
		errMsg := err.Error()
		if strings.Contains(errMsg, "duplicate") || strings.Contains(errMsg, "unique") {
			if strings.Contains(errMsg, "email") {
				c.JSON(http.StatusBadRequest, gin.H{
					"error": "Email này đã được sử dụng",
				})
				return
			}
			if strings.Contains(errMsg, "username") {
				c.JSON(http.StatusBadRequest, gin.H{
					"error": "Tên người dùng này đã được sử dụng",
				})
				return
			}
		}

		if strings.Contains(errMsg, "password must be at least 6 characters") {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": "Mật khẩu phải có ít nhất 6 ký tự",
			})
			return
		}

		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Không thể tạo tài khoản. Vui lòng thử lại sau.",
		})
		return
	}

	// Generate token
	token, err := utils.GenerateToken(user.ID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Không thể tạo token. Vui lòng thử lại sau.",
		})
		return
	}

	// Return token
	c.JSON(http.StatusOK, gin.H{
		"message": "Đăng ký thành công",
		"user": gin.H{
			"id":       user.ID,
			"username": user.Username,
			"email":    user.Email,
			"role":     user.Role,
		},
		"token": token,
	})
}

// Login handles user login
func Login(c *gin.Context) {
	var input LoginInput

	// Bind and validate input
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": parseValidationError(err),
		})
		return
	}

	// Get user by email
	user, err := models.GetByEmail(input.Email)
	if err != nil {
		if err == sql.ErrNoRows {
			c.JSON(http.StatusUnauthorized, gin.H{
				"error": "Email hoặc mật khẩu không đúng",
			})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Không thể xác thực người dùng. Vui lòng thử lại sau.",
		})
		return
	}

	// Verify password
	if err := user.VerifyPassword(input.Password); err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{
			"error": "Email hoặc mật khẩu không đúng",
		})
		return
	}

	// Generate token
	token, err := utils.GenerateToken(user.ID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Không thể tạo token. Vui lòng thử lại sau.",
		})
		return
	}

	// Return token
	c.JSON(http.StatusOK, gin.H{
		"message": "Đăng nhập thành công",
		"user": gin.H{
			"id":       user.ID,
			"username": user.Username,
			"email":    user.Email,
			"role":     user.Role,
		},
		"token": token,
	})
}
