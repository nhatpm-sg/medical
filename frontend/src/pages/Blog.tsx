import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Calendar, User, Eye, Tag, Filter } from 'lucide-react';
import { blogApi, BlogPost } from '@/services/blogApi';

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    // Get search and category from URL params
    const urlSearch = searchParams.get('search') || '';
    const urlCategory = searchParams.get('category') || '';
    setSearchTerm(urlSearch);
    setSelectedCategory(urlCategory);
    
    loadCategories();
    loadPosts(urlSearch, urlCategory);
  }, [searchParams]);

  const loadPosts = async (search = searchTerm, category = selectedCategory) => {
    setLoading(true);
    try {
      const filter = {
        search: search || undefined,
        category: category || undefined,
        limit: 20,
        sort_by: 'published_at',
        sort_order: 'desc' as const
      };

      const response = await blogApi.getPublishedPosts(filter);
      if (response.success && response.data) {
        setPosts(response.data);
      } else {
        console.error('Failed to load posts:', response.error);
        setPosts([]);
      }
    } catch (error) {
      console.error('Error loading posts:', error);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  const loadCategories = async () => {
    try {
      const response = await blogApi.getCategories();
      if (response.success && response.data) {
        setCategories(response.data);
      }
    } catch (error) {
      console.error('Error loading categories:', error);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateFilters(searchTerm, selectedCategory);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    updateFilters(searchTerm, category);
  };

  const updateFilters = (search: string, category: string) => {
    const newParams = new URLSearchParams();
    if (search) newParams.set('search', search);
    if (category) newParams.set('category', category);
    setSearchParams(newParams);
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

        {/* Search and Filter Section */}
        <div className="mb-8 bg-gray-50 p-6 rounded-lg">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Form */}
            <form onSubmit={handleSearch} className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Tìm kiếm bài viết..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              </div>
            </form>

            {/* Category Filter */}
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Tất cả danh mục</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
            </div>

            {/* Search Button */}
            <button
              type="button"
              onClick={handleSearch}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
            >
              Tìm kiếm
            </button>
          </div>
        </div>

        {/* Results Info */}
        {(searchTerm || selectedCategory) && (
          <div className="mb-6 text-gray-600">
            {loading ? (
              <p>Đang tìm kiếm...</p>
            ) : (
              <p>
                Tìm thấy {posts.length} bài viết
                {searchTerm && ` cho "${searchTerm}"`}
                {selectedCategory && ` trong danh mục "${selectedCategory}"`}
              </p>
            )}
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Đang tải bài viết...</p>
          </div>
        )}

        {/* Posts Grid */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Card key={post.id} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                {post.thumbnail && (
                  <div className="relative h-48 overflow-hidden rounded-t-lg">
                    <img
                      src={post.thumbnail}
                      alt={post.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                    {post.category && (
                      <div className="absolute top-4 left-4">
                        <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                          {post.category}
                        </span>
                      </div>
                    )}
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors cursor-pointer">
                    {post.title}
                  </CardTitle>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {post.excerpt || truncateText(post.content, 120)}
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-1" />
                      <span>{post.author_name}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>
                        {post.published_at ? formatDate(post.published_at) : formatDate(post.created_at)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center">
                      <Eye className="w-4 h-4 mr-1" />
                      <span>{post.view_count} lượt xem</span>
                    </div>
                    {post.tags && (
                      <div className="flex items-center">
                        <Tag className="w-4 h-4 mr-1" />
                        <span className="text-xs">
                          {post.tags.split(',').slice(0, 2).join(', ')}
                        </span>
                      </div>
                    )}
                  </div>

                  <button 
                    className="w-full text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
                    onClick={() => {
                      // Here you can add navigation to blog detail page
                      // For now, we'll just increment view count
                      blogApi.getPublishedPost(post.id, true);
                    }}
                  >
                    Đọc thêm →
                  </button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* No Posts Found */}
        {!loading && posts.length === 0 && (
          <div className="text-center py-16">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Không tìm thấy bài viết nào
            </h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || selectedCategory
                ? 'Hãy thử tìm kiếm với từ khóa khác hoặc chọn danh mục khác.'
                : 'Hiện tại chưa có bài viết nào được xuất bản.'}
            </p>
            {(searchTerm || selectedCategory) && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('');
                  setSearchParams(new URLSearchParams());
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
              >
                Xem tất cả bài viết
              </button>
            )}
          </div>
        )}

        {/* Load More Button */}
        {!loading && posts.length > 0 && posts.length % 20 === 0 && (
          <div className="text-center mt-12">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200">
              Xem thêm bài viết
            </button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Blog;
