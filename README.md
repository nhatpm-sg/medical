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
- Docker và Docker Compose

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

#### Backend Service
- **Type**: Web Service
- **Environment**: Docker
- **Dockerfile Path**: `./backend/Dockerfile`
- **Environment Variables**:
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

2. Các workflow GitHub Actions sẽ tự động:
   - Chạy CI: Kiểm tra linting và build
   - Chạy CD: Deploy lên Render

## Môi trường
- **Development**: Môi trường phát triển local
- **Production**: Môi trường triển khai chính thức (Render)

## Domain
- Frontend: https://medical-frontend.onrender.com
- Backend API: https://medical-backend.onrender.com 