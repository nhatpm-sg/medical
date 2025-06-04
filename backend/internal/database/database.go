package database

import (
	"database/sql"
	"fmt"
	"log"
	"os"

	_ "github.com/lib/pq"
	_ "github.com/mattn/go-sqlite3"
)

// DB is the database connection
var DB *sql.DB

// InitDB initializes the database connection
func InitDB() {
	var err error

	// Get database type from environment
	dbType := getEnv("DB_TYPE", "postgres")

	switch dbType {
	case "sqlite":
		initSQLite()
	case "postgres":
		initPostgreSQL()
	default:
		log.Fatal("Unsupported database type:", dbType)
	}

	// Test the connection
	err = DB.Ping()
	if err != nil {
		log.Fatal("Failed to ping database:", err)
	}

	log.Printf("Connected to %s database!", dbType)

	// Create tables if they don't exist
	createTables()
}

// initSQLite initializes SQLite database connection
func initSQLite() {
	var err error
	dbPath := getEnv("DB_PATH", "./data/medical.db")

	// Create data directory if it doesn't exist
	if err := os.MkdirAll("./data", 0755); err != nil {
		log.Fatal("Failed to create data directory:", err)
	}

	// Connect to SQLite database
	DB, err = sql.Open("sqlite3", dbPath)
	if err != nil {
		log.Fatal("Failed to connect to SQLite database:", err)
	}
}

// initPostgreSQL initializes PostgreSQL database connection
func initPostgreSQL() {
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
		log.Fatal("Failed to connect to PostgreSQL database:", err)
	}
}

// createTables creates the necessary tables in the database
func createTables() {
	dbType := getEnv("DB_TYPE", "postgres")

	// Create users table with appropriate syntax for each database
	var userTable string

	if dbType == "sqlite" {
		userTable = `
		CREATE TABLE IF NOT EXISTS users (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			username VARCHAR(100) UNIQUE NOT NULL,
			email VARCHAR(100) UNIQUE NOT NULL,
			password VARCHAR(255) NOT NULL,
			created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
			updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
		);`
	} else {
		userTable = `
		CREATE TABLE IF NOT EXISTS users (
			id SERIAL PRIMARY KEY,
			username VARCHAR(100) UNIQUE NOT NULL,
			email VARCHAR(100) UNIQUE NOT NULL,
			password VARCHAR(255) NOT NULL,
			created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
			updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
		);`
	}

	_, err := DB.Exec(userTable)
	if err != nil {
		log.Fatal("Failed to create users table:", err)
	}

	// Create blog_posts table
	var blogTable string

	if dbType == "sqlite" {
		blogTable = `
		CREATE TABLE IF NOT EXISTS blog_posts (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			title VARCHAR(255) NOT NULL,
			content TEXT NOT NULL,
			excerpt TEXT,
			thumbnail VARCHAR(500),
			author_id INTEGER NOT NULL,
			status VARCHAR(20) DEFAULT 'draft',
			category VARCHAR(100),
			tags TEXT,
			view_count INTEGER DEFAULT 0,
			created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
			updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
			published_at DATETIME,
			FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE CASCADE
		);`
	} else {
		blogTable = `
		CREATE TABLE IF NOT EXISTS blog_posts (
			id SERIAL PRIMARY KEY,
			title VARCHAR(255) NOT NULL,
			content TEXT NOT NULL,
			excerpt TEXT,
			thumbnail VARCHAR(500),
			author_id INTEGER NOT NULL,
			status VARCHAR(20) DEFAULT 'draft',
			category VARCHAR(100),
			tags TEXT,
			view_count INTEGER DEFAULT 0,
			created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
			updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
			published_at TIMESTAMP WITH TIME ZONE,
			FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE CASCADE
		);`
	}

	_, err = DB.Exec(blogTable)
	if err != nil {
		log.Fatal("Failed to create blog_posts table:", err)
	}

	// Create doctors table
	var doctorTable string

	if dbType == "sqlite" {
		doctorTable = `
		CREATE TABLE IF NOT EXISTS doctors (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			name VARCHAR(255) NOT NULL,
			email VARCHAR(255) UNIQUE NOT NULL,
			phone VARCHAR(20) NOT NULL,
			specialty VARCHAR(100) NOT NULL,
			experience VARCHAR(100),
			education TEXT,
			bio TEXT,
			avatar VARCHAR(500),
			license_number VARCHAR(50) UNIQUE NOT NULL,
			address TEXT,
			date_of_birth VARCHAR(20),
			gender VARCHAR(10),
			status VARCHAR(20) DEFAULT 'active',
			certifications TEXT,
			working_hours TEXT,
			consultation_price INTEGER DEFAULT 0,
			patient_count INTEGER DEFAULT 0,
			appointment_count INTEGER DEFAULT 0,
			created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
			updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
		);`
	} else {
		doctorTable = `
		CREATE TABLE IF NOT EXISTS doctors (
			id SERIAL PRIMARY KEY,
			name VARCHAR(255) NOT NULL,
			email VARCHAR(255) UNIQUE NOT NULL,
			phone VARCHAR(20) NOT NULL,
			specialty VARCHAR(100) NOT NULL,
			experience VARCHAR(100),
			education TEXT,
			bio TEXT,
			avatar VARCHAR(500),
			license_number VARCHAR(50) UNIQUE NOT NULL,
			address TEXT,
			date_of_birth VARCHAR(20),
			gender VARCHAR(10),
			status VARCHAR(20) DEFAULT 'active',
			certifications TEXT,
			working_hours TEXT,
			consultation_price INTEGER DEFAULT 0,
			patient_count INTEGER DEFAULT 0,
			appointment_count INTEGER DEFAULT 0,
			created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
			updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
		);`
	}

	_, err = DB.Exec(doctorTable)
	if err != nil {
		log.Fatal("Failed to create doctors table:", err)
	}

	// Create indexes for better performance
	var indexes []string

	if dbType == "sqlite" {
		indexes = []string{
			"CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON blog_posts(status);",
			"CREATE INDEX IF NOT EXISTS idx_blog_posts_author ON blog_posts(author_id);",
			"CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON blog_posts(category);",
			"CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(published_at);",
			"CREATE INDEX IF NOT EXISTS idx_blog_posts_created ON blog_posts(created_at);",
			"CREATE INDEX IF NOT EXISTS idx_doctors_status ON doctors(status);",
			"CREATE INDEX IF NOT EXISTS idx_doctors_specialty ON doctors(specialty);",
			"CREATE INDEX IF NOT EXISTS idx_doctors_email ON doctors(email);",
			"CREATE INDEX IF NOT EXISTS idx_doctors_created ON doctors(created_at);",
		}
	} else {
		indexes = []string{
			"CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON blog_posts(status);",
			"CREATE INDEX IF NOT EXISTS idx_blog_posts_author ON blog_posts(author_id);",
			"CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON blog_posts(category);",
			"CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(published_at);",
			"CREATE INDEX IF NOT EXISTS idx_blog_posts_created ON blog_posts(created_at);",
			"CREATE INDEX IF NOT EXISTS idx_doctors_status ON doctors(status);",
			"CREATE INDEX IF NOT EXISTS idx_doctors_specialty ON doctors(specialty);",
			"CREATE INDEX IF NOT EXISTS idx_doctors_email ON doctors(email);",
			"CREATE INDEX IF NOT EXISTS idx_doctors_created ON doctors(created_at);",
		}
	}

	for _, index := range indexes {
		_, err = DB.Exec(index)
		if err != nil {
			log.Printf("Warning: Failed to create index: %v", err)
		}
	}

	log.Println("Database tables created successfully")
}

// getEnv gets an environment variable or returns a default value
func getEnv(key, defaultValue string) string {
	value := os.Getenv(key)
	if value == "" {
		return defaultValue
	}
	return value
}
