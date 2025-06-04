package handlers

import (
	"net/http"

	"github.com/dottrip/fpt-swp/internal/models"
	"github.com/gin-gonic/gin"
)

// Dashboard handles the dashboard request
func Dashboard(c *gin.Context) {
	// Get user ID from context (set by auth middleware)
	userID, exists := c.Get("user_id")
	if !exists {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "User ID not found in context"})
		return
	}

	// Get user by ID
	user, err := models.GetByID(userID.(int))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get user"})
		return
	}

	// Return user data
	c.JSON(http.StatusOK, gin.H{
		"message": "Welcome to the dashboard",
		"user": gin.H{
			"id":       user.ID,
			"username": user.Username,
			"email":    user.Email,
			"role":     user.Role,
		},
	})
}
