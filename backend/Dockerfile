FROM golang:1.21-alpine AS builder

# Set working directory
WORKDIR /app

# Copy go.mod and go.sum
COPY backend/go.mod backend/go.sum ./

# Install build dependencies
RUN apk add --no-cache git

# Download dependencies
RUN go mod download
RUN go mod tidy

# Copy source code
COPY backend/. .

# Chạy tidy lại một lần nữa sau khi copy mã nguồn
RUN go mod tidy

# Build the application
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o main ./cmd/api/main.go

# Final stage
FROM alpine:latest

RUN apk --no-cache add ca-certificates tzdata

WORKDIR /root/

# Copy binary from builder stage
COPY --from=builder /app/main .
# Copy .env.production to .env if it exists
COPY --from=builder /app/.env.production ./.env

# Expose port
EXPOSE 8080

# Command to run
CMD ["./main"] 