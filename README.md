# Dự án Y tế (Medical Project)

## Kiến trúc

Dự án có cấu trúc microservice gồm:
- Frontend: React + TypeScript + Vite, triển khai trên Render
- Backend: Go, triển khai trên Render
- Database: PostgreSQL, triển khai trên Render

## Thiết lập môi trường phát triển

### Yêu cầu
- Node.js 18+
- Go 1.21+

### Chạy ứng dụng trên local

```bash
# Chạy frontend
cd frontend
npm install
npm run dev

# Chạy backend
cd backend
go run cmd/api/main.go
```

Hoặc sử dụng script tự động:
```bash
chmod +x run.sh
./run.sh
```

### Cấu hình biến môi trường

#### Backend
Tạo file `.env` trong thư mục backend với nội dung sau:

```
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=medical_db
DB_SSL_MODE=disable

# Server Configuration
PORT=8080
GIN_MODE=debug

# JWT Configuration
JWT_SECRET=your_jwt_secret_key
TOKEN_HOUR_LIFESPAN=24

# Environment
ENV=development

# Frontend URL
FRONTEND_URL=http://localhost:5173
```

#### Frontend
Tạo file `.env` trong thư mục frontend với nội dung sau:

```
# API URL
VITE_API_URL=http://localhost:8080

# Environment
NODE_ENV=development
```

## Triển khai production

### Cấu hình Render
1. Tạo tài khoản và dự án mới trên Render
2. Liên kết repository GitHub với dự án Render
3. Cấu hình các service:

#### Frontend Service
- **Type**: Web Service
- **Environment**: Node
- **Build Command**: `cd frontend && npm install && npm run build`
- **Publish Directory**: `frontend/dist`
- **Environment Variables**:
  - `VITE_API_URL`: URL của backend API (VD: https://medical-backend.onrender.com)
  - `NODE_ENV`: production

#### Backend Service
- **Type**: Web Service
- **Environment**: Go
- **Build Command**: `cd backend && go mod download && go build -o main ./cmd/api/main.go`
- **Start Command**: `cd backend && ./main`
- **Environment Variables**:
  - `PORT`: 8080
  - `GIN_MODE`: release
  - `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`: Từ Render PostgreSQL
  - `JWT_SECRET`: Secret key cho JWT
  - `TOKEN_HOUR_LIFESPAN`: 24
  - `ENV`: production
  - `FRONTEND_URL`: https://medical-frontend.onrender.com

#### Database
- **Type**: PostgreSQL
- **Name**: medical-db
- **Database**: medical_db
- **User**: postgres

### Cấu hình GitHub Actions
1. Thêm các secrets sau vào repository GitHub:
   - `RENDER_API_KEY`: API key từ Render
   - `RENDER_SERVICE_ID`: ID của service trên Render

2. Các workflow GitHub Actions sẽ tự động:
   - Chạy CI: Kiểm tra linting và build
   - Chạy CD: Deploy lên Render

## Môi trường
- **Development**: Môi trường phát triển local
- **Production**: Môi trường triển khai chính thức (Render)

## Domain
- Frontend: https://medical-frontend.onrender.com
- Backend API: https://medical-backend.onrender.com 