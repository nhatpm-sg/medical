import React, { useState } from 'react';
import Sidebar from '../../../components/dashboard/Sidebar';
import Header from '../../../components/dashboard/Header';
import { Calendar, Clock, User, Check, X } from 'lucide-react';

const Schedule: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  // Giả lập dữ liệu lịch hẹn
  const appointments = [
    { id: 1, time: '09:00 - 09:30', patient: 'Nguyễn Văn A', reason: 'Khám tổng quát', status: 'confirmed' },
    { id: 2, time: '10:00 - 10:30', patient: 'Trần Thị B', reason: 'Đau đầu, sốt', status: 'confirmed' },
    { id: 3, time: '11:00 - 11:30', patient: 'Lê Văn C', reason: 'Theo dõi huyết áp', status: 'pending' },
    { id: 4, time: '13:30 - 14:00', patient: 'Phạm Thị D', reason: 'Khám da liễu', status: 'confirmed' },
    { id: 5, time: '15:00 - 15:30', patient: 'Hoàng Văn E', reason: 'Tư vấn dinh dưỡng', status: 'cancelled' },
  ];

  // Các ngày trong tuần
  const weekDays = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
  
  // Tạo dữ liệu lịch tháng
  const getDaysInMonth = () => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const days = [];
    
    // Thêm các ngày của tháng trước để lấp đầy tuần đầu tiên
    const firstDay = date.getDay();
    const prevMonthDays = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
    
    for (let i = prevMonthDays - firstDay + 1; i <= prevMonthDays; i++) {
      days.push({ day: i, currentMonth: false, hasAppointment: false });
    }
    
    // Thêm các ngày của tháng hiện tại
    const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    
    for (let i = 1; i <= daysInMonth; i++) {
      // Kiểm tra xem ngày này có lịch hẹn không
      const hasAppointment = Math.random() > 0.7;
      days.push({ day: i, currentMonth: true, hasAppointment });
    }
    
    // Thêm các ngày của tháng sau để lấp đầy tuần cuối cùng
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay();
    const nextDays = 6 - lastDay;
    
    for (let i = 1; i <= nextDays; i++) {
      days.push({ day: i, currentMonth: false, hasAppointment: false });
    }
    
    return days;
  };

  const monthDays = getDaysInMonth();
  const today = new Date().getDate();
  const currentMonth = currentDate.toLocaleString('vi-VN', { month: 'long', year: 'numeric' });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <Sidebar role="doctor" />
        <div className="flex-1">
          <Header role="doctor" userName="BS. Trần Thị Bình" />
          <main className="p-6">
            <div className="max-w-7xl mx-auto">
              <div className="mb-6 flex justify-between items-center">
                <h1 className="text-2xl font-semibold text-gray-900">Lịch khám bệnh</h1>
                <div className="flex space-x-2">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Thêm lịch hẹn
                  </button>
                  <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                    Xuất lịch
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Lịch tháng */}
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold text-gray-900">{currentMonth}</h2>
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))}
                        className="p-1 rounded-full hover:bg-gray-100"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <button 
                        onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))}
                        className="p-1 rounded-full hover:bg-gray-100"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Ngày trong tuần */}
                  <div className="grid grid-cols-7 gap-1 mb-2">
                    {weekDays.map((day, index) => (
                      <div key={index} className="text-center text-sm font-medium text-gray-500 py-1">
                        {day}
                      </div>
                    ))}
                  </div>

                  {/* Ngày trong tháng */}
                  <div className="grid grid-cols-7 gap-1">
                    {monthDays.map((day, index) => (
                      <button 
                        key={index}
                        className={`h-10 rounded-lg flex items-center justify-center text-sm font-medium
                          ${day.currentMonth 
                            ? day.day === today && currentDate.getMonth() === new Date().getMonth() && currentDate.getFullYear() === new Date().getFullYear()
                              ? 'bg-blue-600 text-white'
                              : day.hasAppointment 
                                ? 'bg-blue-50 text-blue-600' 
                                : 'text-gray-900 hover:bg-gray-100'
                            : 'text-gray-400 hover:bg-gray-50'
                          }
                        `}
                      >
                        {day.day}
                        {day.hasAppointment && day.currentMonth && (
                          <span className="absolute bottom-1 w-1 h-1 bg-blue-600 rounded-full"></span>
                        )}
                      </button>
                    ))}
                  </div>

                  <div className="mt-4 border-t border-gray-200 pt-4">
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-blue-600 rounded-full mr-2"></div>
                        <span>Hôm nay</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-blue-50 rounded-full mr-2"></div>
                        <span>Có lịch hẹn</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Danh sách lịch hẹn hôm nay */}
                <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold text-gray-900">Lịch hẹn hôm nay</h2>
                    <div className="flex items-center">
                      <Calendar className="w-5 h-5 text-gray-600 mr-2" />
                      <span className="text-gray-600">
                        {new Date().toLocaleDateString('vi-VN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {appointments.map((appointment) => (
                      <div 
                        key={appointment.id} 
                        className={`p-4 border rounded-lg ${
                          appointment.status === 'confirmed' 
                            ? 'border-green-200 bg-green-50' 
                            : appointment.status === 'pending'
                            ? 'border-yellow-200 bg-yellow-50'
                            : 'border-red-200 bg-red-50'
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex items-start space-x-3">
                            <div className="mt-1">
                              <Clock className={`w-5 h-5 ${
                                appointment.status === 'confirmed' 
                                  ? 'text-green-600' 
                                  : appointment.status === 'pending'
                                  ? 'text-yellow-600'
                                  : 'text-red-600'
                              }`} />
                            </div>
                            <div>
                              <div className="font-medium">{appointment.time}</div>
                              <div className="flex items-center mt-1">
                                <User className="w-4 h-4 text-gray-500 mr-1" />
                                <span className="text-gray-800">{appointment.patient}</span>
                              </div>
                              <div className="text-sm text-gray-600 mt-1">{appointment.reason}</div>
                            </div>
                          </div>
                          <div>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              appointment.status === 'confirmed' 
                                ? 'bg-green-100 text-green-800' 
                                : appointment.status === 'pending'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {appointment.status === 'confirmed' 
                                ? 'Đã xác nhận' 
                                : appointment.status === 'pending'
                                ? 'Chờ xác nhận'
                                : 'Đã hủy'
                              }
                            </span>
                            
                            <div className="flex mt-2 space-x-1">
                              {appointment.status === 'pending' && (
                                <>
                                  <button className="p-1 rounded bg-green-100 text-green-600 hover:bg-green-200">
                                    <Check className="w-4 h-4" />
                                  </button>
                                  <button className="p-1 rounded bg-red-100 text-red-600 hover:bg-red-200">
                                    <X className="w-4 h-4" />
                                  </button>
                                </>
                              )}
                              <button className="p-1 rounded bg-blue-100 text-blue-600 hover:bg-blue-200">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {appointments.length === 0 && (
                      <div className="text-center py-8">
                        <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-500">Không có lịch hẹn nào hôm nay</p>
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

export default Schedule; 