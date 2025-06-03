import React, { useState } from 'react';
import Sidebar from '../../../components/dashboard/Sidebar';
import Header from '../../../components/dashboard/Header';
import { Search, Edit2, Trash2, Eye, Plus, Calendar, User, Filter } from 'lucide-react';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  status: 'published' | 'draft';
  category: string;
  views: number;
  coverImage: string;
}

const BlogManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'published' | 'draft'>('all');
  
  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: 'Phòng ngừa bệnh cúm mùa trong thời điểm giao mùa',
      excerpt: 'Những biện pháp hiệu quả để phòng ngừa bệnh cúm mùa khi thời tiết thay đổi, giúp bảo vệ sức khỏe cho cả gia đình.',
      author: 'BS. Nguyễn Văn A',
      date: '01/12/2023',
      status: 'published',
      category: 'Sức khỏe tổng quát',
      views: 1245,
      coverImage: 'https://placehold.co/800x400/eef/fff'
    },
    {
      id: 2,
      title: 'Chế độ dinh dưỡng cho người cao tuổi',
      excerpt: 'Hướng dẫn chế độ dinh dưỡng phù hợp cho người cao tuổi, giúp duy trì sức khỏe và phòng ngừa các bệnh lý thường gặp.',
      author: 'BS. Trần Thị B',
      date: '28/11/2023',
      status: 'published',
      category: 'Dinh dưỡng',
      views: 895,
      coverImage: 'https://placehold.co/800x400/efe/fff'
    },
    {
      id: 3,
      title: 'Tác dụng của việc tập thể dục đều đặn',
      excerpt: 'Những lợi ích không ngờ của việc duy trì thói quen tập thể dục đều đặn mỗi ngày đối với sức khỏe thể chất và tinh thần.',
      author: 'BS. Lê Văn C',
      date: '25/11/2023',
      status: 'draft',
      category: 'Thể dục thể thao',
      views: 0,
      coverImage: 'https://placehold.co/800x400/fee/fff'
    },
  ];

  const filteredPosts = activeTab === 'all'
    ? blogPosts
    : blogPosts.filter(post => post.status === activeTab);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <Sidebar role="staff" />
        <div className="flex-1">
          <Header role="staff" userName="NV. Lê Văn Staff" />
          <main className="p-6">
            <div className="max-w-7xl mx-auto">
              {/* Header */}
              <div className="mb-6 flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0">
                <h1 className="text-2xl font-semibold text-gray-900">Quản lý bài viết blog</h1>
                <div className="flex space-x-2">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Tìm kiếm bài viết..."
                      className="w-full md:w-64 py-2 pl-10 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  </div>
                  <button className="p-2 bg-white text-gray-600 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors">
                    <Filter className="w-5 h-5" />
                  </button>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center">
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
                    Tất cả
                  </button>
                  <button
                    onClick={() => setActiveTab('published')}
                    className={`pb-4 px-1 font-medium text-sm ${
                      activeTab === 'published'
                        ? 'text-blue-600 border-b-2 border-blue-600'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Đã xuất bản
                  </button>
                  <button
                    onClick={() => setActiveTab('draft')}
                    className={`pb-4 px-1 font-medium text-sm ${
                      activeTab === 'draft'
                        ? 'text-blue-600 border-b-2 border-blue-600'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Bản nháp
                  </button>
                </div>
              </div>

              {/* Blog Posts */}
              <div className="space-y-6">
                {filteredPosts.map((post) => (
                  <div key={post.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="md:flex">
                      <div className="md:flex-shrink-0">
                        <img
                          className="h-48 w-full object-cover md:h-full md:w-48"
                          src={post.coverImage}
                          alt={post.title}
                        />
                      </div>
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
                              <span>{post.author}</span>
                            </div>
                            <div className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              <span>{post.date}</span>
                            </div>
                            {post.status === 'published' && (
                              <div className="flex items-center">
                                <Eye className="w-4 h-4 mr-1" />
                                <span>{post.views.toLocaleString()}</span>
                              </div>
                            )}
                          </div>
                          
                          <div className="flex space-x-2">
                            <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md transition-colors">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="p-1.5 text-yellow-600 hover:bg-yellow-50 rounded-md transition-colors">
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button className="p-1.5 text-red-600 hover:bg-red-50 rounded-md transition-colors">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {filteredPosts.length === 0 && (
                  <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12l-3-3m0 0l-3 3m3-3v6m-1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                      />
                    </svg>
                    <h3 className="mt-2 text-lg font-medium text-gray-900">Không có bài viết nào</h3>
                    <p className="mt-1 text-gray-500">
                      {activeTab === 'draft'
                        ? 'Không có bản nháp nào'
                        : activeTab === 'published'
                        ? 'Không có bài viết nào đã xuất bản'
                        : 'Bắt đầu bằng cách tạo bài viết mới'}
                    </p>
                    <div className="mt-6">
                      <button
                        type="button"
                        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        <Plus className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                        Tạo bài viết mới
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Pagination */}
              {filteredPosts.length > 0 && (
                <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 mt-6 rounded-lg shadow-sm">
                  <div className="flex flex-1 justify-between sm:hidden">
                    <button className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                      Trước
                    </button>
                    <button className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                      Sau
                    </button>
                  </div>
                  <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm text-gray-700">
                        Hiển thị <span className="font-medium">1</span> đến <span className="font-medium">3</span> của{' '}
                        <span className="font-medium">12</span> kết quả
                      </p>
                    </div>
                    <div>
                      <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                        <button className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                          <span className="sr-only">Previous</span>
                          <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
                          </svg>
                        </button>
                        <button aria-current="page" className="relative z-10 inline-flex items-center bg-blue-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
                          1
                        </button>
                        <button className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                          2
                        </button>
                        <button className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                          3
                        </button>
                        <button className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                          <span className="sr-only">Next</span>
                          <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </nav>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default BlogManagement; 