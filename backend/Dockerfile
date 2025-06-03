FROM golang:1.21-alpine AS builder

# Tạo đúng đường dẫn module
WORKDIR /go/src/github.com/dottrip/fpt-swp/backend

# Copy go.mod và go.sum trước để cache dependency
COPY backend/go.mod ./
COPY backend/go.sum ./
RUN apk add --no-cache git
RUN go mod download

# Copy toàn bộ source code vào đúng module path
COPY backend/ .

# Build ứng dụng
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o main ./cmd/api/main.go

# Final stage
FROM alpine:latest
RUN apk --no-cache add ca-certificates tzdata
WORKDIR /root/
COPY --from=builder /go/src/github.com/dottrip/fpt-swp/backend/main .
EXPOSE 8080
CMD ["./main"]