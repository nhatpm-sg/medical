#!/bin/bash

# Màu sắc cho terminal
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
YELLOW='\033[0;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}Starting Medical Application...${NC}"

# Kiểm tra xem có thư mục frontend hay không
if [ ! -d "frontend" ]; then
  echo -e "${RED}Error: frontend directory not found!${NC}"
  exit 1
fi

# Kiểm tra xem có thư mục backend hay không
if [ ! -d "backend" ]; then
  echo -e "${RED}Error: backend directory not found!${NC}"
  exit 1
fi

# Tạo file .env cho backend nếu nó chưa tồn tại
if [ ! -f "backend/.env" ]; then
  echo -e "${BLUE}Creating .env file for backend...${NC}"
  cat > backend/.env << EOL
DB_HOST=dpg-d0v6717diees73chort0-a
DB_PORT=5432
DB_USER=fpt_swp_db_user
DB_PASSWORD=WN8b8mfU45VQ6h4F9aXVbn5mxNWlNA0q
DB_NAME=medical_db
DB_SSL_MODE=disable

PORT=8080
JWT_SECRET=Qw8!zP3@rT7
TOKEN_HOUR_LIFESPAN=24
EOL
  echo -e "${GREEN}Created .env file for backend${NC}"
fi

# Kiểm tra Go đã được cài đặt chưa
check_go() {
  if ! command -v go &> /dev/null; then
    echo -e "${RED}Error: Go is not installed.${NC}"
    echo -e "${YELLOW}Please install Go using one of the following methods:${NC}"
    echo -e "${BLUE}macOS:${NC}"
    echo -e "  brew install go"
    echo -e "${BLUE}Linux:${NC}"
    echo -e "  sudo apt-get install golang"
    echo -e "${BLUE}Windows:${NC}"
    echo -e "  Download from https://golang.org/dl/"
    echo -e "${YELLOW}After installing Go, run this script again.${NC}"
    return 1
  fi
  return 0
}

# Kiểm tra npm script start trong frontend
check_npm_start() {
  if [ ! -f "frontend/package.json" ]; then
    echo -e "${RED}Error: frontend/package.json not found!${NC}"
    return 1
  fi
  
  # Kiểm tra xem package.json có chứa script start không
  if ! grep -q '"start"' frontend/package.json; then
    echo -e "${YELLOW}Warning: 'start' script not found in package.json${NC}"
    echo -e "${BLUE}Available npm scripts:${NC}"
    cd frontend && npm run
    return 1
  fi
  
  return 0
}

# Chạy backend trong một terminal riêng biệt
start_backend() {
  echo -e "${GREEN}Starting backend server...${NC}"
  cd backend
  
  if check_go; then
    echo -e "${BLUE}Running Go backend server...${NC}"
    go run cmd/api/main.go
  else
    return 1
  fi
}

# Chạy frontend trong một terminal riêng biệt
start_frontend() {
  echo -e "${GREEN}Starting frontend...${NC}"
  cd frontend
  
  if check_npm_start; then
    npm start
  else
    echo -e "${YELLOW}Trying to run frontend with alternative command...${NC}"
    
    # Kiểm tra các script phổ biến khác
    if grep -q '"dev"' package.json; then
      echo -e "${BLUE}Running npm run dev...${NC}"
      npm run dev
    elif grep -q '"serve"' package.json; then
      echo -e "${BLUE}Running npm run serve...${NC}"
      npm run serve
    else
      echo -e "${RED}Could not find a suitable npm script to run the frontend.${NC}"
      echo -e "${YELLOW}Please check your package.json and modify this script accordingly.${NC}"
      return 1
    fi
  fi
}

# Chạy backend và frontend
BACKEND_OK=true
FRONTEND_OK=true

# Chạy backend
start_backend &
BACKEND_PID=$!

# Đợi một chút để backend khởi động
sleep 2

# Chạy frontend
start_frontend &
FRONTEND_PID=$!

# Xử lý khi script nhận tín hiệu kết thúc
trap "kill $BACKEND_PID $FRONTEND_PID 2>/dev/null" EXIT

# Đợi cho đến khi cả hai process hoàn thành hoặc người dùng gửi tín hiệu interrupt
wait 