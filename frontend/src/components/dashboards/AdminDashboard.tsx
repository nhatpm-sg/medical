import React from 'react';
import StatsCard from '../dashboard/StatsCard';
import { Users, Calendar, FileText, ChartBar } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const recentActivities = [
    { id: 1, action: 'Bác sĩ Nguyễn Văn A đã đăng ký lịch trực', time: '5 phút trước' },
    { id: 2, action: 'Bệnh nhân mới đăng ký khám', time: '10 phút trước' },
    { id: 3, action: 'Báo cáo tháng 11 đã được tạo', time: '1 giờ trước' },
    { id: 4, action: 'Nhân viên B đã cập nhật blog mới', time: '2 giờ trước' },
  ];

  const systemStats = [
    { label: 'Tổng doanh thu tháng', value: '2.5 tỷ VNĐ', change: '+12%' },
    { label: 'Số lượng khám hôm nay', value: '156 ca', change: '+8%' },
    { label: 'Tỷ lệ hài lòng', value: '98.5%', change: '+2%' },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Tổng số Bác sĩ"
          value="24"
          icon={Users}
          trend={{ value: "2", isPositive: true }}
          color="blue"
        />
        <StatsCard
          title="Tổng số Nhân viên"
          value="48"
          icon={Users}
          trend={{ value: "3", isPositive: true }}
          color="green"
        />
        <StatsCard
          title="Bệnh nhân đang điều trị"
          value="312"
          icon={FileText}
          trend={{ value: "15", isPositive: true }}
          color="purple"
        />
        <StatsCard
          title="Lịch hẹn hôm nay"
          value="89"
          icon={Calendar}
          trend={{ value: "7", isPositive: false }}
          color="yellow"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Thống kê hệ thống */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Thống kê hệ thống</h3>
          <div className="space-y-4">
            {systemStats.map((stat, index) => (
              <div key={index} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-b-0">
                <span className="text-gray-600">{stat.label}</span>
                <div className="text-right">
                  <span className="font-semibold text-gray-900">{stat.value}</span>
                  <span className="text-green-600 text-sm ml-2">{stat.change}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Hoạt động gần đây */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Hoạt động gần đây</h3>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3 py-3 border-b border-gray-100 last:border-b-0">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-gray-900 text-sm">{activity.action}</p>
                  <p className="text-gray-500 text-xs mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Biểu đồ và thông tin khác */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quản lý nhanh</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <ChartBar className="w-8 h-8 text-blue-600 mb-2" />
            <p className="font-medium text-gray-900">Xem báo cáo chi tiết</p>
            <p className="text-sm text-gray-600">Thống kê và phân tích</p>
          </button>
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Users className="w-8 h-8 text-green-600 mb-2" />
            <p className="font-medium text-gray-900">Quản lý nhân sự</p>
            <p className="text-sm text-gray-600">Bác sĩ và nhân viên</p>
          </button>
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Calendar className="w-8 h-8 text-purple-600 mb-2" />
            <p className="font-medium text-gray-900">Xem lịch tổng quan</p>
            <p className="text-sm text-gray-600">Tất cả hoạt động</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 