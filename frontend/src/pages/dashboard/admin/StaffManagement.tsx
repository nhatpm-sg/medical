import React, { useState } from 'react';
import Sidebar from '../../../components/dashboard/Sidebar';
import Header from '../../../components/dashboard/Header';
import { Search, Filter, Plus, MoreHorizontal, Mail, Phone, Calendar, MapPin, User, Edit, Trash2, Eye } from 'lucide-react';

interface Staff {
  id: number;
  name: string;
  email: string;
  phone: string;
  department: string;
  position: string;
  status: 'active' | 'on_leave' | 'inactive';
  avatar: string;
  joinDate: string;
  workSchedule: {
    days: string;
    hours: string;
  };
  tasks: number;
  performance: number;
  address?: string;
  skills?: string[];
}

const StaffManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'on_leave' | 'inactive'>('all');
  const [activeStaff, setActiveStaff] = useState<number | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const staff: Staff[] = [
    {
      id: 1,
      name: 'Lê Văn Staff',
      email: 'levanstaff@hospital.com',
      phone: '0912345678',
      department: 'Hỗ trợ khách hàng',
      position: 'Nhân viên hỗ trợ',
      status: 'active',
      avatar: 'https://placehold.co/200/eef/fff',
      joinDate: '2022-01-15',
      workSchedule: {
        days: 'Thứ 2 - Thứ 6',
        hours: '08:00 - 17:00'
      },
      tasks: 15,
      performance: 92,
      address: '123 Đường ABC, Quận 1, TP.HCM',
      skills: ['Chăm sóc khách hàng', 'Viết nội dung', 'Quản lý thời gian']
    },
    {
      id: 2,
      name: 'Nguyễn Thị D',
      email: 'nguyenthid@hospital.com',
      phone: '0923456789',
      department: 'Hỗ trợ kỹ thuật',
      position: 'Nhân viên IT',
      status: 'active',
      avatar: 'https://placehold.co/200/fee/fff',
      joinDate: '2021-05-20',
      workSchedule: {
        days: 'Thứ 2 - Thứ 6',
        hours: '09:00 - 18:00'
      },
      tasks: 12,
      performance: 88,
      address: '456 Đường DEF, Quận 3, TP.HCM',
      skills: ['Hỗ trợ kỹ thuật', 'Quản trị hệ thống', 'Troubleshooting']
    },
    {
      id: 3,
      name: 'Trần Văn E',
      email: 'tranvane@hospital.com',
      phone: '0934567890',
      department: 'Marketing',
      position: 'Nhân viên marketing',
      status: 'on_leave',
      avatar: 'https://placehold.co/200/efe/fff',
      joinDate: '2023-02-10',
      workSchedule: {
        days: 'Thứ 2 - Thứ 6',
        hours: '08:30 - 17:30'
      },
      tasks: 8,
      performance: 85,
      address: '789 Đường GHI, Quận 5, TP.HCM',
      skills: ['Content Marketing', 'SEO', 'Social Media']
    },
    {
      id: 4,
      name: 'Phạm Thị F',
      email: 'phamthif@hospital.com',
      phone: '0945678901',
      department: 'Lễ tân',
      position: 'Nhân viên lễ tân',
      status: 'inactive',
      avatar: 'https://placehold.co/200/fef/fff',
      joinDate: '2020-08-05',
      workSchedule: {
        days: 'N/A',
        hours: 'N/A'
      },
      tasks: 0,
      performance: 0,
      address: '321 Đường JKL, Quận 7, TP.HCM',
      skills: ['Tiếp đón khách hàng', 'Điện thoại', 'Làm việc nhóm']
    },
    {
      id: 5,
      name: 'Hoàng Văn G',
      email: 'hoangvang@hospital.com',
      phone: '0956789012',
      department: 'Quản lý nội dung',
      position: 'Content Manager',
      status: 'active',
      avatar: 'https://placehold.co/200/eef/fff',
      joinDate: '2022-11-30',
      workSchedule: {
        days: 'Thứ 2 - Thứ 6',
        hours: '09:00 - 18:00'
      },
      tasks: 20,
      performance: 95,
      address: '654 Đường MNO, Quận 2, TP.HCM',
      skills: ['Quản lý nội dung', 'Copywriting', 'Chiến lược content']
    }
  ];

  const filteredStaff = staff.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.department.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeTab === 'all') return matchesSearch;
    return matchesSearch && member.status === activeTab;
  });

  const getStatusLabel = (status: 'active' | 'on_leave' | 'inactive') => {
    switch (status) {
      case 'active':
        return 'Đang làm việc';
      case 'on_leave':
        return 'Nghỉ phép';
      case 'inactive':
        return 'Không hoạt động';
      default:
        return '';
    }
  };

  const getStatusColor = (status: 'active' | 'on_leave' | 'inactive') => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'on_leave':
        return 'bg-yellow-100 text-yellow-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      default:
        return '';
    }
  };

  const getPerformanceColor = (performance: number) => {
    if (performance >= 90) return 'text-green-600';
    if (performance >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const AddStaffModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <h3 className="text-lg font-semibold mb-6">Thêm nhân viên mới</h3>
        
        <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Họ và tên</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nhập họ và tên"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nhập email"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại</label>
              <input
                type="tel"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nhập số điện thoại"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phòng ban</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Chọn phòng ban</option>
                <option value="support">Hỗ trợ khách hàng</option>
                <option value="it">Hỗ trợ kỹ thuật</option>
                <option value="marketing">Marketing</option>
                <option value="reception">Lễ tân</option>
                <option value="content">Quản lý nội dung</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Chức vụ</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nhập chức vụ"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Ngày vào làm</label>
              <input
                type="date"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Địa chỉ</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nhập địa chỉ"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Kỹ năng</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nhập kỹ năng (phân cách bằng dấu phẩy)"
            />
          </div>
          
          <div className="flex justify-end space-x-2 pt-4">
            <button
              type="button"
              onClick={() => setShowAddModal(false)}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Thêm nhân viên
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <Sidebar role="admin" />
        <div className="flex-1">
          <Header role="admin" userName="Admin Nguyễn" />
          <main className="p-6">
            <div className="max-w-7xl mx-auto">
              {/* Header */}
              <div className="mb-6 flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0">
                <div>
                  <h1 className="text-2xl font-semibold text-gray-900">Quản lý nhân viên</h1>
                  <p className="text-gray-600">Quản lý thông tin và hoạt động của nhân viên</p>
                </div>
                <div className="flex space-x-2">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Tìm kiếm nhân viên..."
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
                    onClick={() => setShowAddModal(true)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                  >
                    <Plus className="w-5 h-5 mr-1" />
                    <span>Thêm nhân viên</span>
                  </button>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <div className="flex items-center">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <User className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Tổng nhân viên</p>
                      <p className="text-2xl font-semibold text-gray-900">{staff.length}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <div className="flex items-center">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <User className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Đang làm việc</p>
                      <p className="text-2xl font-semibold text-gray-900">
                        {staff.filter(s => s.status === 'active').length}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <div className="flex items-center">
                    <div className="p-2 bg-yellow-100 rounded-lg">
                      <User className="w-6 h-6 text-yellow-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Nghỉ phép</p>
                      <p className="text-2xl font-semibold text-gray-900">
                        {staff.filter(s => s.status === 'on_leave').length}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <div className="flex items-center">
                    <div className="p-2 bg-red-100 rounded-lg">
                      <User className="w-6 h-6 text-red-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Hiệu suất trung bình</p>
                      <p className="text-2xl font-semibold text-gray-900">
                        {Math.round(staff.reduce((acc, s) => acc + s.performance, 0) / staff.length)}%
                      </p>
                    </div>
                  </div>
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
                    Tất cả ({staff.length})
                  </button>
                  <button
                    onClick={() => setActiveTab('active')}
                    className={`pb-4 px-1 font-medium text-sm ${
                      activeTab === 'active'
                        ? 'text-blue-600 border-b-2 border-blue-600'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Đang làm việc ({staff.filter(s => s.status === 'active').length})
                  </button>
                  <button
                    onClick={() => setActiveTab('on_leave')}
                    className={`pb-4 px-1 font-medium text-sm ${
                      activeTab === 'on_leave'
                        ? 'text-blue-600 border-b-2 border-blue-600'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Nghỉ phép ({staff.filter(s => s.status === 'on_leave').length})
                  </button>
                  <button
                    onClick={() => setActiveTab('inactive')}
                    className={`pb-4 px-1 font-medium text-sm ${
                      activeTab === 'inactive'
                        ? 'text-blue-600 border-b-2 border-blue-600'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Không hoạt động ({staff.filter(s => s.status === 'inactive').length})
                  </button>
                </div>
              </div>

              {/* Staff List */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Nhân viên
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Phòng ban
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Trạng thái
                        </th>
                        <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Công việc
                        </th>
                        <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Hiệu suất
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Thao tác
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredStaff.map((member) => (
                        <React.Fragment key={member.id}>
                          <tr className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <img
                                  className="h-10 w-10 rounded-full"
                                  src={member.avatar}
                                  alt={member.name}
                                />
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">{member.name}</div>
                                  <div className="text-sm text-gray-500">{member.position}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{member.department}</div>
                              <div className="text-sm text-gray-500">
                                Vào làm: {new Date(member.joinDate).toLocaleDateString('vi-VN')}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(member.status)}`}>
                                {getStatusLabel(member.status)}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-center">
                              <div className="text-sm text-gray-900">{member.tasks}</div>
                              <div className="text-xs text-gray-500">nhiệm vụ</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-center">
                              <div className={`text-sm font-medium ${getPerformanceColor(member.performance)}`}>
                                {member.performance}%
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <div className="flex justify-end space-x-2">
                                <button 
                                  onClick={() => setActiveStaff(activeStaff === member.id ? null : member.id)}
                                  className="text-blue-600 hover:text-blue-900"
                                >
                                  <Eye className="w-5 h-5" />
                                </button>
                                <button className="text-green-600 hover:text-green-900">
                                  <Edit className="w-5 h-5" />
                                </button>
                                <button className="text-red-600 hover:text-red-900">
                                  <Trash2 className="w-5 h-5" />
                                </button>
                                <button className="text-gray-600 hover:text-gray-900">
                                  <MoreHorizontal className="w-5 h-5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                          
                          {/* Expanded Details */}
                          {activeStaff === member.id && (
                            <tr>
                              <td colSpan={6} className="px-6 py-4 bg-blue-50">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                  <div className="space-y-3">
                                    <h3 className="text-sm font-medium text-gray-900">Thông tin liên hệ</h3>
                                    <div className="flex items-center text-sm text-gray-600">
                                      <Mail className="w-4 h-4 mr-2 text-gray-500" />
                                      <span>{member.email}</span>
                                    </div>
                                    <div className="flex items-center text-sm text-gray-600">
                                      <Phone className="w-4 h-4 mr-2 text-gray-500" />
                                      <span>{member.phone}</span>
                                    </div>
                                    {member.address && (
                                      <div className="flex items-start text-sm text-gray-600">
                                        <MapPin className="w-4 h-4 mr-2 text-gray-500 mt-0.5" />
                                        <span>{member.address}</span>
                                      </div>
                                    )}
                                  </div>
                                  
                                  <div className="space-y-3">
                                    <h3 className="text-sm font-medium text-gray-900">Lịch làm việc</h3>
                                    <div className="flex items-center text-sm text-gray-600">
                                      <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                                      <div>
                                        <div>{member.workSchedule.days}</div>
                                        <div>{member.workSchedule.hours}</div>
                                      </div>
                                    </div>
                                  </div>
                                  
                                  <div className="space-y-3">
                                    <h3 className="text-sm font-medium text-gray-900">Kỹ năng</h3>
                                    {member.skills && (
                                      <div className="flex flex-wrap gap-1">
                                        {member.skills.map((skill, index) => (
                                          <span
                                            key={index}
                                            className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs"
                                          >
                                            {skill}
                                          </span>
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                </div>
                                
                                <div className="mt-4 flex space-x-2">
                                  <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">
                                    Xem chi tiết
                                  </button>
                                  <button className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700">
                                    Chỉnh sửa
                                  </button>
                                  <button className="px-3 py-1 bg-yellow-600 text-white text-sm rounded hover:bg-yellow-700">
                                    Gửi tin nhắn
                                  </button>
                                </div>
                              </td>
                            </tr>
                          )}
                        </React.Fragment>
                      ))}
                    </tbody>
                  </table>
                </div>

                {filteredStaff.length === 0 && (
                  <div className="text-center py-12">
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
                        d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                      />
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-gray-900">Không tìm thấy nhân viên nào</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {activeTab === 'active'
                        ? 'Không có nhân viên nào đang làm việc'
                        : activeTab === 'on_leave'
                        ? 'Không có nhân viên nào đang nghỉ phép'
                        : activeTab === 'inactive'
                        ? 'Không có nhân viên nào không hoạt động'
                        : 'Không tìm thấy nhân viên nào phù hợp'}
                    </p>
                    <div className="mt-6">
                      <button
                        type="button"
                        onClick={() => setShowAddModal(true)}
                        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        <Plus className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                        Thêm nhân viên mới
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Add Staff Modal */}
      {showAddModal && <AddStaffModal />}
    </div>
  );
};

export default StaffManagement; 