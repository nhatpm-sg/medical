# Hướng dẫn tích hợp Blog thực tế

## Tổng quan

Hệ thống blog đã được tích hợp hoàn toàn với database thực và API, thay thế dữ liệu mẫu bằng dữ liệu thực từ database.

## Kiến trúc hệ thống

### Backend (Go + Gin)

#### 1. Database Schema
- **Bảng `blog_posts`**: Lưu trữ tất cả bài viết blog
  - `id`: Primary key
  - `title`: Tiêu đề bài viết
  - `content`: Nội dung đầy đủ
  - `excerpt`: Tóm tắt ngắn
  - `thumbnail`: URL hình ảnh đại diện
  - `author_id`: ID tác giả (liên kết với bảng users)
  - `status`: Trạng thái (draft, published, archived)
  - `category`: Danh mục bài viết
  - `tags`: Tags (phân cách bằng dấu phẩy)
  - `view_count`: Số lượt xem
  - `created_at`, `updated_at`, `published_at`: Timestamps

#### 2. API Endpoints

**Public Endpoints (không cần xác thực):**
- `GET /api/blog/posts` - Lấy danh sách bài viết đã xuất bản
- `GET /api/blog/posts/:id` - Lấy chi tiết bài viết
- `GET /api/blog/categories` - Lấy danh sách danh mục

**Protected Endpoints (cần xác thực):**
- `GET /api/blog/manage/posts` - Lấy tất cả bài viết (bao gồm draft)
- `POST /api/blog/manage/posts` - Tạo bài viết mới
- `GET /api/blog/manage/posts/:id` - Lấy chi tiết bài viết
- `PUT /api/blog/manage/posts/:id` - Cập nhật bài viết
- `DELETE /api/blog/manage/posts/:id` - Xóa bài viết
- `POST /api/blog/manage/posts/:id/publish` - Xuất bản bài viết
- `POST /api/blog/manage/posts/:id/unpublish` - Hủy xuất bản
- `GET /api/blog/manage/stats` - Thống kê blog

### Frontend (React + TypeScript)

#### 1. Blog API Service (`frontend/src/services/blogApi.ts`)
- Service class xử lý tất cả API calls
- Type safety với TypeScript interfaces
- Automatic authentication token handling
- Error handling và retry logic

#### 2. Trang quản lý Blog (`frontend/src/pages/dashboard/staff/BlogManagement.tsx`)
- Giao diện quản lý hoàn chỉnh cho staff
- Real-time data loading và cập nhật
- CRUD operations với confirmation dialogs
- Stats dashboard với metrics thực tế
- Search và filter functionality
- Responsive design

#### 3. Blog Section trên Homepage (`frontend/src/components/BlogSection.tsx`)
- Hiển thị bài viết mới nhất trên trang chủ
- Featured post layout
- Grid layout cho các bài viết khác
- Auto-refresh khi có bài viết mới

## Cài đặt và triển khai

### 1. Backend Setup

```bash
cd backend

# Install dependencies
go mod tidy

# Set environment variables
export DB_TYPE=sqlite  # hoặc postgres
export DB_PATH=./data/medical.db  # cho SQLite

# Run database migrations (tự động khi start)
go run cmd/api/main.go
```

### 2. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Set API URL
echo "VITE_API_URL=http://localhost:8080/api" > .env.local

# Start development server
npm run dev
```

### 3. Production Deployment

#### Backend:
```bash
# Build
go build -o medical-api cmd/api/main.go

# Run with production settings
export DB_TYPE=postgres
export DB_HOST=your-db-host
export DB_USER=your-db-user
export DB_PASSWORD=your-db-password
export DB_NAME=medical_db
export PORT=8080

./medical-api
```

#### Frontend:
```bash
# Build for production
npm run build

# Deploy dist/ folder to web server
```

## Sử dụng hệ thống

### 1. Nhân viên (Staff) sử dụng

#### Tạo bài viết mới:
1. Đăng nhập vào dashboard
2. Vào "Quản lý bài viết blog"
3. Click "Bài viết mới"
4. Điền đầy đủ thông tin:
   - Tiêu đề (bắt buộc)
   - Nội dung (bắt buộc)
   - Danh mục (bắt buộc)
   - Tóm tắt (tùy chọn)
   - Tags (tùy chọn)
   - URL hình ảnh (tùy chọn)
5. Chọn "Lưu nháp" hoặc "Xuất bản"

#### Quản lý bài viết:
- **Xem tất cả**: Tab "Tất cả"
- **Lọc theo trạng thái**: Tab "Đã xuất bản" / "Bản nháp"
- **Tìm kiếm**: Gõ từ khóa vào ô tìm kiếm
- **Chỉnh sửa**: Click icon Edit
- **Xuất bản/Hủy xuất bản**: Click icon TrendingUp
- **Xóa**: Click icon Trash (có confirmation)

#### Theo dõi thống kê:
- Tổng số bài viết
- Bài viết đã xuất bản
- Bản nháp
- Tổng lượt xem

### 2. Người dùng công khai

#### Xem bài viết trên trang chủ:
- Bài viết featured được hiển thị nổi bật
- Grid các bài viết mới nhất
- Click "Xem tất cả bài viết" để xem đầy đủ

## Features đã triển khai

### ✅ Hoàn thành:
- [x] Database schema với bảng blog_posts
- [x] Complete CRUD API với Gin framework
- [x] TypeScript interfaces và API service
- [x] Staff dashboard với real-time data
- [x] Blog section trên homepage
- [x] Search và filter functionality
- [x] Stats tracking (views, counts)
- [x] Status management (draft/published)
- [x] Category system
- [x] Tags support
- [x] Image thumbnail support
- [x] Responsive design
- [x] Error handling
- [x] Loading states

### 🔄 Cần phát triển thêm:
- [ ] Rich text editor (WYSIWYG)
- [ ] Image upload functionality
- [ ] Comment system
- [ ] SEO optimization
- [ ] Email notifications
- [ ] Social sharing
- [ ] Advanced analytics
- [ ] Content scheduling
- [ ] Multi-language support

## API Documentation

### GET /api/blog/posts

Lấy danh sách bài viết đã xuất bản.

**Query Parameters:**
- `category` (string): Filter theo danh mục
- `search` (string): Tìm kiếm trong title và content
- `limit` (int): Số lượng bài viết (default: 10)
- `offset` (int): Offset cho pagination
- `sort_by` (string): Sắp xếp theo field (published_at, created_at, view_count)
- `sort_order` (string): asc hoặc desc

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Bài viết mẫu",
      "content": "",
      "excerpt": "Tóm tắt bài viết",
      "thumbnail": "https://example.com/image.jpg",
      "author_id": 1,
      "author_name": "Tác giả",
      "status": "published",
      "category": "Sức khỏe",
      "tags": "tag1,tag2",
      "view_count": 100,
      "created_at": "2023-12-01T10:00:00Z",
      "updated_at": "2023-12-01T10:00:00Z",
      "published_at": "2023-12-01T10:00:00Z"
    }
  ]
}
```

### POST /api/blog/manage/posts

Tạo bài viết mới (cần authentication).

**Request Body:**
```json
{
  "title": "Tiêu đề bài viết",
  "content": "Nội dung đầy đủ",
  "excerpt": "Tóm tắt",
  "category": "Danh mục",
  "tags": "tag1,tag2,tag3",
  "thumbnail": "https://example.com/image.jpg",
  "status": "draft"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Blog post created successfully",
  "data": { /* blog post object */ }
}
```

## Troubleshooting

### 1. CORS Issues
Đảm bảo backend đã cấu hình CORS đúng cách trong `main.go`:
```go
r.Use(func(c *gin.Context) {
    c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
    c.Writer.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
    c.Writer.Header().Set("Access-Control-Allow-Headers", "Origin, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
    if c.Request.Method == "OPTIONS" {
        c.AbortWithStatus(204)
        return
    }
    c.Next()
})
```

### 2. Database Connection Issues
- Kiểm tra database credentials
- Đảm bảo database server đang chạy
- Kiểm tra network connectivity

### 3. API Not Loading
- Kiểm tra `VITE_API_URL` trong frontend
- Kiểm tra backend có đang chạy trên đúng port
- Kiểm tra browser console for errors

### 4. Authentication Issues
- Đảm bảo JWT token được lưu đúng cách
- Kiểm tra token expiration
- Verify middleware configuration

## Monitoring và Logs

### Backend Logs:
```bash
# View logs
tail -f /var/log/medical-api.log

# Check for errors
grep -i error /var/log/medical-api.log
```

### Database Monitoring:
```sql
-- Check blog posts count
SELECT status, COUNT(*) FROM blog_posts GROUP BY status;

-- Check top viewed posts
SELECT title, view_count FROM blog_posts ORDER BY view_count DESC LIMIT 10;

-- Check recent activity
SELECT title, author_name, created_at FROM blog_posts 
JOIN users ON blog_posts.author_id = users.id 
ORDER BY created_at DESC LIMIT 20;
```

## Security Considerations

1. **Authentication**: Tất cả protected endpoints đều yêu cầu JWT token
2. **Authorization**: Chỉ staff/admin mới có thể tạo/sửa bài viết
3. **Input Validation**: Tất cả input đều được validate và sanitize
4. **XSS Protection**: HTML được escape trước khi lưu
5. **SQL Injection**: Sử dụng prepared statements
6. **Rate Limiting**: Nên implement rate limiting cho production

## Performance Optimization

1. **Database Indexes**: Đã tạo indexes cho các fields quan trọng
2. **Pagination**: API hỗ trợ pagination để tránh load quá nhiều data
3. **Caching**: Có thể implement Redis cache cho published posts
4. **Image Optimization**: Nên sử dụng CDN cho images
5. **Minification**: Frontend đã được minify khi build

---

**Tổng kết**: Hệ thống blog đã được tích hợp hoàn toàn với database thực, cho phép nhân viên tạo và quản lý bài viết, đồng thời hiển thị trực tiếp trên trang chủ. Người dùng giờ đây sẽ thấy nội dung thực tế thay vì dữ liệu mẫu. 