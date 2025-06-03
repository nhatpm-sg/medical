# Backend API cho ứng dụng Medical

Backend API được xây dựng bằng Go và PostgreSQL, cung cấp các chức năng đăng nhập, đăng ký và truy cập dashboard.

## Yêu cầu

- Go 1.21 hoặc cao hơn
- PostgreSQL
- Docker (tùy chọn)

## Cài đặt

1. Cài đặt Go: https://golang.org/doc/install
2. Cài đặt PostgreSQL: https://www.postgresql.org/download/
3. Clone repository này

## Cấu hình

Tạo file `.env` trong thư mục `backend` với nội dung như sau:

```
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=medical_db
DB_SSL_MODE=disable

PORT=8080
JWT_SECRET=your_jwt_secret_key
TOKEN_HOUR_LIFESPAN=24
```

## Tạo database

Tạo database trong PostgreSQL:

```sql
CREATE DATABASE medical_db;
```

## Chạy ứng dụng

```bash
# Cài đặt dependencies
go mod download

# Chạy ứng dụng
go run cmd/api/main.go
```

Hoặc build và chạy:

```bash
go build -o api cmd/api/main.go
./api
```

## API Endpoints

### Đăng ký

```
POST /api/register
```

Body:

```json
{
  "username": "example",
  "email": "example@example.com",
  "password": "password123"
}
```

### Đăng nhập

```
POST /api/login
```

Body:

```json
{
  "email": "example@example.com",
  "password": "password123"
}
```

### Dashboard (yêu cầu xác thực)

```
GET /api/dashboard
```

Header:

```
Authorization: Bearer YOUR_JWT_TOKEN
``` 