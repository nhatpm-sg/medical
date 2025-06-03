import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Heart } from 'lucide-react';
import { authService } from '@/services/api';
import { toast } from 'sonner';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await authService.login(email, password);
      toast.success('Đăng nhập thành công!');
      navigate('/dashboard'); // Chuyển hướng đến dashboard sau khi đăng nhập
    } catch (error: any) {
      console.error('Login failed:', error);
      toast.error(error.response?.data?.error || 'Đăng nhập thất bại. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2">
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-3 rounded-lg">
              <Heart className="h-8 w-8 text-white" />
            </div>
            <div className="text-left">
              <h1 className="text-2xl font-bold text-blue-900">MediCare</h1>
              <p className="text-sm text-blue-600">Bệnh viện đa khoa</p>
            </div>
          </Link>
        </div>

        <Card className="shadow-xl border-0">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-gray-900">Đăng nhập</CardTitle>
            <p className="text-gray-600">Đăng nhập vào tài khoản của bạn</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Nhập địa chỉ email"
                  required
                  disabled={loading}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mật khẩu
                </label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Nhập mật khẩu"
                  required
                  disabled={loading}
                  className="w-full"
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input type="checkbox" className="h-4 w-4 text-blue-600 border-gray-300 rounded" />
                  <span className="ml-2 text-sm text-gray-600">Ghi nhớ đăng nhập</span>
                </label>
                <Link to="#" className="text-sm text-blue-600 hover:text-blue-700">
                  Quên mật khẩu?
                </Link>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={loading}
              >
                {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Chưa có tài khoản?{' '}
                <Link to="/signup" className="text-blue-600 hover:text-blue-700 font-medium">
                  Đăng ký ngay
                </Link>
              </p>
            </div>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Hoặc</span>
                </div>
              </div>

              <div className="mt-6">
                <Button
                  variant="outline"
                  className="w-full border-gray-300 text-gray-700 hover:bg-gray-50"
                  disabled={loading}
                >
                  Đăng nhập với Google
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-8">
          <Link to="/" className="text-blue-600 hover:text-blue-700">
            ← Quay về trang chủ
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
