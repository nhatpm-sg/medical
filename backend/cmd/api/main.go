package main

import (
	"log"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"github.com/dottrip/fpt-swp/backend/internal/database"
	"github.com/dottrip/fpt-swp/backend/internal/handlers"
	"github.com/dottrip/fpt-swp/backend/internal/middleware"
)

func main() {
	// Load .env file if it exists
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found, using default values")
	}

	// Initialize database
	database.InitDB()

	// Set up router
	r := gin.Default()

	// Set up CORS
	r.Use(func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Origin, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}
		c.Next()
	})

	// Health check endpoint
	r.GET("/api/health", handlers.HealthCheck)

	// Public routes
	public := r.Group("/api")
	{
		public.POST("/register", handlers.Register)
		public.POST("/login", handlers.Login)
	}

	// Protected routes
	protected := r.Group("/api")
	protected.Use(middleware.JWTAuthMiddleware())
	{
		protected.GET("/dashboard", handlers.Dashboard)
	}

	// Get port from environment
	port := getEnv("PORT", "8080")

	// Start server
	log.Printf("Server running on port %s", port)
	if err := r.Run(":" + port); err != nil {
		log.Fatal("Failed to start server:", err)
	}
}

// getEnv gets an environment variable or returns a default value
func getEnv(key, defaultValue string) string {
	value := os.Getenv(key)
	if value == "" {
		return defaultValue
	}
	return value
} 