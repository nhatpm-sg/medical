
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Services = () => {
  const services = [
    {
      title: 'Khám nội khoa tổng quát',
      description: 'Khám và điều trị các bệnh lý nội khoa phổ biến',
      price: '200.000 VNĐ',
      features: ['Khám lâm sàng', 'Tư vấn điều trị', 'Kê đơn thuốc']
    },
    {
      title: 'Chẩn đoán hình ảnh',
      description: 'X-quang, siêu âm, CT, MRI với máy móc hiện đại',
      price: '300.000 - 2.000.000 VNĐ',
      features: ['X-quang số', 'Siêu âm 4D', 'CT Scanner', 'MRI 1.5T']
    },
    {
      title: 'Xét nghiệm',
      description: 'Xét nghiệm máu, nước tiểu và các xét nghiệm chuyên khoa',
      price: '100.000 - 500.000 VNĐ',
      features: ['Xét nghiệm cơ bản', 'Xét nghiệm chuyên khoa', 'Kết quả nhanh']
    },
    {
      title: 'Tim mạch',
      description: 'Chẩn đoán và điều trị các bệnh lý tim mạch',
      price: '500.000 VNĐ',
      features: ['Siêu âm tim', 'Điện tâm đồ', 'Holter 24h', 'Tư vấn chuyên khoa']
    },
    {
      title: 'Khám tại nhà',
      description: 'Dịch vụ khám bệnh tại nhà cho người cao tuổi',
      price: '800.000 VNĐ',
      features: ['Bác sĩ tận nhà', 'Thiết bị y tế di động', 'Tư vấn 24/7']
    },
    {
      title: 'Gói khám sức khỏe',
      description: 'Các gói khám sức khỏe tổng quát định kỳ',
      price: '1.500.000 - 5.000.000 VNĐ',
      features: ['Khám toàn diện', 'Xét nghiệm đầy đủ', 'Báo cáo chi tiết']
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Dịch vụ y tế</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Đa dạng các dịch vụ y tế chuyên nghiệp với giá cả hợp lý
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-blue-900">{service.title}</CardTitle>
                <p className="text-gray-600">{service.description}</p>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <span className="text-2xl font-bold text-blue-600">{service.price}</span>
                </div>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-600">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors duration-200">
                  Đặt lịch khám
                </button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Services;
