
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Blog = () => {
  const posts = [
    {
      title: '10 cách phòng ngừa bệnh tim mạch hiệu quả',
      excerpt: 'Tìm hiểu các biện pháp đơn giản để bảo vệ sức khỏe tim mạch của bạn...',
      date: '15/12/2024',
      author: 'BS. Nguyễn Văn A',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=400&q=80',
      category: 'Tim mạch'
    },
    {
      title: 'Chế độ dinh dưỡng khoa học cho người tiểu đường',
      excerpt: 'Hướng dẫn chi tiết về chế độ ăn uống phù hợp cho bệnh nhân tiểu đường...',
      date: '12/12/2024',
      author: 'BS. Trần Thị B',
      image: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?auto=format&fit=crop&w=400&q=80',
      category: 'Dinh dưỡng'
    },
    {
      title: 'Tầm quan trọng của việc khám sức khỏe định kỳ',
      excerpt: 'Vì sao bạn nên khám sức khỏe định kỳ và những lợi ích mang lại...',
      date: '10/12/2024',
      author: 'BS. Lê Văn C',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?auto=format&fit=crop&w=400&q=80',
      category: 'Sức khỏe tổng quát'
    },
    {
      title: 'Cách chăm sóc sức khỏe người cao tuổi',
      excerpt: 'Những lưu ý quan trọng trong việc chăm sóc và theo dõi sức khỏe người cao tuổi...',
      date: '08/12/2024',
      author: 'BS. Phạm Thị D',
      image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?auto=format&fit=crop&w=400&q=80',
      category: 'Người cao tuổi'
    },
    {
      title: 'Hiểu đúng về vắc xin và tầm quan trọng của tiêm chủng',
      excerpt: 'Thông tin chính xác về vắc xin và lịch tiêm chủng cho mọi lứa tuổi...',
      date: '05/12/2024',
      author: 'BS. Hoàng Văn E',
      image: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?auto=format&fit=crop&w=400&q=80',
      category: 'Phòng ngừa'
    },
    {
      title: 'Stress và ảnh hưởng đến sức khỏe',
      excerpt: 'Tác động của stress đến cơ thể và cách quản lý stress hiệu quả...',
      date: '03/12/2024',
      author: 'BS. Vũ Thị F',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?auto=format&fit=crop&w=400&q=80',
      category: 'Sức khỏe tâm thần'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog sức khỏe</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Chia sẻ kiến thức y khoa và mẹo chăm sóc sức khỏe từ các chuyên gia
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="relative h-48 overflow-hidden rounded-t-lg">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {post.category}
                  </span>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors cursor-pointer">
                  {post.title}
                </CardTitle>
                <p className="text-gray-600 text-sm leading-relaxed">{post.excerpt}</p>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{post.author}</span>
                  <span>{post.date}</span>
                </div>
                <button className="w-full mt-4 text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200">
                  Đọc thêm →
                </button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200">
            Xem thêm bài viết
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Blog;
