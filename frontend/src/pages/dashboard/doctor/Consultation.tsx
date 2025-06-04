import React, { useState } from 'react';
import Sidebar from '../../../components/dashboard/Sidebar';
import Header from '../../../components/dashboard/Header';
import { 
  MessageCircle, 
  Video, 
  Phone, 
  Clock, 
  User, 
  Send, 
  FileText, 
  Image, 
  Paperclip,
  MoreVertical,
  CheckCircle,
  XCircle,
  Search,
  Filter
} from 'lucide-react';

interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  avatar?: string;
}

interface ConsultationSession {
  id: number;
  patient: Patient;
  type: 'chat' | 'video' | 'phone';
  status: 'pending' | 'active' | 'completed' | 'cancelled';
  requestTime: string;
  startTime?: string;
  endTime?: string;
  duration?: string;
  subject: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  lastMessage?: string;
  unreadCount: number;
}

interface Message {
  id: number;
  sessionId: number;
  sender: 'doctor' | 'patient';
  content: string;
  type: 'text' | 'image' | 'file';
  timestamp: string;
  isRead: boolean;
}

const Consultation: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'active' | 'completed'>('pending');
  const [selectedSession, setSelectedSession] = useState<ConsultationSession | null>(null);
  const [showChatModal, setShowChatModal] = useState(false);
  const [messageInput, setMessageInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Sample data
  const consultationSessions: ConsultationSession[] = [
    {
      id: 1,
      patient: {
        id: 'P00001',
        name: 'Nguyễn Văn A',
        age: 45,
        gender: 'Nam'
      },
      type: 'chat',
      status: 'pending',
      requestTime: '2023-12-01 14:30',
      subject: 'Tư vấn về triệu chứng đau đầu',
      priority: 'medium',
      lastMessage: 'Xin chào bác sĩ, tôi bị đau đầu từ 3 ngày nay...',
      unreadCount: 2
    },
    {
      id: 2,
      patient: {
        id: 'P00002',
        name: 'Trần Thị B',
        age: 32,
        gender: 'Nữ'
      },
      type: 'video',
      status: 'active',
      requestTime: '2023-12-01 15:00',
      startTime: '2023-12-01 15:05',
      subject: 'Khám sức khỏe định kỳ',
      priority: 'low',
      lastMessage: 'Đang trong cuộc gọi video...',
      unreadCount: 0
    },
    {
      id: 3,
      patient: {
        id: 'P00003',
        name: 'Lê Văn C',
        age: 50,
        gender: 'Nam'
      },
      type: 'phone',
      status: 'pending',
      requestTime: '2023-12-01 15:30',
      subject: 'Hỏi về kết quả xét nghiệm',
      priority: 'high',
      lastMessage: 'Bác sĩ ơi, em muốn hỏi về kết quả xét nghiệm máu',
      unreadCount: 1
    },
    {
      id: 4,
      patient: {
        id: 'P00004',
        name: 'Phạm Thị D',
        age: 28,
        gender: 'Nữ'
      },
      type: 'chat',
      status: 'completed',
      requestTime: '2023-12-01 13:00',
      startTime: '2023-12-01 13:05',
      endTime: '2023-12-01 13:25',
      duration: '20 phút',
      subject: 'Tư vấn dinh dưỡng',
      priority: 'low',
      lastMessage: 'Cảm ơn bác sĩ đã tư vấn.',
      unreadCount: 0
    }
  ];

  const sampleMessages: Message[] = [
    {
      id: 1,
      sessionId: 1,
      sender: 'patient',
      content: 'Xin chào bác sĩ, tôi bị đau đầu từ 3 ngày nay, có kèm theo buồn nôn.',
      type: 'text',
      timestamp: '2023-12-01 14:30',
      isRead: true
    },
    {
      id: 2,
      sessionId: 1,
      sender: 'patient',
      content: 'Bác sĩ có thể tư vấn cho em được không ạ?',
      type: 'text',
      timestamp: '2023-12-01 14:32',
      isRead: false
    }
  ];

  const filteredSessions = consultationSessions.filter(session => {
    const matchesTab = activeTab === 'all' || session.status === activeTab;
    const matchesSearch = session.patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         session.subject.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending': return 'Đang chờ';
      case 'active': return 'Đang diễn ra';
      case 'completed': return 'Hoàn thành';
      case 'cancelled': return 'Đã hủy';
      default: return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'active': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low': return 'bg-blue-100 text-blue-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'urgent': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'chat': return <MessageCircle className="w-4 h-4" />;
      case 'video': return <Video className="w-4 h-4" />;
      case 'phone': return <Phone className="w-4 h-4" />;
      default: return <MessageCircle className="w-4 h-4" />;
    }
  };

  const ChatModal = () => (
    selectedSession && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg w-full max-w-4xl mx-4 h-[80vh] flex flex-col">
          {/* Chat Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{selectedSession.patient.name}</h3>
                <p className="text-sm text-gray-500">{selectedSession.subject}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {selectedSession.type === 'chat' && (
                <>
                  <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                    <Video className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                    <Phone className="w-5 h-5" />
                  </button>
                </>
              )}
              <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                <MoreVertical className="w-5 h-5" />
              </button>
              <button
                onClick={() => setShowChatModal(false)}
                className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {sampleMessages
              .filter(msg => msg.sessionId === selectedSession.id)
              .map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'doctor' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.sender === 'doctor'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-900'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p className={`text-xs mt-1 ${
                      message.sender === 'doctor' ? 'text-blue-100' : 'text-gray-500'
                    }`}>
                      {message.timestamp}
                    </p>
                  </div>
                </div>
              ))}
          </div>

          {/* Message Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center space-x-2">
              <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                <Paperclip className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                <Image className="w-5 h-5" />
              </button>
              <input
                type="text"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                placeholder="Nhập tin nhắn..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    // Handle send message
                    setMessageInput('');
                  }
                }}
              />
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <Sidebar role="doctor" />
        <div className="flex-1">
          <Header role="doctor" userName="BS. Trần Thị Bình" />
          <main className="p-6">
            <div className="max-w-7xl mx-auto">
              {/* Header */}
              <div className="mb-6 flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0">
                <h1 className="text-2xl font-semibold text-gray-900">Tư vấn trực tuyến</h1>
                <div className="flex space-x-2">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Tìm kiếm tư vấn..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full md:w-64 py-2 pl-10 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  </div>
                  <button className="p-2 bg-white text-gray-600 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors">
                    <Filter className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <div className="flex items-center">
                    <div className="p-3 bg-yellow-100 rounded-lg">
                      <Clock className="w-6 h-6 text-yellow-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Đang chờ</p>
                      <p className="text-2xl font-semibold text-gray-900">
                        {consultationSessions.filter(s => s.status === 'pending').length}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <div className="flex items-center">
                    <div className="p-3 bg-green-100 rounded-lg">
                      <Video className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Đang diễn ra</p>
                      <p className="text-2xl font-semibold text-gray-900">
                        {consultationSessions.filter(s => s.status === 'active').length}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <div className="flex items-center">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <MessageCircle className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Hoàn thành hôm nay</p>
                      <p className="text-2xl font-semibold text-gray-900">
                        {consultationSessions.filter(s => s.status === 'completed').length}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <div className="flex items-center">
                    <div className="p-3 bg-purple-100 rounded-lg">
                      <FileText className="w-6 h-6 text-purple-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Tổng cuộc tư vấn</p>
                      <p className="text-2xl font-semibold text-gray-900">{consultationSessions.length}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
                <div className="flex space-x-4 border-b border-gray-200">
                  {[
                    { key: 'pending', label: 'Đang chờ', count: consultationSessions.filter(s => s.status === 'pending').length },
                    { key: 'active', label: 'Đang diễn ra', count: consultationSessions.filter(s => s.status === 'active').length },
                    { key: 'completed', label: 'Hoàn thành', count: consultationSessions.filter(s => s.status === 'completed').length },
                    { key: 'all', label: 'Tất cả', count: consultationSessions.length }
                  ].map(tab => (
                    <button
                      key={tab.key}
                      onClick={() => setActiveTab(tab.key as any)}
                      className={`pb-4 px-1 font-medium text-sm flex items-center space-x-2 ${
                        activeTab === tab.key
                          ? 'text-blue-600 border-b-2 border-blue-600'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      <span>{tab.label}</span>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        activeTab === tab.key
                          ? 'bg-blue-100 text-blue-600'
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {tab.count}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Consultations List */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="divide-y divide-gray-200">
                  {filteredSessions.map((session) => (
                    <div key={session.id} className="p-6 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                            <User className="w-6 h-6 text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2">
                              <h3 className="font-semibold text-gray-900">{session.patient.name}</h3>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(session.priority)}`}>
                                {session.priority === 'low' && 'Thấp'}
                                {session.priority === 'medium' && 'Trung bình'}
                                {session.priority === 'high' && 'Cao'}
                                {session.priority === 'urgent' && 'Khẩn cấp'}
                              </span>
                              {session.unreadCount > 0 && (
                                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                                  {session.unreadCount}
                                </span>
                              )}
                            </div>
                            <p className="text-gray-600 text-sm mt-1">{session.subject}</p>
                            <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                              <div className="flex items-center space-x-1">
                                {getTypeIcon(session.type)}
                                <span>{session.type === 'chat' ? 'Chat' : session.type === 'video' ? 'Video' : 'Điện thoại'}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Clock className="w-4 h-4" />
                                <span>{session.requestTime}</span>
                              </div>
                              {session.duration && (
                                <span>• Thời gian: {session.duration}</span>
                              )}
                            </div>
                            {session.lastMessage && (
                              <p className="text-gray-600 text-sm mt-2 truncate max-w-md">
                                {session.lastMessage}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(session.status)}`}>
                            {getStatusLabel(session.status)}
                          </span>
                          <div className="flex space-x-2">
                            {session.status === 'pending' && (
                              <>
                                <button className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm">
                                  <CheckCircle className="w-4 h-4" />
                                </button>
                                <button 
                                  onClick={() => {
                                    setSelectedSession(session);
                                    setShowChatModal(true);
                                  }}
                                  className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                                >
                                  Bắt đầu
                                </button>
                              </>
                            )}
                            {session.status === 'active' && (
                              <>
                                <button 
                                  onClick={() => {
                                    setSelectedSession(session);
                                    setShowChatModal(true);
                                  }}
                                  className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                                >
                                  Tiếp tục
                                </button>
                                <button className="px-3 py-1 bg-gray-600 text-white rounded-lg hover:bg-gray-700 text-sm">
                                  Kết thúc
                                </button>
                              </>
                            )}
                            {session.status === 'completed' && (
                              <button className="px-3 py-1 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 text-sm">
                                Xem lại
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {filteredSessions.length === 0 && (
                  <div className="text-center py-12">
                    <MessageCircle className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">Không có cuộc tư vấn nào</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {activeTab === 'pending' && 'Hiện tại không có cuộc tư vấn nào đang chờ.'}
                      {activeTab === 'active' && 'Hiện tại không có cuộc tư vấn nào đang diễn ra.'}
                      {activeTab === 'completed' && 'Chưa có cuộc tư vấn nào hoàn thành hôm nay.'}
                      {activeTab === 'all' && 'Chưa có cuộc tư vấn nào.'}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Chat Modal */}
      {showChatModal && <ChatModal />}
    </div>
  );
};

export default Consultation; 