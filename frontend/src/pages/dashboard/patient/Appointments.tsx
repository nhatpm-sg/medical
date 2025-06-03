import React, { useState } from 'react';
import Sidebar from '../../../components/dashboard/Sidebar';
import Header from '../../../components/dashboard/Header';
import { Calendar, Clock, MapPin, Phone, User, Plus, ChevronRight, Filter, Search, Check, X } from 'lucide-react';

interface Appointment {
  id: number;
  doctor: string;
  specialty: string;
  date: string;
  time: string;
  location: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  notes?: string;
}

const Appointments: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'completed' | 'cancelled'>('upcoming');
  
  const appointments: Appointment[] = [
    {
      id: 1,
      doctor: 'BS. Nguyễn Văn A',
      specialty: 'Nội khoa',
      date: '10/12/2023',
      time: '09:00 - 09:30',
      location: 'Phòng 101, Tầng 1',
      status: 'upcoming',
      notes: 'Khám tổng quát hàng năm',
    },
    {
      id: 2,
      doctor: 'BS. Trần Thị B',
      specialty: 'Da liễu',
      date: '15/12/2023',
      time: '14:00 - 14:30',
      location: 'Phòng 205, Tầng 2',
      status: 'upcoming',
      notes: 'Điều trị mụn',
    },
    {
      id: 3,
      doctor: 'BS. Lê Văn C',
      specialty: 'Tim mạch',
      date: '25/11/2023',
      time: '10:30 - 11:00',
      location: 'Phòng 305, Tầng 3',
      status: 'completed',
      notes: 'Theo dõi huyết áp',
    },
    {
      id: 4,
      doctor: 'BS. Phạm Thị D',
      specialty: 'Nhi khoa',
      date: '20/11/2023',
      time: '15:00 - 15:30',
      location: 'Phòng 103, Tầng 1',
      status: 'cancelled',
      notes: 'Khám sức khỏe định kỳ',
    },
  ];

  const filteredAppointments = appointments.filter(
    appointment => appointment.status === activeTab
  );

  const getStatusColor = (status: 'upcoming' | 'completed' | 'cancelled') => {
    switch (status) {
      case 'upcoming':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return '';
    }
  };

  const getStatusLabel = (status: 'upcoming' | 'completed' | 'cancelled') => {
    switch (status) {
      case 'upcoming':
        return 'Sắp tới';
      case 'completed':
        return 'Đã hoàn thành';
      case 'cancelled':
        return 'Đã hủy';
      default:
        return '';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <Sidebar role="patient" />
        <div className="flex-1">
          <Header role="patient" userName="BN. Phạm Thị Mai" />
          <main className="p-6">
            <div className="max-w-7xl mx-auto">
              {/* Header */}
              <div className="mb-6 flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0">
                <h1 className="text-2xl font-semibold text-gray-900">Lịch hẹn khám bệnh</h1>
                <div className="flex space-x-2">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Tìm kiếm lịch hẹn..."
                      className="w-full md:w-64 py-2 pl-10 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  </div>
                  <button className="p-2 bg-white text-gray-600 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors">
                    <Filter className="w-5 h-5" />
                  </button>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center">
                    <Plus className="w-5 h-5 mr-1" />
                    <span>Đặt lịch mới</span>
                  </button>
                </div>
              </div>

              {/* Tabs */}
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
                <div className="flex space-x-4 border-b border-gray-200">
                  <button
                    onClick={() => setActiveTab('upcoming')}
                    className={`pb-4 px-1 font-medium text-sm ${
                      activeTab === 'upcoming'
                        ? 'text-blue-600 border-b-2 border-blue-600'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Sắp tới
                  </button>
                  <button
                    onClick={() => setActiveTab('completed')}
                    className={`pb-4 px-1 font-medium text-sm ${
                      activeTab === 'completed'
                        ? 'text-blue-600 border-b-2 border-blue-600'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Đã hoàn thành
                  </button>
                  <button
                    onClick={() => setActiveTab('cancelled')}
                    className={`pb-4 px-1 font-medium text-sm ${
                      activeTab === 'cancelled'
                        ? 'text-blue-600 border-b-2 border-blue-600'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Đã hủy
                  </button>
                </div>
              </div>

              {/* Appointments */}
              <div className="space-y-6">
                {filteredAppointments.map((appointment) => (
                  <div key={appointment.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start space-y-4 md:space-y-0">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mr-4">
                          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                            <User className="w-6 h-6 text-blue-600" />
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center mb-1">
                            <h2 className="text-lg font-semibold text-gray-900 mr-2">{appointment.doctor}</h2>
                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                              {getStatusLabel(appointment.status)}
                            </span>
                          </div>
                          <p className="text-gray-600 mb-1">{appointment.specialty}</p>
                          <div className="space-y-2 mt-4">
                            <div className="flex items-center text-gray-600">
                              <Calendar className="w-4 h-4 text-gray-500 mr-2" />
                              <span>{appointment.date}</span>
                            </div>
                            <div className="flex items-center text-gray-600">
                              <Clock className="w-4 h-4 text-gray-500 mr-2" />
                              <span>{appointment.time}</span>
                            </div>
                            <div className="flex items-center text-gray-600">
                              <MapPin className="w-4 h-4 text-gray-500 mr-2" />
                              <span>{appointment.location}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col space-y-3 md:items-end">
                        {appointment.status === 'upcoming' && (
                          <>
                            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm flex items-center">
                              <Check className="w-4 h-4 mr-1" />
                              <span>Xác nhận</span>
                            </button>
                            <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm flex items-center">
                              <X className="w-4 h-4 mr-1" />
                              <span>Hủy lịch</span>
                            </button>
                          </>
                        )}
                        
                        {appointment.status === 'completed' && (
                          <button className="px-4 py-2 bg-green-50 text-green-700 border border-green-200 rounded-lg hover:bg-green-100 transition-colors text-sm">
                            Xem kết quả
                          </button>
                        )}
                        
                        {appointment.notes && (
                          <div className="mt-2 text-sm text-gray-500 md:text-right">
                            <span className="font-medium">Ghi chú:</span> {appointment.notes}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                {filteredAppointments.length === 0 && (
                  <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 text-center">
                    <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-1">Không có lịch hẹn nào</h3>
                    <p className="text-gray-500 mb-6">
                      {activeTab === 'upcoming'
                        ? 'Bạn không có lịch hẹn nào sắp tới'
                        : activeTab === 'completed'
                        ? 'Bạn chưa có lịch hẹn nào đã hoàn thành'
                        : 'Bạn không có lịch hẹn nào đã hủy'}
                    </p>
                    {activeTab === 'upcoming' && (
                      <button
                        type="button"
                        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        <Plus className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                        Đặt lịch mới
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* Book Appointment Banner */}
              {activeTab === 'upcoming' && filteredAppointments.length > 0 && (
                <div className="mt-8 bg-blue-50 p-6 rounded-lg border border-blue-200">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="mb-4 md:mb-0">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">Cần đặt thêm lịch khám?</h3>
                      <p className="text-gray-600">Đặt lịch khám với bác sĩ chuyên khoa nhanh chóng và thuận tiện.</p>
                    </div>
                    <button className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm flex items-center justify-center">
                      <span>Đặt lịch ngay</span>
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </button>
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

export default Appointments; 