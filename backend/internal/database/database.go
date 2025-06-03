package database

import (
	"database/sql"
	"fmt"
	"log"
	"os"

	_ "github.com/lib/pq"
)

// DB is the database connection
var DB *sql.DB

// InitDB initializes the database connection
func InitDB() {
	var err error
	
	// Get database connection parameters from environment variables
	dbHost := getEnv("DB_HOST", "localhost")
	dbPort := getEnv("DB_PORT", "5432")
	dbUser := getEnv("DB_USER", "postgres")
	dbPassword := getEnv("DB_PASSWORD", "postgres")
	dbName := getEnv("DB_NAME", "medical_db")
	sslMode := getEnv("DB_SSL_MODE", "disable")

	// Create database connection string
	dbURI := fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=%s",
		dbHost, dbPort, dbUser, dbPassword, dbName, sslMode)

	// Connect to database
	DB, err = sql.Open("postgres", dbURI)
	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}

	// Test the connection
	err = DB.Ping()
	if err != nil {
		log.Fatal("Failed to ping database:", err)
	}

	log.Println("Connected to PostgreSQL database!")

	// Create tables if they don't exist
	createTables()
}

// createTables creates the necessary tables in the database
func createTables() {
	// Create users table
	userTable := `
	CREATE TABLE IF NOT EXISTS users (
		id SERIAL PRIMARY KEY,
		username VARCHAR(100) UNIQUE NOT NULL,
		email VARCHAR(100) UNIQUE NOT NULL,
		password VARCHAR(255) NOT NULL,
		created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
		updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
	);`

	_, err := DB.Exec(userTable)
	if err != nil {
		log.Fatal("Failed to create users table:", err)
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