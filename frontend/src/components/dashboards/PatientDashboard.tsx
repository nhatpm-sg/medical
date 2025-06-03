import React from 'react';
import StatsCard from '../dashboard/StatsCard';
import { Calendar, Clock, FileText, MessageSquare, User } from 'lucide-react';

interface PatientDashboardProps {
  user?: {
    id: number;
    username: string;
    email: string;
  };
}

const PatientDashboard: React.FC<PatientDashboardProps> = ({ user }) => {
  const upcomingAppointments = [
    { 
      id: 1, 
      doctor: 'BS. Nguyễn Thị Lan', 
      specialty: 'Nội khoa', 
      date: '12/12/2023', 
      time: '09:00 - 09:30', 
      status: 'confirmed' 
    },
    { 
      id: 2, 
      doctor: 'BS. Trần Văn Minh', 
      specialty: 'Da liễu', 
      date: '15/12/2023', 
      time: '14:00 - 14:30', 
      status: 'pending' 
    }
  ];

  const medicalRecords = [
    { id: 1, date: '01/11/2023', doctor: 'BS. Nguyễn Thị Lan', diagnosis: 'Viêm họng cấp', prescriptions: true },
    { id: 2, date: '15/10/2023', doctor: 'BS. Lê Minh Tuấn', diagnosis: 'Dị ứng da', prescriptions: true },
    { id: 3, date: '02/09/2023', doctor: 'BS. Phạm Văn Đức', diagnosis: 'Khám sức khỏe định kỳ', prescriptions: false },
  ];

  return (
    <div className="space-y-6">
      {/* User Info */}
      {user && (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="flex items-center space-x-4">
            <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">{user.username}</h3>
              <p className="text-gray-600">{user.email}</p>
              <p className="text-sm text-gray-500">ID: {user.id}</p>
            </div>
          </div>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Lịch hẹn sắp tới"
          value="2"
          icon={Calendar}
          color="blue"
        />
        <StatsCard
          title="Lịch sử khám"
          value="8"
          icon={Clock}
          color="green"
        />
        <StatsCard
          title="Đơn thuốc"
          value="5"
          icon={FileText}
          color="purple"
        />
        <StatsCard
          title="Tin nhắn mới"
          value="3"
          icon={MessageSquare}
          color="yellow"
        />
      </div>

      {/* Upcoming Appointments */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Lịch hẹn sắp tới</h3>
          <button className="text-blue-600 text-sm font-medium hover:underline">
            Đặt lịch mới
          </button>
        </div>
        
        <div className="space-y-4">
          {upcomingAppointments.map((appointment) => (
            <div key={appointment.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">{appointment.doctor}</h4>
                  <p className="text-gray-600 text-sm">{appointment.specialty}</p>
                </div>
                <span
                  className={`px-2 h-6 flex items-center rounded-full text-xs font-medium ${
                    appointment.status === 'confirmed'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {appointment.status === 'confirmed' ? 'Đã xác nhận' : 'Chờ xác nhận'}
                </span>
              </div>
              <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between items-center">
                <div className="flex items-center text-gray-600 text-sm">
                  <Calendar className="w-4 h-4 mr-1" />
                  <span>{appointment.date}</span>
                  <span className="mx-2">|</span>
                  <Clock className="w-4 h-4 mr-1" />
                  <span>{appointment.time}</span>
                </div>
                <button className="text-blue-600 text-sm font-medium hover:underline">
                  Chi tiết
                </button>
              </div>
            </div>
          ))}
          
          {upcomingAppointments.length === 0 && (
            <div className="text-center py-6">
              <p className="text-gray-500">Bạn không có lịch hẹn nào sắp tới</p>
              <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                Đặt lịch ngay
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Medical Records */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Lịch sử khám bệnh gần đây</h3>
          <button className="text-blue-600 text-sm font-medium hover:underline">
            Xem tất cả
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ngày khám
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Bác sĩ
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Chẩn đoán
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Đơn thuốc
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {medicalRecords.map((record) => (
                <tr key={record.id}>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                    {record.date}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                    {record.doctor}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                    {record.diagnosis}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-center">
                    {record.prescriptions ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Có
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        Không
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900">
                      Xem chi tiết
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard; 