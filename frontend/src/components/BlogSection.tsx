import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, Eye, ArrowRight } from 'lucide-react';
import { blogApi, BlogPost } from '../services/blogApi';

const BlogSection: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const response = await blogApi.getPublishedPosts({
        limit: 6,
        sort_by: 'published_at',
        sort_order: 'desc'
      });
      
      if (response.success && response.data) {
        setPosts(response.data);
      }
    } catch (error) {
      console.error('Error loading blog posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Đang tải bài viết...</p>
          </div>
        </div>
      </section>
    );
  }

  if (posts.length === 0) {
    return null; // Don't show section if no posts
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Blog sức khỏe
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Chia sẻ kiến thức y khoa và mẹo chăm sóc sức khỏe từ các chuyên gia hàng đầu
          </p>
        </div>

        {/* Featured Post */}
        {posts.length > 0 && (
          <div className="mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="order-2 lg:order-1">
                {posts[0].thumbnail && (
                  <img
                    src={posts[0].thumbnail}
                    alt={posts[0].title}
                    className="w-full h-80 object-cover rounded-lg shadow-lg"
                  />
                )}
              </div>
              
              <div className="order-1 lg:order-2">
                <div className="p-8">
                  <div className="flex items-center space-x-4 mb-4">
                    <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                      {posts[0].category}
                    </span>
                    <div className="flex items-center text-gray-500 text-sm">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>{posts[0].published_at ? formatDate(posts[0].published_at) : formatDate(posts[0].created_at)}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {posts[0].title}
                  </h3>
                  
                  <p className="text-gray-600 mb-6">
                    {posts[0].excerpt || truncateText(posts[0].content, 200)}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-1" />
                        <span>{posts[0].author_name}</span>
                      </div>
                      <div className="flex items-center">
                        <Eye className="w-4 h-4 mr-1" />
                        <span>{posts[0].view_count} lượt xem</span>
                      </div>
                    </div>
                    
                    <button 
                      className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
                      onClick={() => {
                        // Increment view count when user shows interest
                        blogApi.getPublishedPost(posts[0].id, true);
                      }}
                    >
                      Đọc tiếp
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Other Posts Grid */}
        {posts.length > 1 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {posts.slice(1, 6).map((post) => (
              <article key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                {post.thumbnail && (
                  <img
                    src={post.thumbnail}
                    alt={post.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                
                <div className="p-6">
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
                      {post.category}
                    </span>
                    <div className="flex items-center text-gray-500 text-xs">
                      <Calendar className="w-3 h-3 mr-1" />
                      <span>{post.published_at ? formatDate(post.published_at) : formatDate(post.created_at)}</span>
                    </div>
                  </div>
                  
                  <h3 
                    className="text-lg font-semibold text-gray-900 mb-2 hover:text-blue-600 transition-colors cursor-pointer"
                    onClick={() => {
                      // Increment view count when user shows interest
                      blogApi.getPublishedPost(post.id, true);
                    }}
                  >
                    {truncateText(post.title, 80)}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4">
                    {post.excerpt || truncateText(post.content, 120)}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center">
                      <User className="w-3 h-3 mr-1" />
                      <span>{post.author_name}</span>
                    </div>
                    
                    <div className="flex items-center">
                      <Eye className="w-3 h-3 mr-1" />
                      <span>{post.view_count}</span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* View All Button */}
        <div className="text-center">
          <Link 
            to="/blog"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            Xem tất cả bài viết
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogSection; 