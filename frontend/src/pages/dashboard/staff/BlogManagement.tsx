import React, { useState, useEffect } from 'react';
import Sidebar from '../../../components/dashboard/Sidebar';
import Header from '../../../components/dashboard/Header';
import { Search, Edit2, Trash2, Eye, Plus, Calendar, User, Filter, FileText, TrendingUp, BarChart3 } from 'lucide-react';
import { blogApi, BlogPost, BlogStats } from '../../../services/blogApi';

const BlogManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'published' | 'draft'>('all');
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [stats, setStats] = useState<BlogStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [categories, setCategories] = useState<string[]>([]);

  // Load data on component mount
  useEffect(() => {
    loadData();
    loadCategories();
  }, []);

  // Reload posts when tab changes
  useEffect(() => {
    loadPosts();
  }, [activeTab, searchTerm]);

  const loadData = async () => {
    await Promise.all([loadPosts(), loadStats()]);
  };

  const loadPosts = async () => {
    setLoading(true);
    try {
      const filter = {
        status: activeTab === 'all' ? undefined : activeTab,
        search: searchTerm || undefined,
        limit: 50,
        sort_by: 'updated_at',
        sort_order: 'desc' as const
      };

      const response = await blogApi.getAllPosts(filter);
      if (response.success && response.data) {
        setPosts(response.data);
      } else {
        console.error('Failed to load posts:', response.error);
      }
    } catch (error) {
      console.error('Error loading posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      const response = await blogApi.getStats();
      if (response.success && response.data) {
        setStats(response.data);
      }
    } catch (error) {
      console.error('Error loading stats:', error);
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

  const handleDeletePost = async (id: number) => {
    if (!confirm('Bạn có chắc chắn muốn xóa bài viết này?')) return;

    try {
      const response = await blogApi.deletePost(id);
      if (response.success) {
        await loadData(); // Reload data after deletion
      } else {
        alert('Lỗi khi xóa bài viết: ' + response.error);
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Có lỗi xảy ra khi xóa bài viết');
    }
  };

  const handlePublishPost = async (id: number) => {
    try {
      const response = await blogApi.publishPost(id);
      if (response.success) {
        await loadData(); // Reload data after publishing
      } else {
        alert('Lỗi khi xuất bản bài viết: ' + response.error);
      }
    } catch (error) {
      console.error('Error publishing post:', error);
      alert('Có lỗi xảy ra khi xuất bản bài viết');
    }
  };

  const handleUnpublishPost = async (id: number) => {
    try {
      const response = await blogApi.unpublishPost(id);
      if (response.success) {
        await loadData(); // Reload data after unpublishing
      } else {
        alert('Lỗi khi hủy xuất bản bài viết: ' + response.error);
      }
    } catch (error) {
      console.error('Error unpublishing post:', error);
      alert('Có lỗi xảy ra khi hủy xuất bản bài viết');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  const CreatePostModal = () => {
    const [formData, setFormData] = useState({
      title: '',
      content: '',
      excerpt: '',
      category: '',
      tags: '',
      thumbnail: '',
      status: 'draft' as const
    });

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        const response = await blogApi.createPost(formData);
        if (response.success) {
          setShowCreateModal(false);
          setFormData({
            title: '',
            content: '',
            excerpt: '',
            category: '',
            tags: '',
            thumbnail: '',
            status: 'draft'
          });
          await loadData();
          alert('Bài viết đã được lưu thành công!');
        } else {
          // Check for specific authentication errors
          if (response.error?.includes('authorization header is required') || 
              response.error?.includes('Unauthorized') ||
              response.error?.includes('login')) {
            alert('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.');
            // Optionally redirect to login page
            window.location.href = '/signin';
          } else if (response.error?.includes('Endpoint not found')) {
            alert('Lỗi hệ thống: Không tìm thấy API endpoint. Vui lòng kiểm tra kết nối server.');
          } else {
            alert('Lỗi khi tạo bài viết: ' + response.error);
          }
        }
      } catch (error) {
        console.error('Error creating post:', error);
        alert('Có lỗi xảy ra khi tạo bài viết. Vui lòng thử lại.');
      }
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
          <h3 className="text-lg font-semibold mb-6">Tạo bài viết mới</h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tiêu đề</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Danh mục</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Chọn danh mục</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tags (phân cách bằng dấu phẩy)</label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => setFormData({...formData, tags: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="tag1, tag2, tag3"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">URL hình ảnh</label>
              <input
                type="url"
                value={formData.thumbnail}
                onChange={(e) => setFormData({...formData, thumbnail: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tóm tắt</label>
              <textarea
                value={formData.excerpt}
                onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Tóm tắt ngắn gọn về bài viết..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nội dung</label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({...formData, content: e.target.value})}
                rows={10}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nội dung chi tiết của bài viết..."
                required
              />
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Hủy
              </button>
              <button
                type="button"
                onClick={() => {
                  setFormData({...formData, status: 'draft'});
                  handleSubmit(new Event('submit') as any);
                }}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
              >
                Lưu nháp
              </button>
              <button
                type="button"
                onClick={async () => {
                  const updatedFormData = {...formData, status: 'published' as const};
                  try {
                    const response = await blogApi.createPost(updatedFormData);
                    if (response.success) {
                      setShowCreateModal(false);
                      setFormData({
                        title: '',
                        content: '',
                        excerpt: '',
                        category: '',
                        tags: '',
                        thumbnail: '',
                        status: 'draft'
                      });
                      await loadData();
                      alert('Bài viết đã được xuất bản thành công!');
                    } else {
                      // Check for specific authentication errors
                      if (response.error?.includes('authorization header is required') || 
                          response.error?.includes('Unauthorized') ||
                          response.error?.includes('login')) {
                        alert('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.');
                        // Optionally redirect to login page
                        window.location.href = '/signin';
                      } else if (response.error?.includes('Endpoint not found')) {
                        alert('Lỗi hệ thống: Không tìm thấy API endpoint. Vui lòng kiểm tra kết nối server.');
                      } else {
                        alert('Lỗi khi tạo bài viết: ' + response.error);
                      }
                    }
                  } catch (error) {
                    console.error('Error creating post:', error);
                    alert('Có lỗi xảy ra khi tạo bài viết. Vui lòng thử lại.');
                  }
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Xuất bản
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <Sidebar role="staff" />
        <div className="flex-1">
          <Header role="staff" userName="NV. Lê Văn Staff" />
          <main className="p-6">
            <div className="max-w-7xl mx-auto">
              {/* Stats Cards */}
              {stats && (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <div className="flex items-center">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <FileText className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Tổng bài viết</p>
                        <p className="text-2xl font-semibold text-gray-900">{stats.total_posts}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <div className="flex items-center">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <TrendingUp className="w-6 h-6 text-green-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Đã xuất bản</p>
                        <p className="text-2xl font-semibold text-gray-900">{stats.published_posts}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <div className="flex items-center">
                      <div className="p-2 bg-yellow-100 rounded-lg">
                        <Edit2 className="w-6 h-6 text-yellow-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Bản nháp</p>
                        <p className="text-2xl font-semibold text-gray-900">{stats.draft_posts}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <div className="flex items-center">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <BarChart3 className="w-6 h-6 text-purple-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Tổng lượt xem</p>
                        <p className="text-2xl font-semibold text-gray-900">{stats.total_views}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Header */}
              <div className="mb-6 flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0">
                <h1 className="text-2xl font-semibold text-gray-900">Quản lý bài viết blog</h1>
                <div className="flex space-x-2">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Tìm kiếm bài viết..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full md:w-64 py-2 pl-10 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  </div>
                  <button className="p-2 bg-white text-gray-600 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors">
                    <Filter className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => setShowCreateModal(true)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                  >
                    <Plus className="w-5 h-5 mr-1" />
                    <span>Bài viết mới</span>
                  </button>
                </div>
              </div>

              {/* Tabs */}
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
                <div className="flex space-x-4 border-b border-gray-200">
                  <button
                    onClick={() => setActiveTab('all')}
                    className={`pb-4 px-1 font-medium text-sm ${
                      activeTab === 'all'
                        ? 'text-blue-600 border-b-2 border-blue-600'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Tất cả ({posts.length})
                  </button>
                  <button
                    onClick={() => setActiveTab('published')}
                    className={`pb-4 px-1 font-medium text-sm ${
                      activeTab === 'published'
                        ? 'text-blue-600 border-b-2 border-blue-600'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Đã xuất bản ({posts.filter(p => p.status === 'published').length})
                  </button>
                  <button
                    onClick={() => setActiveTab('draft')}
                    className={`pb-4 px-1 font-medium text-sm ${
                      activeTab === 'draft'
                        ? 'text-blue-600 border-b-2 border-blue-600'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Bản nháp ({posts.filter(p => p.status === 'draft').length})
                  </button>
                </div>
              </div>

              {/* Blog Posts */}
              {loading ? (
                <div className="text-center py-8">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  <p className="mt-2 text-gray-600">Đang tải...</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {posts.map((post) => (
                    <div key={post.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                      <div className="md:flex">
                        {post.thumbnail && (
                          <div className="md:flex-shrink-0">
                            <img
                              className="h-48 w-full object-cover md:h-full md:w-48"
                              src={post.thumbnail}
                              alt={post.title}
                            />
                          </div>
                        )}
                        <div className="p-6 flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="flex items-center space-x-2 mb-1">
                                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                                  post.status === 'published'
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-yellow-100 text-yellow-800'
                                }`}>
                                  {post.status === 'published' ? 'Đã xuất bản' : 'Bản nháp'}
                                </span>
                                <span className="text-gray-500 text-xs">{post.category}</span>
                              </div>
                              <h2 className="text-lg font-semibold text-gray-900 mb-1">{post.title}</h2>
                              <p className="text-gray-600 mb-3">{post.excerpt}</p>
                            </div>
                          </div>
                          
                          <div className="flex justify-between items-end">
                            <div className="text-sm text-gray-500 flex items-center space-x-4">
                              <div className="flex items-center">
                                <User className="w-4 h-4 mr-1" />
                                <span>{post.author_name}</span>
                              </div>
                              <div className="flex items-center">
                                <Calendar className="w-4 h-4 mr-1" />
                                <span>{formatDate(post.updated_at)}</span>
                              </div>
                              {post.status === 'published' && (
                                <div className="flex items-center">
                                  <Eye className="w-4 h-4 mr-1" />
                                  <span>{post.view_count.toLocaleString()}</span>
                                </div>
                              )}
                            </div>
                            
                            <div className="flex space-x-2">
                              <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md transition-colors">
                                <Eye className="w-4 h-4" />
                              </button>
                              <button 
                                onClick={() => setEditingPost(post)}
                                className="p-1.5 text-yellow-600 hover:bg-yellow-50 rounded-md transition-colors"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                              {post.status === 'draft' ? (
                                <button 
                                  onClick={() => handlePublishPost(post.id)}
                                  className="p-1.5 text-green-600 hover:bg-green-50 rounded-md transition-colors"
                                  title="Xuất bản"
                                >
                                  <TrendingUp className="w-4 h-4" />
                                </button>
                              ) : (
                                <button 
                                  onClick={() => handleUnpublishPost(post.id)}
                                  className="p-1.5 text-orange-600 hover:bg-orange-50 rounded-md transition-colors"
                                  title="Hủy xuất bản"
                                >
                                  <TrendingUp className="w-4 h-4" />
                                </button>
                              )}
                              <button 
                                onClick={() => handleDeletePost(post.id)}
                                className="p-1.5 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {posts.length === 0 && !loading && (
                    <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 text-center">
                      <FileText className="mx-auto h-12 w-12 text-gray-400" />
                      <h3 className="mt-2 text-sm font-medium text-gray-900">Không có bài viết nào</h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Bắt đầu bằng cách tạo bài viết mới.
                      </p>
                      <div className="mt-6">
                        <button
                          onClick={() => setShowCreateModal(true)}
                          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                        >
                          <Plus className="-ml-1 mr-2 h-5 w-5" />
                          Tạo bài viết mới
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </main>
        </div>
      </div>

      {/* Create Post Modal */}
      {showCreateModal && <CreatePostModal />}
    </div>
  );
};

export default BlogManagement; 