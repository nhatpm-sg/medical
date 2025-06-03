
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Home, User, Book } from 'lucide-react';

const Contact = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Liên hệ với chúng tôi</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Hãy để lại thông tin, chúng tôi sẽ liên hệ tư vấn và hỗ trợ bạn sớm nhất
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-900">Gửi tin nhắn</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Họ và tên</label>
                  <Input placeholder="Nhập họ và tên" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Số điện thoại</label>
                  <Input placeholder="Nhập số điện thoại" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <Input type="email" placeholder="Nhập địa chỉ email" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Dịch vụ quan tâm</label>
                <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>Chọn dịch vụ</option>
                  <option>Khám nội khoa</option>
                  <option>Tim mạch</option>
                  <option>Chẩn đoán hình ảnh</option>
                  <option>Khám tại nhà</option>
                  <option>Gói khám sức khỏe</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tin nhắn</label>
                <textarea 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-32"
                  placeholder="Nhập tin nhắn của bạn..."
                ></textarea>
              </div>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                Gửi tin nhắn
              </Button>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-xl font-bold text-gray-900">
                  <Home className="h-6 w-6 mr-2 text-blue-600" />
                  Thông tin liên hệ
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900">Địa chỉ</h4>
                  <p className="text-gray-600">123 Đường ABC, Phường XYZ, Quận 1, TP.HCM</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Điện thoại</h4>
                  <p className="text-gray-600">(028) 1234 5678</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Email</h4>
                  <p className="text-gray-600">info@medicare.vn</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Giờ làm việc</h4>
                  <p className="text-gray-600">24/7 - Luôn sẵn sàng phục vụ</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-xl font-bold text-gray-900">
                  <User className="h-6 w-6 mr-2 text-blue-600" />
                  Đặt lịch khám
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Để được phục vụ tốt nhất, vui lòng đặt lịch trước khi đến khám
                </p>
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  Đặt lịch ngay
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-xl font-bold text-gray-900">
                  <Book className="h-6 w-6 mr-2 text-blue-600" />
                  Tư vấn trực tuyến
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Nhận tư vấn sức khỏe miễn phí từ đội ngũ bác sĩ chuyên khoa
                </p>
                <Button variant="outline" className="w-full border-blue-600 text-blue-600 hover:bg-blue-50">
                  Tư vấn ngay
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
