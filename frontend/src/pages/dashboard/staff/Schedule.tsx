import React, { useState } from 'react';
import Sidebar from '../../../components/dashboard/Sidebar';
import Header from '../../../components/dashboard/Header';
import { Calendar, Clock, Plus, Filter, ChevronLeft, ChevronRight, Users, MapPin, Edit, Trash2 } from 'lucide-react';

interface ScheduleEvent {
  id: number;
  title: string;
  description?: string;
  startTime: string;
  endTime: string;
  date: string;
  type: 'meeting' | 'support' | 'training' | 'personal';
  location?: string;
  attendees?: string[];
  color: string;
}

const Schedule: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<'week' | 'day'>('week');
  const [selectedEvent, setSelectedEvent] = useState<ScheduleEvent | null>(null);
  const [showEventModal, setShowEventModal] = useState(false);

  // Sample schedule data
  const scheduleEvents: ScheduleEvent[] = [
    {
      id: 1,
      title: 'Họp giao ban sáng',
      description: 'Họp giao ban hàng ngày với team',
      startTime: '09:00',
      endTime: '10:00',
      date: '2023-12-01',
      type: 'meeting',
      location: 'Phòng họp A - Tầng 2',
      attendees: ['NV. Trần B', 'NV. Lê C'],
      color: 'bg-blue-500'
    },
    {
      id: 2,
      title: 'Hỗ trợ bác sĩ khám bệnh',
      description: 'Hỗ trợ bác sĩ Nguyễn A trong ca khám',
      startTime: '11:00',
      endTime: '12:00',
      date: '2023-12-01',
      type: 'support',
      location: 'Phòng khám số 3 - Tầng 1',
      color: 'bg-green-500'
    },
    {
      id: 3,
      title: 'Cập nhật bài viết blog',
      startTime: '14:00',
      endTime: '15:30',
      date: '2023-12-01',
      type: 'personal',
      location: 'Phòng làm việc - Tầng 3',
      color: 'bg-purple-500'
    },
    {
      id: 4,
      title: 'Gọi xác nhận lịch hẹn',
      description: 'Gọi xác nhận lịch hẹn cho bệnh nhân',
      startTime: '16:00',
      endTime: '17:00',
      date: '2023-12-01',
      type: 'support',
      location: 'Phòng lễ tân - Tầng 1',
      color: 'bg-yellow-500'
    },
    {
      id: 5,
      title: 'Đào tạo hệ thống mới',
      description: 'Đào tạo sử dụng hệ thống quản lý mới',
      startTime: '10:00',
      endTime: '12:00',
      date: '2023-12-02',
      type: 'training',
      location: 'Phòng đào tạo - Tầng 4',
      attendees: ['NV. Phạm D', 'NV. Hoàng E'],
      color: 'bg-orange-500'
    }
  ];

  const getWeekDates = (date: Date) => {
    const startOfWeek = new Date(date);
    const day = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
    startOfWeek.setDate(diff);

    const weekDates = [];
    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(startOfWeek);
      currentDate.setDate(startOfWeek.getDate() + i);
      weekDates.push(currentDate);
    }
    return weekDates;
  };

  const getEventsForDate = (date: string) => {
    return scheduleEvents.filter(event => event.date === date);
  };

  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const formatDateDisplay = (date: Date) => {
    return date.toLocaleDateString('vi-VN', { 
      weekday: 'short', 
      day: 'numeric',
      month: 'numeric'
    });
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'meeting': return 'Họp';
      case 'support': return 'Hỗ trợ';
      case 'training': return 'Đào tạo';
      case 'personal': return 'Cá nhân';
      default: return type;
    }
  };

  const weekDates = getWeekDates(currentDate);
  const today = formatDate(new Date());

  const navigateWeek = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + (direction === 'next' ? 7 : -7));
    setCurrentDate(newDate);
  };

  const timeSlots = Array.from({ length: 10 }, (_, i) => {
    const hour = i + 8; // Start from 8 AM
    return `${hour.toString().padStart(2, '0')}:00`;
  });

  const EventModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <h3 className="text-lg font-semibold mb-4">
          {selectedEvent ? 'Chi tiết sự kiện' : 'Tạo sự kiện mới'}
        </h3>
        
        {selectedEvent && (
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-900">{selectedEvent.title}</h4>
              {selectedEvent.description && (
                <p className="text-gray-600 text-sm mt-1">{selectedEvent.description}</p>
              )}
            </div>
            
            <div className="flex items-center text-sm text-gray-600">
              <Clock className="w-4 h-4 mr-2" />
              <span>{selectedEvent.startTime} - {selectedEvent.endTime}</span>
            </div>
            
            {selectedEvent.location && (
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="w-4 h-4 mr-2" />
                <span>{selectedEvent.location}</span>
              </div>
            )}
            
            {selectedEvent.attendees && selectedEvent.attendees.length > 0 && (
              <div className="flex items-center text-sm text-gray-600">
                <Users className="w-4 h-4 mr-2" />
                <span>{selectedEvent.attendees.join(', ')}</span>
              </div>
            )}
            
            <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
              {getTypeLabel(selectedEvent.type)}
            </div>
            
            <div className="flex space-x-2 pt-4">
              <button className="flex-1 px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 flex items-center justify-center">
                <Edit className="w-4 h-4 mr-1" />
                Chỉnh sửa
              </button>
              <button className="flex-1 px-4 py-2 text-red-600 border border-red-600 rounded-lg hover:bg-red-50 flex items-center justify-center">
                <Trash2 className="w-4 h-4 mr-1" />
                Xóa
              </button>
            </div>
          </div>
        )}
        
        <div className="flex justify-end space-x-2 mt-6">
          <button
            onClick={() => {
              setShowEventModal(false);
              setSelectedEvent(null);
            }}
            className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );

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
                  <h1 className="text-2xl font-semibold text-gray-900">Lịch làm việc</h1>
                  <p className="text-gray-600">Quản lý lịch trình và công việc</p>
                </div>
                <div className="flex space-x-2">
                  <div className="flex rounded-lg border border-gray-300 overflow-hidden">
                    <button
                      onClick={() => setView('week')}
                      className={`px-3 py-2 text-sm font-medium ${
                        view === 'week' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      Tuần
                    </button>
                    <button
                      onClick={() => setView('day')}
                      className={`px-3 py-2 text-sm font-medium ${
                        view === 'day' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      Ngày
                    </button>
                  </div>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center">
                    <Plus className="w-5 h-5 mr-1" />
                    Thêm sự kiện
                  </button>
                </div>
              </div>

              {/* Calendar Navigation */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => navigateWeek('prev')}
                      className="p-2 hover:bg-gray-100 rounded-lg"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <h2 className="text-lg font-semibold">
                      {currentDate.toLocaleDateString('vi-VN', { 
                        month: 'long', 
                        year: 'numeric' 
                      })}
                    </h2>
                    <button
                      onClick={() => navigateWeek('next')}
                      className="p-2 hover:bg-gray-100 rounded-lg"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                  <button
                    onClick={() => setCurrentDate(new Date())}
                    className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded-lg"
                  >
                    Hôm nay
                  </button>
                </div>

                {/* Week View */}
                {view === 'week' && (
                  <div className="overflow-x-auto">
                    <div className="min-w-full">
                      {/* Header */}
                      <div className="grid grid-cols-8 border-b border-gray-200">
                        <div className="p-3 text-sm font-medium text-gray-500">Thời gian</div>
                        {weekDates.map((date, index) => (
                          <div
                            key={index}
                            className={`p-3 text-center border-l border-gray-200 ${
                              formatDate(date) === today ? 'bg-blue-50' : ''
                            }`}
                          >
                            <div className="text-sm font-medium text-gray-900">
                              {formatDateDisplay(date)}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Time slots */}
                      {timeSlots.map((timeSlot, timeIndex) => (
                        <div key={timeIndex} className="grid grid-cols-8 border-b border-gray-100">
                          <div className="p-3 text-sm text-gray-500 border-r border-gray-200">
                            {timeSlot}
                          </div>
                          {weekDates.map((date, dateIndex) => {
                            const dateStr = formatDate(date);
                            const eventsForDate = getEventsForDate(dateStr);
                            const eventsForTimeSlot = eventsForDate.filter(event => 
                              event.startTime <= timeSlot && event.endTime > timeSlot
                            );

                            return (
                              <div
                                key={dateIndex}
                                className={`p-1 min-h-[60px] border-l border-gray-200 ${
                                  dateStr === today ? 'bg-blue-50' : ''
                                }`}
                              >
                                {eventsForTimeSlot.map((event) => (
                                  <div
                                    key={event.id}
                                    onClick={() => {
                                      setSelectedEvent(event);
                                      setShowEventModal(true);
                                    }}
                                    className={`${event.color} text-white text-xs p-2 rounded mb-1 cursor-pointer hover:opacity-80 transition-opacity`}
                                  >
                                    <div className="font-medium truncate">{event.title}</div>
                                    <div className="opacity-90">{event.startTime}-{event.endTime}</div>
                                  </div>
                                ))}
                              </div>
                            );
                          })}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Day View */}
                {view === 'day' && (
                  <div className="p-6">
                    <div className="space-y-4">
                      {timeSlots.map((timeSlot) => {
                        const eventsForTimeSlot = getEventsForDate(today).filter(event => 
                          event.startTime <= timeSlot && event.endTime > timeSlot
                        );

                        return (
                          <div key={timeSlot} className="flex items-start space-x-4 py-2 border-b border-gray-100">
                            <div className="w-16 text-sm text-gray-500 font-medium">
                              {timeSlot}
                            </div>
                            <div className="flex-1">
                              {eventsForTimeSlot.length > 0 ? (
                                <div className="space-y-2">
                                  {eventsForTimeSlot.map((event) => (
                                    <div
                                      key={event.id}
                                      onClick={() => {
                                        setSelectedEvent(event);
                                        setShowEventModal(true);
                                      }}
                                      className={`${event.color} text-white p-3 rounded-lg cursor-pointer hover:opacity-80 transition-opacity`}
                                    >
                                      <div className="font-medium">{event.title}</div>
                                      <div className="text-sm opacity-90 mt-1">
                                        {event.startTime} - {event.endTime}
                                      </div>
                                      {event.location && (
                                        <div className="text-sm opacity-90 mt-1 flex items-center">
                                          <MapPin className="w-3 h-3 mr-1" />
                                          {event.location}
                                        </div>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <div className="text-gray-400 text-sm italic">Không có sự kiện</div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Today's Summary */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Sự kiện hôm nay</h3>
                    <div className="space-y-3">
                      {getEventsForDate(today).map((event) => (
                        <div key={event.id} className="flex items-center p-3 bg-gray-50 rounded-lg">
                          <div className={`w-3 h-3 ${event.color} rounded-full mr-3`}></div>
                          <div className="flex-1">
                            <div className="font-medium text-gray-900">{event.title}</div>
                            <div className="text-sm text-gray-600">
                              {event.startTime} - {event.endTime}
                              {event.location && ` • ${event.location}`}
                            </div>
                          </div>
                          <span className="text-xs px-2 py-1 bg-white rounded text-gray-600">
                            {getTypeLabel(event.type)}
                          </span>
                        </div>
                      ))}
                      {getEventsForDate(today).length === 0 && (
                        <div className="text-center py-8 text-gray-500">
                          <Calendar className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                          <p>Không có sự kiện nào hôm nay</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Quick Stats */}
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Thống kê tuần</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Tổng sự kiện:</span>
                        <span className="font-semibold">12</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Họp:</span>
                        <span className="font-semibold">4</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Hỗ trợ:</span>
                        <span className="font-semibold">6</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Đào tạo:</span>
                        <span className="font-semibold">2</span>
                      </div>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Thao tác nhanh</h3>
                    <div className="space-y-2">
                      <button className="w-full text-left px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        Đặt lịch họp
                      </button>
                      <button className="w-full text-left px-3 py-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                        Lên lịch hỗ trợ
                      </button>
                      <button className="w-full text-left px-3 py-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors">
                        Xem báo cáo
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Event Modal */}
      {showEventModal && <EventModal />}
    </div>
  );
};

export default Schedule; 