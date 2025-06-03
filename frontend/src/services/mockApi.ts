// Mock API để test chức năng đăng nhập và đăng ký
import { authService } from './api';

// Mock user database (in-memory)
const mockUsers = [
  {
    id: 1,
    username: 'Test User',
    email: 'test@example.com',
    password: 'password123'
  }
];

// Override các phương thức của authService để test
const originalLogin = authService.login;
const originalRegister = authService.register;

// Override login
authService.login = async (email: string, password: string) => {
  console.log('Using mock login');
  
  // Tạo độ trễ giả lập
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Kiểm tra người dùng
  const user = mockUsers.find(u => u.email === email);
  
  if (!user || user.password !== password) {
    const error: any = new Error('Đăng nhập thất bại');
    error.response = { data: { error: 'Email hoặc mật khẩu không đúng' } };
    throw error;
  }
  
  // Tạo user object và loại bỏ password
  const { password: _, ...userWithoutPassword } = user;
  
  // Giả lập phản hồi từ API
  const response = {
    message: 'Login successful',
    user: userWithoutPassword,
    token: 'mock-jwt-token-' + Date.now()
  };
  
  // Lưu vào localStorage
  localStorage.setItem('token', response.token);
  localStorage.setItem('user', JSON.stringify(response.user));
  
  return response;
};

// Override register
authService.register = async (userData: { username: string; email: string; password: string }) => {
  console.log('Using mock register');
  
  // Tạo độ trễ giả lập
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Kiểm tra email đã tồn tại chưa
  if (mockUsers.find(u => u.email === userData.email)) {
    const error: any = new Error('Đăng ký thất bại');
    error.response = { data: { error: 'Email đã được sử dụng' } };
    throw error;
  }
  
  // Tạo user mới
  const newUser = {
    id: mockUsers.length + 1,
    ...userData
  };
  
  // Thêm vào danh sách
  mockUsers.push(newUser);
  
  // Tạo user object và loại bỏ password
  const { password: _, ...userWithoutPassword } = newUser;
  
  // Giả lập phản hồi từ API
  const response = {
    message: 'Registration successful',
    user: userWithoutPassword,
    token: 'mock-jwt-token-' + Date.now()
  };
  
  // Lưu vào localStorage
  localStorage.setItem('token', response.token);
  localStorage.setItem('user', JSON.stringify(response.user));
  
  console.log('Registered user:', response.user);
  console.log('Current users:', mockUsers);
  
  return response;
};

// Hàm khôi phục các hàm gốc
export function restoreOriginalApi() {
  authService.login = originalLogin;
  authService.register = originalRegister;
}

// Kích hoạt mock API ngay khi file được import
console.log('Mock API activated');

export default {
  activateMockApi: () => {
    console.log('Mock API reactivated');
  },
  restoreOriginalApi
}; 