.PHONY: help install build test lint clean dev prod deploy

# Default target
help: ## Show this help message
	@echo 'Usage: make [target]'
	@echo ''
	@echo 'Targets:'
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "  %-15s %s\n", $$1, $$2}' $(MAKEFILE_LIST)

# Development commands
install: ## Install all dependencies
	@echo "📦 Installing frontend dependencies..."
	cd frontend && npm install
	@echo "📦 Installing backend dependencies..."
	cd backend && go mod download
	@echo "✅ Dependencies installed"

build: ## Build both frontend and backend
	@echo "🔨 Building frontend..."
	cd frontend && npm run build
	@echo "🔨 Building backend..."
	cd backend && go build -o main ./cmd/api/main.go
	@echo "✅ Build completed"

test: ## Run tests
	@echo "🧪 Running frontend tests..."
	cd frontend && npm test -- --watchAll=false
	@echo "🧪 Running backend tests..."
	cd backend && go test ./...
	@echo "✅ Tests completed"

lint: ## Run linting
	@echo "🔍 Linting frontend..."
	cd frontend && npm run lint
	@echo "🔍 Linting backend..."
	cd backend && golangci-lint run
	@echo "✅ Linting completed"

clean: ## Clean build artifacts
	@echo "🧹 Cleaning..."
	rm -rf frontend/dist
	rm -rf frontend/node_modules
	rm -f backend/main
	@echo "✅ Cleaned"

# Running commands
dev: ## Start development servers
	@echo "🚀 Starting development servers..."
	chmod +x run.sh
	./run.sh

# Docker commands
docker-build: ## Build Docker images
	@echo "🐳 Building Docker images..."
	docker-compose build

docker-up: ## Start Docker containers
	@echo "🐳 Starting Docker containers..."
	docker-compose up -d

docker-down: ## Stop Docker containers
	@echo "🐳 Stopping Docker containers..."
	docker-compose down

docker-logs: ## Show Docker logs
	docker-compose logs -f

# Deployment commands
deploy-local: ## Deploy locally
	@echo "💻 Deploying locally..."
	chmod +x deploy.sh
	./deploy.sh -t local

deploy-docker: ## Deploy with Docker
	@echo "🐳 Deploying with Docker..."
	chmod +x deploy.sh
	./deploy.sh -t docker

deploy-render: ## Deploy to Render
	@echo "☁️ Deploying to Render..."
	chmod +x deploy.sh
	./deploy.sh -t render

# Environment setup
setup-env: ## Setup environment files
	@echo "⚙️ Setting up environment files..."
	@if [ ! -f "backend/.env" ] && [ -f "backend/.env.example" ]; then \
		cp backend/.env.example backend/.env; \
		echo "Created backend/.env from example"; \
	fi
	@if [ ! -f "frontend/.env" ] && [ -f "frontend/.env.example" ]; then \
		cp frontend/.env.example frontend/.env; \
		echo "Created frontend/.env from example"; \
	fi
	@echo "✅ Environment setup completed"

# Health check
health: ## Check application health
	@echo "🏥 Checking application health..."
	@curl -f http://localhost:8080/api/health || echo "Backend not running"
	@curl -f http://localhost:5173 || echo "Frontend not running"

# Database commands
db-reset: ## Reset database (development only)
	@echo "🗄️ Resetting database..."
	docker-compose exec postgres psql -U postgres -d medical_db -c "DROP SCHEMA public CASCADE; CREATE SCHEMA public;"
	@echo "✅ Database reset"

# Full setup for new developers
setup: install setup-env build ## Full setup for new developers
	@echo "🎉 Setup completed! Run 'make dev' to start development servers" 