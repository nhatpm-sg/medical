package main

import (
	"log"
	"os"

	"github.com/dottrip/fpt-swp/internal/database"
	"github.com/dottrip/fpt-swp/internal/handlers"
	"github.com/dottrip/fpt-swp/internal/middleware"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
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

		// Public blog endpoints
		public.GET("/blog/posts", handlers.GetPublishedBlogPosts)
		public.GET("/blog/posts/:id", handlers.GetBlogPost)
		public.GET("/blog/categories", handlers.GetBlogCategories)
	}

	// Protected routes
	protected := r.Group("/api")
	protected.Use(middleware.JWTAuthMiddleware())
	{
		protected.GET("/dashboard", handlers.Dashboard)

		// Protected blog endpoints (for staff/admin)
		blogGroup := protected.Group("/blog")
		{
			// Admin/Staff blog management
			blogGroup.GET("/manage/posts", handlers.GetBlogPosts)
			blogGroup.POST("/manage/posts", handlers.CreateBlogPost)
			blogGroup.GET("/manage/posts/:id", handlers.GetBlogPost)
			blogGroup.PUT("/manage/posts/:id", handlers.UpdateBlogPost)
			blogGroup.DELETE("/manage/posts/:id", handlers.DeleteBlogPost)
			blogGroup.POST("/manage/posts/:id/publish", handlers.PublishBlogPost)
			blogGroup.POST("/manage/posts/:id/unpublish", handlers.UnpublishBlogPost)
			blogGroup.GET("/manage/stats", handlers.GetBlogStats)
		}

		// Doctor management endpoints (for admin)
		doctorGroup := protected.Group("/doctors")
		{
			doctorGroup.GET("", handlers.GetDoctors)
			doctorGroup.POST("", handlers.CreateDoctor)
			doctorGroup.GET("/specialties", handlers.GetDoctorSpecialties)
			doctorGroup.GET("/:id", handlers.GetDoctor)
			doctorGroup.PUT("/:id", handlers.UpdateDoctor)
			doctorGroup.DELETE("/:id", handlers.DeleteDoctor)
		}
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
