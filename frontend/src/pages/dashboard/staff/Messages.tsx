import React, { useState } from 'react';
import Sidebar from '../../../components/dashboard/Sidebar';
import Header from '../../../components/dashboard/Header';
import { Search, Filter, Send, Paperclip, Smile, MoreHorizontal, Star, Archive, Reply } from 'lucide-react';

interface Message {
  id: number;
  patientName: string;
  patientAvatar: string;
  lastMessage: string;
  timestamp: string;
  status: 'unread' | 'read' | 'replied';
  priority: 'low' | 'medium' | 'high';
  messages: {
    id: number;
    sender: 'patient' | 'staff';
    content: string;
    timestamp: string;
    attachments?: string[];
  }[];
}

const Messages: React.FC = () => {
  const [selectedMessage, setSelectedMessage] = useState<number | null>(1);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'unread' | 'starred'>('all');

  const messages: Message[] = [
    {
      id: 1,
      patientName: 'Nguyễn Văn A',
      patientAvatar: 'https://placehold.co/200/eef/fff',
      lastMessage: 'Tôi cần đặt lịch khám vào thứ 5 tới',
      timestamp: '10 phút trước',
      status: 'unread',
      priority: 'high',
      messages: [
        {
          id: 1,
          sender: 'patient',
          content: 'Chào anh/chị, tôi muốn đặt lịch khám bác sĩ tim mạch vào thứ 5 tuần tới. Có thể giúp tôi được không?',
          timestamp: '15 phút trước'
        },
        {
          id: 2,
          sender: 'patient',
          content: 'Tôi cần đặt lịch khám vào thứ 5 tới',
          timestamp: '10 phút trước'
        }
      ]
    },
    {
      id: 2,
      patientName: 'Trần Thị B',
      patientAvatar: 'https://placehold.co/200/fee/fff',
      lastMessage: 'Làm thế nào để đăng ký tài khoản bệnh nhân?',
      timestamp: '30 phút trước',
      status: 'read',
      priority: 'medium',
      messages: [
        {
          id: 1,
          sender: 'patient',
          content: 'Làm thế nào để đăng ký tài khoản bệnh nhân?',
          timestamp: '30 phút trước'
        },
        {
          id: 2,
          sender: 'staff',
          content: 'Chào chị! Để đăng ký tài khoản bệnh nhân, chị có thể vào trang chủ của chúng tôi và nhấn vào nút "Đăng ký". Sau đó làm theo hướng dẫn.',
          timestamp: '25 phút trước'
        }
      ]
    },
    {
      id: 3,
      patientName: 'Lê Văn C',
      patientAvatar: 'https://placehold.co/200/efe/fff',
      lastMessage: 'Cảm ơn bạn đã hỗ trợ đặt lịch khám',
      timestamp: '1 giờ trước',
      status: 'replied',
      priority: 'low',
      messages: [
        {
          id: 1,
          sender: 'patient',
          content: 'Cảm ơn bạn đã hỗ trợ đặt lịch khám',
          timestamp: '1 giờ trước'
        }
      ]
    },
    {
      id: 4,
      patientName: 'Phạm Thị D',
      patientAvatar: 'https://placehold.co/200/fef/fff',
      lastMessage: 'Tôi muốn hủy lịch hẹn ngày mai',
      timestamp: '2 giờ trước',
      status: 'unread',
      priority: 'medium',
      messages: [
        {
          id: 1,
          sender: 'patient',
          content: 'Tôi muốn hủy lịch hẹn ngày mai do có việc đột xuất. Có thể giúp tôi được không?',
          timestamp: '2 giờ trước'
        }
      ]
    }
  ];

  const selectedMessageData = messages.find(m => m.id === selectedMessage);

  const filteredMessages = messages.filter(message => {
    const matchesSearch = message.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.lastMessage.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filter === 'unread') return matchesSearch && message.status === 'unread';
    if (filter === 'starred') return matchesSearch && message.priority === 'high';
    return matchesSearch;
  });

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedMessageData) {
      // Logic để gửi tin nhắn sẽ được thêm vào đây
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'unread': return 'bg-blue-100 text-blue-800';
      case 'read': return 'bg-gray-100 text-gray-800';
      case 'replied': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-4 border-red-500';
      case 'medium': return 'border-l-4 border-yellow-500';
      case 'low': return 'border-l-4 border-green-500';
      default: return '';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <Sidebar role="staff" />
        <div className="flex-1">
          <Header role="staff" userName="NV. Lê Văn Staff" />
          <main className="p-6">
            <div className="max-w-7xl mx-auto">
              {/* Header */}
              <div className="mb-6">
                <h1 className="text-2xl font-semibold text-gray-900">Tin nhắn</h1>
                <p className="text-gray-600">Quản lý tin nhắn và hỗ trợ bệnh nhân</p>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden" style={{ height: '70vh' }}>
                <div className="flex h-full">
                  {/* Message List */}
                  <div className="w-1/3 border-r border-gray-200 flex flex-col">
                    {/* Search and Filter */}
                    <div className="p-4 border-b border-gray-200">
                      <div className="relative mb-3">
                        <input
                          type="text"
                          placeholder="Tìm kiếm tin nhắn..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="w-full py-2 pl-10 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setFilter('all')}
                          className={`px-3 py-1 rounded-md text-sm ${
                            filter === 'all' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          Tất cả
                        </button>
                        <button
                          onClick={() => setFilter('unread')}
                          className={`px-3 py-1 rounded-md text-sm ${
                            filter === 'unread' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          Chưa đọc
                        </button>
                        <button
                          onClick={() => setFilter('starred')}
                          className={`px-3 py-1 rounded-md text-sm ${
                            filter === 'starred' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          Quan trọng
                        </button>
                      </div>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto">
                      {filteredMessages.map((message) => (
                        <div
                          key={message.id}
                          onClick={() => setSelectedMessage(message.id)}
                          className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
                            selectedMessage === message.id ? 'bg-blue-50 border-blue-200' : ''
                          } ${getPriorityColor(message.priority)}`}
                        >
                          <div className="flex items-start space-x-3">
                            <img
                              src={message.patientAvatar}
                              alt={message.patientName}
                              className="w-12 h-12 rounded-full"
                            />
                            <div className="flex-1 min-w-0">
                              <div className="flex justify-between items-start">
                                <p className="text-sm font-medium text-gray-900 truncate">
                                  {message.patientName}
                                </p>
                                <div className="flex items-center space-x-1">
                                  {message.priority === 'high' && (
                                    <Star className="w-4 h-4 text-red-500" />
                                  )}
                                  <span className="text-xs text-gray-500">{message.timestamp}</span>
                                </div>
                              </div>
                              <p className="text-sm text-gray-600 truncate mt-1">
                                {message.lastMessage}
                              </p>
                              <div className="flex justify-between items-center mt-2">
                                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(message.status)}`}>
                                  {message.status === 'unread' ? 'Chưa đọc' : 
                                   message.status === 'read' ? 'Đã đọc' : 'Đã trả lời'}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Message Detail */}
                  <div className="flex-1 flex flex-col">
                    {selectedMessageData ? (
                      <>
                        {/* Header */}
                        <div className="p-4 border-b border-gray-200 bg-white">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center space-x-3">
                              <img
                                src={selectedMessageData.patientAvatar}
                                alt={selectedMessageData.patientName}
                                className="w-10 h-10 rounded-full"
                              />
                              <div>
                                <h3 className="text-lg font-medium text-gray-900">
                                  {selectedMessageData.patientName}
                                </h3>
                                <p className="text-sm text-gray-500">
                                  {selectedMessageData.status === 'unread' ? 'Đang online' : 'Hoạt động 30 phút trước'}
                                </p>
                              </div>
                            </div>
                            <div className="flex space-x-2">
                              <button className="p-2 text-gray-400 hover:text-gray-600">
                                <Archive className="w-5 h-5" />
                              </button>
                              <button className="p-2 text-gray-400 hover:text-gray-600">
                                <MoreHorizontal className="w-5 h-5" />
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                          {selectedMessageData.messages.map((msg) => (
                            <div
                              key={msg.id}
                              className={`flex ${msg.sender === 'staff' ? 'justify-end' : 'justify-start'}`}
                            >
                              <div
                                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                                  msg.sender === 'staff'
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-200 text-gray-900'
                                }`}
                              >
                                <p className="text-sm">{msg.content}</p>
                                {msg.attachments && msg.attachments.length > 0 && (
                                  <div className="mt-2 space-y-1">
                                    {msg.attachments.map((attachment, index) => (
                                      <div key={index} className="text-xs underline cursor-pointer">
                                        {attachment}
                                      </div>
                                    ))}
                                  </div>
                                )}
                                <p className={`text-xs mt-1 ${
                                  msg.sender === 'staff' ? 'text-blue-100' : 'text-gray-500'
                                }`}>
                                  {msg.timestamp}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Message Input */}
                        <div className="p-4 border-t border-gray-200 bg-white">
                          <div className="flex space-x-4">
                            <div className="flex-1">
                              <div className="border border-gray-300 rounded-lg">
                                <textarea
                                  value={newMessage}
                                  onChange={(e) => setNewMessage(e.target.value)}
                                  placeholder="Nhập tin nhắn..."
                                  className="w-full px-3 py-2 border-0 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  rows={3}
                                  onKeyPress={(e) => {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                      e.preventDefault();
                                      handleSendMessage();
                                    }
                                  }}
                                />
                                <div className="flex justify-between items-center px-3 py-2 border-t border-gray-200">
                                  <div className="flex space-x-2">
                                    <button className="p-1 text-gray-400 hover:text-gray-600">
                                      <Paperclip className="w-5 h-5" />
                                    </button>
                                    <button className="p-1 text-gray-400 hover:text-gray-600">
                                      <Smile className="w-5 h-5" />
                                    </button>
                                  </div>
                                  <button
                                    onClick={handleSendMessage}
                                    disabled={!newMessage.trim()}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                                  >
                                    <Send className="w-4 h-4 mr-1" />
                                    Gửi
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="flex-1 flex items-center justify-center">
                        <div className="text-center">
                          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Reply className="w-8 h-8 text-gray-400" />
                          </div>
                          <h3 className="text-lg font-medium text-gray-900 mb-2">
                            Chọn một cuộc hội thoại
                          </h3>
                          <p className="text-gray-500">
                            Chọn một tin nhắn để bắt đầu trò chuyện với bệnh nhân
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Messages; 