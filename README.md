# Dự án Y tế (Medical Project)

## 🏗️ Kiến trúc

Dự án có cấu trúc microservice gồm:
- **Frontend**: React + TypeScript + Vite + Tailwind CSS
- **Backend**: Go + Gin Framework + PostgreSQL
- **Database**: PostgreSQL
- **Deployment**: Render (Production), Docker (Development)

## 🚀 Quick Start

### Sử dụng Make (Khuyến nghị)

```bash
# Setup hoàn chỉnh cho dev mới
make setup

# Chạy development servers
make dev

# Deploy
make deploy-render    # Deploy lên Render
make deploy-docker    # Deploy với Docker
make deploy-local     # Setup local
```

### Manual Setup

#### Yêu cầu hệ thống
- Node.js 18+
- Go 1.21+
- Docker & Docker Compose (optional)

#### 1. Clone và cài đặt dependencies

```bash
git clone <repository-url>
cd medical

# Cài đặt dependencies
make install
# hoặc
npm install --prefix frontend
go mod download -C backend
```

#### 2. Cấu hình environment

```bash
# Tạo file .env từ template
make setup-env

# Hoặc thủ công:
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

#### 3. Chạy ứng dụng

```bash
# Development mode
make dev

# Hoặc thủ công:
chmod +x run.sh
./run.sh
```

## ⚙️ Cấu hình biến môi trường

### Backend (.env)
```bash
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
JWT_SECRET=your_jwt_secret_key_change_in_production
TOKEN_HOUR_LIFESPAN=24

# Environment
ENV=development

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173
```

### Frontend (.env)
```bash
# API URL
VITE_API_URL=http://localhost:8080

# Environment
NODE_ENV=development
```

## 🐳 Docker Deployment

```bash
# Build và chạy containers
make docker-up

# Xem logs
make docker-logs

# Dừng containers
make docker-down
```

Hoặc sử dụng deploy script:
```bash
./deploy.sh -t docker
```

## ☁️ Production Deployment

### Render Deployment

1. **Tạo tài khoản Render**: https://render.com

2. **Connect GitHub Repository**

3. **Deploy script**:
```bash
./deploy.sh -t render
# hoặc
make deploy-render
```

4. **Cấu hình Environment Variables trên Render**:

#### Frontend Service
- `VITE_API_URL`: https://your-backend-url.onrender.com
- `NODE_ENV`: production

#### Backend Service
- `PORT`: 8080
- `GIN_MODE`: release
- `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`: Từ Render PostgreSQL
- `JWT_SECRET`: Secret key bảo mật
- `TOKEN_HOUR_LIFESPAN`: 24
- `ENV`: production
- `FRONTEND_URL`: https://your-frontend-url.onrender.com

## 🔧 Development Commands

```bash
# Xem tất cả commands có sẵn
make help

# Development
make install       # Cài đặt dependencies
make build        # Build cả frontend và backend
make test         # Chạy tests
make lint         # Kiểm tra code quality
make clean        # Dọn dẹp build artifacts

# Docker
make docker-build # Build Docker images
make docker-up    # Start containers
make docker-down  # Stop containers

# Health check
make health       # Kiểm tra health của services
```

## 📁 Cấu trúc dự án

```
medical/
├── frontend/           # React + TypeScript frontend
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── .env.example
├── backend/            # Go backend
│   ├── cmd/
│   ├── internal/
│   ├── pkg/
│   ├── go.mod
│   └── .env.example
├── .github/
│   └── workflows/      # CI/CD workflows
├── docker-compose.yml  # Multi-container setup
├── Dockerfile.frontend # Frontend container
├── Dockerfile.backend  # Backend container
├── render.yaml        # Render deployment config
├── run.sh            # Development runner
├── deploy.sh         # Deployment script
├── Makefile          # Build automation
└── README.md
```

## 🔒 Security & Best Practices

- ✅ Environment variables cho sensitive data
- ✅ JWT authentication
- ✅ CORS configuration
- ✅ Input validation
- ✅ Security scanning với Trivy
- ✅ Docker multi-stage builds
- ✅ Automated CI/CD

## 🐛 Troubleshooting

### Common Issues

1. **Port already in use**:
```bash
lsof -ti:8080 | xargs kill  # Kill backend process
lsof -ti:5173 | xargs kill  # Kill frontend process
```

2. **Database connection error**:
- Đảm bảo PostgreSQL đang chạy
- Kiểm tra DB credentials trong .env

3. **Build fails**:
```bash
make clean
make install
make build
```

## 📊 Monitoring & Health Check

```bash
# Check service health
make health

# Monitor Docker containers
make docker-logs
```

## 🤝 Contributing

1. Fork repository
2. Create feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push branch: `git push origin feature/new-feature`
5. Submit Pull Request

## 📄 License

[MIT License](LICENSE)

---

**🎯 Mục tiêu**: Tạo một hệ thống y tế hiện đại, an toàn và dễ sử dụng.

**📞 Hỗ trợ**: Mở issue trên GitHub nếu gặp vấn đề. 