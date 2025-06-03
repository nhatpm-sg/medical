# Dự án Y tế (Medical Project)

## Kiến trúc

Dự án có cấu trúc microservice gồm:
- Frontend: React + TypeScript + Vite, triển khai trên Vercel
- Backend: Go, triển khai trên VPS
- Database: PostgreSQL, triển khai trên VPS

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

### Cấu hình Vercel
1. Tạo tài khoản và dự án mới trên Vercel
2. Liên kết repository GitHub với dự án Vercel
3. Cấu hình biến môi trường trong dự án Vercel:
   - `VITE_API_URL`: URL của backend API (VD: https://api.medical-app.com)

### Cấu hình VPS
1. Cài đặt Docker và Docker Compose trên VPS
2. Tạo thư mục dự án: `mkdir -p /opt/medical`
3. Copy file `docker-compose.vps.yml` vào thư mục `/opt/medical` và đổi tên thành `docker-compose.yml`
4. Tạo file `.env` với các biến môi trường cần thiết
5. Chạy: `docker-compose up -d`

### Cấu hình GitHub Actions
1. Thêm các secrets sau vào repository GitHub:
   - `VERCEL_TOKEN`: Token API từ Vercel
   - `DOCKER_HUB_USERNAME`: Tên người dùng Docker Hub
   - `DOCKER_HUB_TOKEN`: Token Docker Hub
   - `VPS_HOST`: Địa chỉ IP hoặc hostname của VPS
   - `VPS_USERNAME`: Username để SSH vào VPS
   - `VPS_SSH_KEY`: Private key SSH để truy cập VPS

2. Các workflow GitHub Actions sẽ tự động:
   - Chạy CI: Kiểm tra linting và build
   - Chạy CD: Deploy frontend lên Vercel và backend lên VPS

## Môi trường
- **Development**: Môi trường phát triển local
- **Production**: Môi trường triển khai chính thức (Vercel + VPS)

## Domain
- Frontend: https://medical-app.vercel.app
- Backend API: https://api.medical-app.com 