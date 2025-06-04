import React, { useState } from 'react';
import Sidebar from '../../../components/dashboard/Sidebar';
import Header from '../../../components/dashboard/Header';
import { Search, Filter, Plus, Eye, MessageSquare, Clock, User, AlertCircle, CheckCircle, XCircle } from 'lucide-react';

interface SupportTicket {
  id: number;
  patientName: string;
  patientAvatar: string;
  patientPhone: string;
  patientEmail: string;
  subject: string;
  category: 'appointment' | 'medical' | 'billing' | 'technical' | 'other';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  description: string;
  createdAt: string;
  updatedAt: string;
  assignedTo?: string;
  responses: {
    id: number;
    author: string;
    role: 'staff' | 'patient';
    message: string;
    timestamp: string;
  }[];
}

const Support: React.FC = () => {
  const [selectedTicket, setSelectedTicket] = useState<number | null>(null);
  const [filter, setFilter] = useState<'all' | 'open' | 'in_progress' | 'resolved'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [newResponse, setNewResponse] = useState('');

  const supportTickets: SupportTicket[] = [
    {
      id: 1,
      patientName: 'Nguyễn Văn A',
      patientAvatar: 'https://placehold.co/200/eef/fff',
      patientPhone: '0901234567',
      patientEmail: 'nguyenvana@email.com',
      subject: 'Không thể đặt lịch hẹn online',
      category: 'technical',
      priority: 'high',
      status: 'open',
      description: 'Tôi đã thử nhiều lần nhưng không thể đặt lịch hẹn qua website. Hệ thống báo lỗi mỗi khi tôi nhấn nút xác nhận.',
      createdAt: '2023-12-01 09:30',
      updatedAt: '2023-12-01 09:30',
      responses: [
        {
          id: 1,
          author: 'Nguyễn Văn A',
          role: 'patient',
          message: 'Tôi đã thử nhiều lần nhưng không thể đặt lịch hẹn qua website. Hệ thống báo lỗi mỗi khi tôi nhấn nút xác nhận.',
          timestamp: '2023-12-01 09:30'
        }
      ]
    },
    {
      id: 2,
      patientName: 'Trần Thị B',
      patientAvatar: 'https://placehold.co/200/fee/fff',
      patientPhone: '0912345678',
      patientEmail: 'tranthib@email.com',
      subject: 'Yêu cầu chuyển lịch khám',
      category: 'appointment',
      priority: 'medium',
      status: 'in_progress',
      description: 'Tôi cần chuyển lịch khám từ ngày 15/12 sang ngày 20/12 do có công việc đột xuất.',
      createdAt: '2023-12-01 08:15',
      updatedAt: '2023-12-01 10:45',
      assignedTo: 'NV. Lê Văn Staff',
      responses: [
        {
          id: 1,
          author: 'Trần Thị B',
          role: 'patient',
          message: 'Tôi cần chuyển lịch khám từ ngày 15/12 sang ngày 20/12 do có công việc đột xuất.',
          timestamp: '2023-12-01 08:15'
        },
        {
          id: 2,
          author: 'NV. Lê Văn Staff',
          role: 'staff',
          message: 'Chào chị! Tôi đã kiểm tra lịch của bác sĩ. Chúng tôi có thể chuyển lịch cho chị vào ngày 20/12 lúc 10:00. Chị có đồng ý không?',
          timestamp: '2023-12-01 10:45'
        }
      ]
    },
    {
      id: 3,
      patientName: 'Lê Văn C',
      patientAvatar: 'https://placehold.co/200/efe/fff',
      patientPhone: '0923456789',
      patientEmail: 'levanc@email.com',
      subject: 'Hỏi về kết quả xét nghiệm',
      category: 'medical',
      priority: 'medium',
      status: 'resolved',
      description: 'Tôi đã làm xét nghiệm máu hôm qua nhưng chưa nhận được kết quả. Khi nào tôi có thể nhận kết quả?',
      createdAt: '2023-11-30 14:20',
      updatedAt: '2023-12-01 09:00',
      assignedTo: 'NV. Nguyễn Thị D',
      responses: [
        {
          id: 1,
          author: 'Lê Văn C',
          role: 'patient',
          message: 'Tôi đã làm xét nghiệm máu hôm qua nhưng chưa nhận được kết quả. Khi nào tôi có thể nhận kết quả?',
          timestamp: '2023-11-30 14:20'
        },
        {
          id: 2,
          author: 'NV. Nguyễn Thị D',
          role: 'staff',
          message: 'Chào anh! Kết quả xét nghiệm máu thường có trong 24-48h. Kết quả của anh đã có và đã được gửi qua email. Anh vui lòng kiểm tra email nhé.',
          timestamp: '2023-12-01 09:00'
        }
      ]
    }
  ];

  const filteredTickets = supportTickets.filter(ticket => {
    const matchesSearch = ticket.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.subject.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filter === 'all') return matchesSearch;
    return matchesSearch && ticket.status === filter;
  });

  const selectedTicketData = supportTickets.find(t => t.id === selectedTicket);

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'appointment': return 'Lịch hẹn';
      case 'medical': return 'Y tế';
      case 'billing': return 'Thanh toán';
      case 'technical': return 'Kỹ thuật';
      case 'other': return 'Khác';
      default: return category;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'appointment': return 'bg-blue-100 text-blue-800';
      case 'medical': return 'bg-green-100 text-green-800';
      case 'billing': return 'bg-yellow-100 text-yellow-800';
      case 'technical': return 'bg-red-100 text-red-800';
      case 'other': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-500 text-white';
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-blue-100 text-blue-800';
      case 'in_progress': return 'bg-yellow-100 text-yellow-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open': return <AlertCircle className="w-4 h-4" />;
      case 'in_progress': return <Clock className="w-4 h-4" />;
      case 'resolved': return <CheckCircle className="w-4 h-4" />;
      case 'closed': return <XCircle className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  const handleSendResponse = () => {
    if (newResponse.trim()) {
      // Logic để gửi phản hồi sẽ được thêm vào đây
      console.log('Sending response:', newResponse);
      setNewResponse('');
    }
  };

  const handleStatusChange = (ticketId: number, newStatus: string) => {
    // Logic để thay đổi trạng thái ticket
    console.log('Changing status:', ticketId, newStatus);
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
              <div className="mb-6 flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0">
                <div>
                  <h1 className="text-2xl font-semibold text-gray-900">Hỗ trợ bệnh nhân</h1>
                  <p className="text-gray-600">Quản lý yêu cầu và hỗ trợ bệnh nhân</p>
                </div>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center">
                  <Plus className="w-5 h-5 mr-1" />
                  Tạo yêu cầu mới
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Ticket List */}
                <div className="lg:col-span-1">
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                    {/* Search and Filter */}
                    <div className="p-4 border-b border-gray-200">
                      <div className="relative mb-3">
                        <input
                          type="text"
                          placeholder="Tìm kiếm yêu cầu..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="w-full py-2 pl-10 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      </div>
                      <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value as any)}
                        className="w-full py-2 px-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="all">Tất cả trạng thái</option>
                        <option value="open">Mở</option>
                        <option value="in_progress">Đang xử lý</option>
                        <option value="resolved">Đã giải quyết</option>
                      </select>
                    </div>

                    {/* Tickets */}
                    <div className="max-h-96 overflow-y-auto">
                      {filteredTickets.map((ticket) => (
                        <div
                          key={ticket.id}
                          onClick={() => setSelectedTicket(ticket.id)}
                          className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
                            selectedTicket === ticket.id ? 'bg-blue-50 border-blue-200' : ''
                          }`}
                        >
                          <div className="flex items-start space-x-3">
                            <img
                              src={ticket.patientAvatar}
                              alt={ticket.patientName}
                              className="w-10 h-10 rounded-full"
                            />
                            <div className="flex-1 min-w-0">
                              <div className="flex justify-between items-start mb-1">
                                <p className="text-sm font-medium text-gray-900 truncate">
                                  {ticket.patientName}
                                </p>
                                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(ticket.priority)}`}>
                                  {ticket.priority === 'urgent' ? 'Khẩn cấp' :
                                   ticket.priority === 'high' ? 'Cao' :
                                   ticket.priority === 'medium' ? 'Trung bình' : 'Thấp'}
                                </span>
                              </div>
                              <p className="text-sm text-gray-600 truncate mb-2">
                                {ticket.subject}
                              </p>
                              <div className="flex justify-between items-center">
                                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(ticket.category)}`}>
                                  {getCategoryLabel(ticket.category)}
                                </span>
                                <div className={`flex items-center space-x-1 px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(ticket.status)}`}>
                                  {getStatusIcon(ticket.status)}
                                  <span>
                                    {ticket.status === 'open' ? 'Mở' :
                                     ticket.status === 'in_progress' ? 'Đang xử lý' :
                                     ticket.status === 'resolved' ? 'Đã giải quyết' : 'Đã đóng'}
                                  </span>
                                </div>
                              </div>
                              <p className="text-xs text-gray-500 mt-1">
                                {ticket.updatedAt}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Ticket Detail */}
                <div className="lg:col-span-2">
                  {selectedTicketData ? (
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                      {/* Header */}
                      <div className="p-6 border-b border-gray-200">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h2 className="text-xl font-semibold text-gray-900 mb-2">
                              {selectedTicketData.subject}
                            </h2>
                            <div className="flex items-center space-x-4 text-sm text-gray-600">
                              <div className="flex items-center space-x-1">
                                <User className="w-4 h-4" />
                                <span>{selectedTicketData.patientName}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Clock className="w-4 h-4" />
                                <span>{selectedTicketData.createdAt}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <select
                              value={selectedTicketData.status}
                              onChange={(e) => handleStatusChange(selectedTicketData.id, e.target.value)}
                              className="px-3 py-1 rounded-md border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                              <option value="open">Mở</option>
                              <option value="in_progress">Đang xử lý</option>
                              <option value="resolved">Đã giải quyết</option>
                              <option value="closed">Đã đóng</option>
                            </select>
                          </div>
                        </div>

                        {/* Patient Info */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
                          <div>
                            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Thông tin liên hệ</p>
                            <p className="mt-1 text-sm text-gray-900">{selectedTicketData.patientPhone}</p>
                            <p className="text-sm text-gray-900">{selectedTicketData.patientEmail}</p>
                          </div>
                          <div>
                            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Danh mục</p>
                            <span className={`mt-1 inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(selectedTicketData.category)}`}>
                              {getCategoryLabel(selectedTicketData.category)}
                            </span>
                          </div>
                          <div>
                            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Độ ưu tiên</p>
                            <span className={`mt-1 inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(selectedTicketData.priority)}`}>
                              {selectedTicketData.priority === 'urgent' ? 'Khẩn cấp' :
                               selectedTicketData.priority === 'high' ? 'Cao' :
                               selectedTicketData.priority === 'medium' ? 'Trung bình' : 'Thấp'}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Conversation */}
                      <div className="p-6 space-y-4 max-h-96 overflow-y-auto">
                        {selectedTicketData.responses.map((response) => (
                          <div key={response.id} className={`flex ${response.role === 'staff' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-md px-4 py-3 rounded-lg ${
                              response.role === 'staff' 
                                ? 'bg-blue-600 text-white' 
                                : 'bg-gray-100 text-gray-900'
                            }`}>
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-sm font-medium">
                                  {response.author}
                                </span>
                                <span className={`text-xs ${
                                  response.role === 'staff' ? 'text-blue-100' : 'text-gray-500'
                                }`}>
                                  {response.timestamp}
                                </span>
                              </div>
                              <p className="text-sm">{response.message}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Response Input */}
                      <div className="p-6 border-t border-gray-200">
                        <div className="space-y-3">
                          <textarea
                            value={newResponse}
                            onChange={(e) => setNewResponse(e.target.value)}
                            placeholder="Nhập phản hồi..."
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows={4}
                          />
                          <div className="flex justify-between items-center">
                            <div className="flex space-x-2">
                              <button className="text-sm text-gray-600 hover:text-gray-800">
                                Đính kèm file
                              </button>
                            </div>
                            <button
                              onClick={handleSendResponse}
                              disabled={!newResponse.trim()}
                              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                            >
                              <MessageSquare className="w-4 h-4 mr-1" />
                              Gửi phản hồi
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 flex items-center justify-center h-96">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Eye className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                          Chọn một yêu cầu hỗ trợ
                        </h3>
                        <p className="text-gray-500">
                          Chọn một yêu cầu từ danh sách để xem chi tiết và phản hồi
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Support; 