#!/bin/bash

# Màu sắc cho terminal
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
YELLOW='\033[0;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}🗄️  Setting up SQLite database for development...${NC}"

# Tạo thư mục backend nếu chưa có
cd backend 2>/dev/null || {
    echo -e "${RED}Error: backend directory not found!${NC}"
    exit 1
}

# Tạo file .env cho SQLite development
echo -e "${BLUE}Creating .env file for SQLite development...${NC}"
cat > .env << EOL
# SQLite Development Environment Configuration

# Database Configuration - SQLite
DB_TYPE=sqlite
DB_PATH=./data/medical_dev.db

# Server Configuration
PORT=8080
GIN_MODE=debug

# JWT Configuration
JWT_SECRET=dev_jwt_secret_key_change_in_production
TOKEN_HOUR_LIFESPAN=24

# Environment
ENV=development

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173
EOL

echo -e "${GREEN}✅ Created .env file for SQLite development${NC}"

# Tạo thư mục data nếu chưa có
mkdir -p data
echo -e "${GREEN}✅ Created data directory${NC}"

# Build và test database connection
echo -e "${BLUE}Building and testing database connection...${NC}"

# Build the application
go build -o main cmd/api/main.go 2>/dev/null
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Application built successfully${NC}"
    
    # Test run (sẽ tạo database và tables)
    echo -e "${BLUE}Initializing database...${NC}"
    timeout 5s ./main 2>/dev/null &
    sleep 2
    pkill -f "./main" 2>/dev/null
    
    if [ -f "data/medical_dev.db" ]; then
        echo -e "${GREEN}✅ SQLite database created successfully at: data/medical_dev.db${NC}"
        
        # Show database info
        if command -v sqlite3 &> /dev/null; then
            echo -e "${BLUE}Database tables:${NC}"
            sqlite3 data/medical_dev.db ".tables"
            
            echo -e "${BLUE}Users table schema:${NC}"
            sqlite3 data/medical_dev.db ".schema users"
        else
            echo -e "${YELLOW}⚠️  SQLite CLI not found. Database created but cannot show details.${NC}"
            echo -e "${YELLOW}   Install with: brew install sqlite (macOS) or apt-get install sqlite3 (Linux)${NC}"
        fi
    else
        echo -e "${RED}❌ Failed to create SQLite database${NC}"
        exit 1
    fi
else
    echo -e "${RED}❌ Failed to build application${NC}"
    echo -e "${YELLOW}Make sure you have run: go mod download${NC}"
    exit 1
fi

echo -e "${GREEN}"
echo "🎉 SQLite development database setup completed!"
echo ""
echo "Next steps:"
echo "1. Start development server: go run cmd/api/main.go"
echo "2. Or use: make dev (if available)"
echo "3. The database file is located at: backend/data/medical_dev.db"
echo ""
echo "To switch back to PostgreSQL:"
echo "1. Change DB_TYPE=postgres in .env"
echo "2. Add PostgreSQL connection details"
echo -e "${NC}" 