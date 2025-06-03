
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, User, Home } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: Heart,
      title: 'Tim mạch',
      description: 'Chẩn đoán và điều trị các bệnh lý tim mạch với công nghệ hiện đại nhất.',
      image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?auto=format&fit=crop&w=400&q=80'
    },
    {
      icon: User,
      title: 'Nội khoa tổng quát',
      description: 'Khám và điều trị các bệnh lý nội khoa với đội ngũ bác sĩ giàu kinh nghiệm.',
      image: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?auto=format&fit=crop&w=400&q=80'
    },
    {
      icon: Home,
      title: 'Khám tại nhà',
      description: 'Dịch vụ khám bệnh tại nhà tiện lợi, an toàn cho mọi lứa tuổi.',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?auto=format&fit=crop&w=400&q=80'
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Dịch vụ y tế chuyên nghiệp
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Chúng tôi cung cấp đa dạng các dịch vụ y tế chất lượng cao với đội ngũ chuyên gia hàng đầu
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white border-0 overflow-hidden">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                  <div className="bg-blue-600 rounded-lg p-2">
                    <service.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200">
            Xem tất cả dịch vụ
          </button>
        </div>
      </div>
    </section>
  );
};

export default Services;
