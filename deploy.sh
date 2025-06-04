#!/bin/bash

# Màu sắc cho terminal
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
YELLOW='\033[0;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}🚀 Medical Application Deployment Script${NC}"

# Function to show help
show_help() {
    echo -e "${BLUE}Usage: $0 [OPTIONS]${NC}"
    echo ""
    echo "Options:"
    echo "  -e, --env ENVIRONMENT    Set environment (development|production) [default: production]"
    echo "  -t, --target TARGET      Set target (render|docker|local) [default: render]"
    echo "  -h, --help              Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0                      # Deploy to production on Render"
    echo "  $0 -e development       # Deploy development environment"
    echo "  $0 -t docker           # Deploy using Docker"
    echo "  $0 -t local            # Deploy locally"
}

# Default values
ENVIRONMENT="production"
TARGET="render"

# Parse command line arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        -e|--env)
            ENVIRONMENT="$2"
            shift 2
            ;;
        -t|--target)
            TARGET="$2"
            shift 2
            ;;
        -h|--help)
            show_help
            exit 0
            ;;
        *)
            echo -e "${RED}Unknown option: $1${NC}"
            show_help
            exit 1
            ;;
    esac
done

echo -e "${BLUE}Environment: ${ENVIRONMENT}${NC}"
echo -e "${BLUE}Target: ${TARGET}${NC}"

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check prerequisites
check_prerequisites() {
    echo -e "${BLUE}Checking prerequisites...${NC}"
    
    if [ "$TARGET" = "docker" ]; then
        if ! command_exists docker; then
            echo -e "${RED}Error: Docker is not installed${NC}"
            exit 1
        fi
        
        if ! command_exists docker-compose; then
            echo -e "${RED}Error: Docker Compose is not installed${NC}"
            exit 1
        fi
    fi
    
    if [ "$TARGET" = "local" ]; then
        if ! command_exists node; then
            echo -e "${RED}Error: Node.js is not installed${NC}"
            exit 1
        fi
        
        if ! command_exists go; then
            echo -e "${RED}Error: Go is not installed${NC}"
            exit 1
        fi
    fi
}

# Deploy to Render
deploy_render() {
    echo -e "${GREEN}🚀 Deploying to Render...${NC}"
    
    # Check if render.yaml exists
    if [ ! -f "render.yaml" ]; then
        echo -e "${RED}Error: render.yaml not found${NC}"
        exit 1
    fi
    
    echo -e "${BLUE}Pushing to master branch...${NC}"
    git add .
    git commit -m "Deploy: $(date '+%Y-%m-%d %H:%M:%S')" || true
    git push origin master
    
    echo -e "${GREEN}✅ Deployment initiated on Render${NC}"
    echo -e "${YELLOW}Check Render dashboard for deployment status${NC}"
}

# Deploy with Docker
deploy_docker() {
    echo -e "${GREEN}🐳 Deploying with Docker...${NC}"
    
    # Stop existing containers
    echo -e "${BLUE}Stopping existing containers...${NC}"
    docker-compose down
    
    # Build and start containers
    echo -e "${BLUE}Building and starting containers...${NC}"
    docker-compose up --build -d
    
    # Check container status
    echo -e "${BLUE}Container status:${NC}"
    docker-compose ps
    
    echo -e "${GREEN}✅ Docker deployment completed${NC}"
    echo -e "${YELLOW}Frontend: http://localhost:3000${NC}"
    echo -e "${YELLOW}Backend: http://localhost:8080${NC}"
}

# Deploy locally
deploy_local() {
    echo -e "${GREEN}💻 Deploying locally...${NC}"
    
    # Check if .env files exist
    if [ ! -f "backend/.env" ]; then
        echo -e "${YELLOW}Creating backend .env file from example...${NC}"
        if [ -f "backend/.env.example" ]; then
            cp backend/.env.example backend/.env
        else
            echo -e "${RED}Error: backend/.env.example not found${NC}"
            exit 1
        fi
    fi
    
    if [ ! -f "frontend/.env" ]; then
        echo -e "${YELLOW}Creating frontend .env file from example...${NC}"
        if [ -f "frontend/.env.example" ]; then
            cp frontend/.env.example frontend/.env
        else
            echo -e "${RED}Error: frontend/.env.example not found${NC}"
            exit 1
        fi
    fi
    
    # Install dependencies and build
    echo -e "${BLUE}Installing frontend dependencies...${NC}"
    cd frontend && npm install && npm run build && cd ..
    
    echo -e "${BLUE}Installing backend dependencies...${NC}"
    cd backend && go mod download && go build -o main ./cmd/api/main.go && cd ..
    
    echo -e "${GREEN}✅ Local deployment completed${NC}"
    echo -e "${YELLOW}Run './run.sh' to start the application${NC}"
}

# Main deployment logic
main() {
    check_prerequisites
    
    case $TARGET in
        "render")
            deploy_render
            ;;
        "docker")
            deploy_docker
            ;;
        "local")
            deploy_local
            ;;
        *)
            echo -e "${RED}Unknown target: $TARGET${NC}"
            show_help
            exit 1
            ;;
    esac
}

# Run main function
main 