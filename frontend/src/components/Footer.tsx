
import { Link } from 'react-router-dom';
import { Heart, Home, Info, Book } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-2 rounded-lg">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold">MediCare</h1>
                <p className="text-sm text-gray-400">Bệnh viện đa khoa</p>
              </div>
            </Link>
            <p className="text-gray-400 leading-relaxed">
              Chăm sóc sức khỏe toàn diện với đội ngũ y bác sĩ chuyên nghiệp và trang thiết bị hiện đại.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Liên kết nhanh</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  <Home className="h-4 w-4 mr-2" />
                  Trang chủ
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  <Info className="h-4 w-4 mr-2" />
                  Giới thiệu
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  <Book className="h-4 w-4 mr-2" />
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Dịch vụ</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Khám nội khoa</li>
              <li>Chẩn đoán hình ảnh</li>
              <li>Xét nghiệm</li>
              <li>Phẫu thuật</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Liên hệ</h3>
            <div className="space-y-2 text-gray-400">
              <p>📍 123 Đường ABC, Quận 1, TP.HCM</p>
              <p>📞 (028) 1234 5678</p>
              <p>✉️ info@medicare.vn</p>
              <p>🕐 24/7 - Luôn sẵn sàng phục vụ</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 MediCare Hospital. Tất cả quyền được bảo lưu.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
