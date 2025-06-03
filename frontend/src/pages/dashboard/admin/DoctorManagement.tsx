import React, { useState } from 'react';
import Sidebar from '../../../components/dashboard/Sidebar';
import Header from '../../../components/dashboard/Header';
import { Search, Filter, Plus, MoreHorizontal, Edit2, Trash2, Phone, Mail, CalendarClock } from 'lucide-react';

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  experience: string;
  status: 'active' | 'on_leave' | 'inactive';
  avatar: string;
  email: string;
  phone: string;
  schedule: {
    days: string;
    hours: string;
  };
  patients: number;
  appointments: number;
}

const DoctorManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'on_leave' | 'inactive'>('all');
  const [activeDoctor, setActiveDoctor] = useState<number | null>(null);

  const doctors: Doctor[] = [
    {
      id: 1,
      name: 'BS. Nguyễn Văn A',
      specialty: 'Nội khoa',
      experience: '10 năm',
      status: 'active',
      avatar: 'https://placehold.co/200/eef/fff',
      email: 'nguyenvana@hospital.com',
      phone: '0901234567',
      schedule: {
        days: 'Thứ 2 - Thứ 6',
        hours: '08:00 - 16:00'
      },
      patients: 250,
      appointments: 35
    },
    {
      id: 2,
      name: 'BS. Trần Thị B',
      specialty: 'Da liễu',
      experience: '8 năm',
      status: 'active',
      avatar: 'https://placehold.co/200/fee/fff',
      email: 'tranthib@hospital.com',
      phone: '0912345678',
      schedule: {
        days: 'Thứ 3 - Thứ 7',
        hours: '09:00 - 17:00'
      },
      patients: 180,
      appointments: 28
    },
    {
      id: 3,
      name: 'BS. Lê Văn C',
      specialty: 'Tim mạch',
      experience: '15 năm',
      status: 'on_leave',
      avatar: 'https://placehold.co/200/efe/fff',
      email: 'levanc@hospital.com',
      phone: '0923456789',
      schedule: {
        days: 'Thứ 2 - Thứ 6',
        hours: '07:30 - 15:30'
      },
      patients: 320,
      appointments: 0
    },
    {
      id: 4,
      name: 'BS. Phạm Thị D',
      specialty: 'Nhi khoa',
      experience: '12 năm',
      status: 'inactive',
      avatar: 'https://placehold.co/200/fee/fff',
      email: 'phamthid@hospital.com',
      phone: '0934567890',
      schedule: {
        days: 'N/A',
        hours: 'N/A'
      },
      patients: 0,
      appointments: 0
    },
  ];

  const filteredDoctors = activeTab === 'all'
    ? doctors
    : doctors.filter(doctor => doctor.status === activeTab);

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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <Sidebar role="admin" />
        <div className="flex-1">
          <Header role="admin" userName="Dr. Nguyễn Văn Admin" />
          <main className="p-6">
            <div className="max-w-7xl mx-auto">
              {/* Header */}
              <div className="mb-6 flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0">
                <h1 className="text-2xl font-semibold text-gray-900">Quản lý bác sĩ</h1>
                <div className="flex space-x-2">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Tìm kiếm bác sĩ..."
                      className="w-full md:w-64 py-2 pl-10 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  </div>
                  <button className="p-2 bg-white text-gray-600 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors">
                    <Filter className="w-5 h-5" />
                  </button>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center">
                    <Plus className="w-5 h-5 mr-1" />
                    <span>Thêm bác sĩ</span>
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
                    onClick={() => setActiveTab('active')}
                    className={`pb-4 px-1 font-medium text-sm ${
                      activeTab === 'active'
                        ? 'text-blue-600 border-b-2 border-blue-600'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Đang làm việc
                  </button>
                  <button
                    onClick={() => setActiveTab('on_leave')}
                    className={`pb-4 px-1 font-medium text-sm ${
                      activeTab === 'on_leave'
                        ? 'text-blue-600 border-b-2 border-blue-600'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Nghỉ phép
                  </button>
                  <button
                    onClick={() => setActiveTab('inactive')}
                    className={`pb-4 px-1 font-medium text-sm ${
                      activeTab === 'inactive'
                        ? 'text-blue-600 border-b-2 border-blue-600'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Không hoạt động
                  </button>
                </div>
              </div>

              {/* Doctors List */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Bác sĩ
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Chuyên khoa
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Kinh nghiệm
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Trạng thái
                        </th>
                        <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Bệnh nhân
                        </th>
                        <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Lịch hẹn
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Thao tác
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredDoctors.map((doctor) => (
                        <React.Fragment key={doctor.id}>
                          <tr 
                            className={`hover:bg-gray-50 ${activeDoctor === doctor.id ? 'bg-blue-50' : ''}`}
                            onClick={() => setActiveDoctor(activeDoctor === doctor.id ? null : doctor.id)}
                          >
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10 rounded-full overflow-hidden">
                                  <img 
                                    src={doctor.avatar} 
                                    alt={doctor.name}
                                    className="h-10 w-10 object-cover"
                                  />
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">{doctor.name}</div>
                                  <div className="text-sm text-gray-500">ID: BS{doctor.id.toString().padStart(4, '0')}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{doctor.specialty}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{doctor.experience}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(doctor.status)}`}>
                                {getStatusLabel(doctor.status)}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-center">
                              <div className="text-sm text-gray-900">{doctor.patients}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-center">
                              <div className="text-sm text-gray-900">{doctor.appointments}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <div className="flex justify-end space-x-2">
                                <button className="text-blue-600 hover:text-blue-900">Xem</button>
                                <button className="text-gray-600 hover:text-gray-900">
                                  <MoreHorizontal className="w-5 h-5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                          {activeDoctor === doctor.id && (
                            <tr>
                              <td colSpan={7} className="px-6 py-4 bg-blue-50">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                  <div className="space-y-3">
                                    <h3 className="text-sm font-medium text-gray-900">Thông tin liên hệ</h3>
                                    <div className="flex items-center text-sm text-gray-600">
                                      <Mail className="w-4 h-4 mr-2 text-gray-500" />
                                      <span>{doctor.email}</span>
                                    </div>
                                    <div className="flex items-center text-sm text-gray-600">
                                      <Phone className="w-4 h-4 mr-2 text-gray-500" />
                                      <span>{doctor.phone}</span>
                                    </div>
                                  </div>
                                  
                                  <div className="space-y-3">
                                    <h3 className="text-sm font-medium text-gray-900">Lịch làm việc</h3>
                                    <div className="flex items-center text-sm text-gray-600">
                                      <CalendarClock className="w-4 h-4 mr-2 text-gray-500" />
                                      <div>
                                        <div>{doctor.schedule.days}</div>
                                        <div>{doctor.schedule.hours}</div>
                                      </div>
                                    </div>
                                  </div>
                                  
                                  <div className="flex justify-end space-x-2 items-start">
                                    <button className="px-3 py-1.5 bg-blue-50 text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors">
                                      <Edit2 className="w-4 h-4" />
                                    </button>
                                    <button className="px-3 py-1.5 bg-red-50 text-red-600 border border-red-200 rounded-lg hover:bg-red-100 transition-colors">
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          )}
                        </React.Fragment>
                      ))}
                    </tbody>
                  </table>
                </div>

                {filteredDoctors.length === 0 && (
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
                    <h3 className="mt-2 text-sm font-medium text-gray-900">Không tìm thấy bác sĩ nào</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {activeTab === 'active'
                        ? 'Không có bác sĩ nào đang làm việc'
                        : activeTab === 'on_leave'
                        ? 'Không có bác sĩ nào đang nghỉ phép'
                        : activeTab === 'inactive'
                        ? 'Không có bác sĩ nào không hoạt động'
                        : 'Không tìm thấy bác sĩ nào phù hợp'}
                    </p>
                    <div className="mt-6">
                      <button
                        type="button"
                        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        <Plus className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                        Thêm bác sĩ mới
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Pagination */}
              {filteredDoctors.length > 0 && (
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
                        Hiển thị <span className="font-medium">1</span> đến <span className="font-medium">{filteredDoctors.length}</span> của{' '}
                        <span className="font-medium">{filteredDoctors.length}</span> kết quả
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

export default DoctorManagement; 