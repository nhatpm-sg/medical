import React from 'react';
import StatsCard from '../dashboard/StatsCard';
import { Users, Calendar, MessageSquare, Mail } from 'lucide-react';

const StaffDashboard: React.FC = () => {
  const recentMessages = [
    { id: 1, name: 'Nguyễn Văn A', content: 'Tôi cần đặt lịch khám vào thứ 5 tới', time: '10 phút trước', status: 'unread' },
    { id: 2, name: 'Trần Thị B', content: 'Làm thế nào để đăng ký tài khoản bệnh nhân?', time: '30 phút trước', status: 'read' },
    { id: 3, name: 'Lê Văn C', content: 'Cảm ơn bạn đã hỗ trợ đặt lịch khám', time: '1 giờ trước', status: 'read' },
  ];

  const taskList = [
    { id: 1, task: 'Cập nhật bài viết blog mới', deadline: 'Hôm nay, 14:00', priority: 'high' },
    { id: 2, task: 'Gọi xác nhận lịch hẹn cho bệnh nhân', deadline: 'Hôm nay, 16:00', priority: 'medium' },
    { id: 3, task: 'Chuẩn bị báo cáo tuần', deadline: 'Ngày mai, 09:00', priority: 'medium' },
    { id: 4, task: 'Kiểm tra email phản hồi', deadline: 'Hôm nay, 17:00', priority: 'low' },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Tin nhắn mới"
          value="12"
          icon={MessageSquare}
          trend={{ value: "5", isPositive: true }}
          color="blue"
        />
        <StatsCard
          title="Lịch hẹn hôm nay"
          value="28"
          icon={Calendar}
          trend={{ value: "2", isPositive: false }}
          color="yellow"
        />
        <StatsCard
          title="Bệnh nhân mới"
          value="8"
          icon={Users}
          trend={{ value: "3", isPositive: true }}
          color="green"
        />
        <StatsCard
          title="Email chưa đọc"
          value="5"
          icon={Mail}
          trend={{ value: "2", isPositive: false }}
          color="purple"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Messages */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Tin nhắn gần đây</h3>
            <button className="text-blue-600 text-sm font-medium hover:underline">
              Xem tất cả
            </button>
          </div>
          <div className="space-y-4">
            {recentMessages.map((message) => (
              <div key={message.id} className="p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex justify-between">
                  <span className="font-medium text-gray-900">{message.name}</span>
                  <span className="text-xs text-gray-500">{message.time}</span>
                </div>
                <p className="text-gray-600 text-sm mt-1">{message.content}</p>
                <div className="flex justify-between items-center mt-3">
                  <button className="text-blue-600 text-sm hover:underline">Trả lời</button>
                  {message.status === 'unread' && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                      Chưa đọc
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Task List */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Công việc cần làm</h3>
            <button className="text-blue-600 text-sm font-medium hover:underline">
              Thêm mới
            </button>
          </div>
          <div className="space-y-3">
            {taskList.map((task) => (
              <div key={task.id} className="flex items-start p-3 border-b border-gray-100 last:border-b-0">
                <input type="checkbox" className="mt-1 mr-3" />
                <div className="flex-1">
                  <div className="flex justify-between">
                    <p className="font-medium text-gray-900">{task.task}</p>
                    <span
                      className={`px-2 py-0.5 rounded text-xs font-medium ${
                        task.priority === 'high'
                          ? 'bg-red-100 text-red-800'
                          : task.priority === 'medium'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-green-100 text-green-800'
                      }`}
                    >
                      {task.priority === 'high' ? 'Cao' : task.priority === 'medium' ? 'Trung bình' : 'Thấp'}
                    </span>
                  </div>
                  <p className="text-gray-500 text-xs mt-1">Hạn: {task.deadline}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Calendar */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Lịch làm việc hôm nay</h3>
        <div className="space-y-3">
          <div className="flex items-center p-3 bg-blue-50 rounded-lg border border-blue-100">
            <div className="w-16 text-center border-r border-blue-200 pr-3">
              <span className="block text-blue-700 font-semibold">09:00</span>
              <span className="block text-blue-700 font-semibold">10:00</span>
            </div>
            <div className="ml-3">
              <p className="font-medium text-gray-900">Họp giao ban sáng</p>
              <p className="text-sm text-gray-600">Phòng họp A - Tầng 2</p>
            </div>
          </div>
          
          <div className="flex items-center p-3 bg-green-50 rounded-lg border border-green-100">
            <div className="w-16 text-center border-r border-green-200 pr-3">
              <span className="block text-green-700 font-semibold">11:00</span>
              <span className="block text-green-700 font-semibold">12:00</span>
            </div>
            <div className="ml-3">
              <p className="font-medium text-gray-900">Hỗ trợ bác sĩ khám bệnh</p>
              <p className="text-sm text-gray-600">Phòng khám số 3 - Tầng 1</p>
            </div>
          </div>
          
          <div className="flex items-center p-3 bg-purple-50 rounded-lg border border-purple-100">
            <div className="w-16 text-center border-r border-purple-200 pr-3">
              <span className="block text-purple-700 font-semibold">14:00</span>
              <span className="block text-purple-700 font-semibold">15:30</span>
            </div>
            <div className="ml-3">
              <p className="font-medium text-gray-900">Cập nhật bài viết blog</p>
              <p className="text-sm text-gray-600">Phòng làm việc - Tầng 3</p>
            </div>
          </div>
          
          <div className="flex items-center p-3 bg-yellow-50 rounded-lg border border-yellow-100">
            <div className="w-16 text-center border-r border-yellow-200 pr-3">
              <span className="block text-yellow-700 font-semibold">16:00</span>
              <span className="block text-yellow-700 font-semibold">17:00</span>
            </div>
            <div className="ml-3">
              <p className="font-medium text-gray-900">Gọi xác nhận lịch hẹn</p>
              <p className="text-sm text-gray-600">Phòng lễ tân - Tầng 1</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffDashboard; 