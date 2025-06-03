import React from 'react';
import StatsCard from '../dashboard/StatsCard';
import { Users, Calendar, FileText, Clock } from 'lucide-react';

const DoctorDashboard: React.FC = () => {
  const upcomingAppointments = [
    { id: 1, patient: 'Nguyễn Văn A', time: '09:00 - 09:30', status: 'confirmed' },
    { id: 2, patient: 'Trần Thị B', time: '10:00 - 10:30', status: 'confirmed' },
    { id: 3, patient: 'Lê Văn C', time: '11:00 - 11:30', status: 'pending' },
    { id: 4, patient: 'Phạm Thị D', time: '14:00 - 14:30', status: 'confirmed' },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Lịch hẹn hôm nay"
          value="8"
          icon={Calendar}
          trend={{ value: "2", isPositive: true }}
          color="blue"
        />
        <StatsCard
          title="Bệnh nhân đã khám"
          value="126"
          icon={Users}
          trend={{ value: "12", isPositive: true }}
          color="green"
        />
        <StatsCard
          title="Thời gian trung bình"
          value="24 phút"
          icon={Clock}
          trend={{ value: "2", isPositive: true }}
          color="purple"
        />
        <StatsCard
          title="Hồ sơ cần xử lý"
          value="3"
          icon={FileText}
          trend={{ value: "1", isPositive: false }}
          color="yellow"
        />
      </div>

      {/* Upcoming Appointments */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Lịch hẹn sắp tới</h3>
          <button className="text-blue-600 text-sm font-medium hover:underline">
            Xem tất cả
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Bệnh nhân
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thời gian
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trạng thái
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {upcomingAppointments.map((appointment) => (
                <tr key={appointment.id}>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{appointment.patient}</div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-gray-600">{appointment.time}</div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs rounded-full ${
                        appointment.status === 'confirmed'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {appointment.status === 'confirmed' ? 'Đã xác nhận' : 'Chờ xác nhận'}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-right text-sm">
                    <button className="text-blue-600 hover:text-blue-900 font-medium mr-2">
                      Chi tiết
                    </button>
                    <button className="text-gray-600 hover:text-gray-900 font-medium">
                      Hủy
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Cập nhật nhanh</h3>
          <div className="space-y-3">
            <button className="w-full text-left px-4 py-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors flex items-center">
              <Calendar className="w-5 h-5 mr-3" />
              <span>Cập nhật lịch làm việc</span>
            </button>
            <button className="w-full text-left px-4 py-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors flex items-center">
              <FileText className="w-5 h-5 mr-3" />
              <span>Tạo đơn thuốc mới</span>
            </button>
            <button className="w-full text-left px-4 py-3 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors flex items-center">
              <Users className="w-5 h-5 mr-3" />
              <span>Xem danh sách bệnh nhân</span>
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 md:col-span-2">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Thông báo mới</h3>
          <div className="space-y-4">
            <div className="p-4 border border-l-4 border-blue-500 rounded-lg bg-blue-50">
              <p className="font-medium text-gray-900">Có 3 hồ sơ y tế cần được hoàn thành</p>
              <p className="text-sm text-gray-600 mt-1">Vui lòng cập nhật trước 17:00 hôm nay</p>
            </div>
            <div className="p-4 border border-l-4 border-yellow-500 rounded-lg bg-yellow-50">
              <p className="font-medium text-gray-900">Cuộc họp giao ban với Ban Giám đốc</p>
              <p className="text-sm text-gray-600 mt-1">Ngày mai, 08:30 - 09:30, Phòng họp A</p>
            </div>
            <div className="p-4 border border-l-4 border-green-500 rounded-lg bg-green-50">
              <p className="font-medium text-gray-900">Đã cập nhật quy trình khám bệnh mới</p>
              <p className="text-sm text-gray-600 mt-1">Có hiệu lực từ ngày 01/12/2023</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard; 