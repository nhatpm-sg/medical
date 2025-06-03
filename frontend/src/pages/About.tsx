
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const About = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Giới thiệu về MediCare</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Hơn 15 năm đồng hành cùng sức khỏe cộng đồng
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Sứ mệnh của chúng tôi</h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              MediCare được thành lập với sứ mệnh mang đến dịch vụ chăm sóc sức khỏe chất lượng cao, 
              dễ tiếp cận cho mọi người. Chúng tôi cam kết sử dụng công nghệ tiên tiến và 
              đội ngũ y bác sĩ giàu kinh nghiệm để phục vụ bệnh nhân tốt nhất.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Với triết lý "Bệnh nhân là trung tâm", chúng tôi không ngừng nỗ lực để cải thiện 
              chất lượng dịch vụ và mang lại trải nghiệm tích cực cho mỗi bệnh nhân.
            </p>
          </div>
          <div>
            <img
              src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=600&q=80"
              alt="Bệnh viện"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="text-center">
            <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-blue-600">15+</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Năm kinh nghiệm</h3>
            <p className="text-gray-600">Phục vụ cộng đồng từ năm 2009</p>
          </div>
          <div className="text-center">
            <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-green-600">50+</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Bác sĩ chuyên khoa</h3>
            <p className="text-gray-600">Đội ngũ y bác sĩ giàu kinh nghiệm</p>
          </div>
          <div className="text-center">
            <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-purple-600">10K+</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Bệnh nhân tin tưởng</h3>
            <p className="text-gray-600">Được tin tưởng lựa chọn hàng năm</p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default About;
