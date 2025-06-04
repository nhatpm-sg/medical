import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Users, 
  Calendar, 
  FileText, 
  Settings, 
  User, 
  Bell,
  Clock,
  ChartBar,
  Book,
  Mail,
  Pill,
  MessageCircle
} from 'lucide-react';

interface SidebarProps {
  role: 'admin' | 'doctor' | 'staff' | 'patient';
}

const Sidebar: React.FC<SidebarProps> = ({ role }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = {
    admin: [
      { icon: ChartBar, label: 'Dashboard', path: '/dashboard/admin' },
      { icon: Users, label: 'Quản lý Bác sĩ', path: '/dashboard/admin/doctors' },
      { icon: Users, label: 'Quản lý Nhân viên', path: '/dashboard/admin/staff' },
      { icon: User, label: 'Quản lý Bệnh nhân', path: '/dashboard/admin/patients' },
      { icon: Calendar, label: 'Lịch tổng quan', path: '/dashboard/admin/schedule' },
      { icon: FileText, label: 'Báo cáo', path: '/dashboard/admin/reports' },
      { icon: Settings, label: 'Cài đặt', path: '/dashboard/admin/settings' },
    ],
    doctor: [
      { icon: ChartBar, label: 'Dashboard', path: '/dashboard/doctor' },
      { icon: Users, label: 'Bệnh nhân', path: '/dashboard/doctor/patients' },
      { icon: Calendar, label: 'Lịch khám', path: '/dashboard/doctor/schedule' },
      { icon: FileText, label: 'Hồ sơ y tế', path: '/dashboard/doctor/records' },
      { icon: Pill, label: 'Quản lý đơn thuốc', path: '/dashboard/doctor/prescriptions' },
      { icon: MessageCircle, label: 'Tư vấn trực tuyến', path: '/dashboard/doctor/consultation' },
      { icon: Bell, label: 'Thông báo', path: '/dashboard/doctor/notifications' },
      { icon: User, label: 'Hồ sơ cá nhân', path: '/dashboard/doctor/profile' },
    ],
    staff: [
      { icon: ChartBar, label: 'Dashboard', path: '/dashboard/staff' },
      { icon: Book, label: 'Quản lý Blog', path: '/dashboard/staff/blog' },
      { icon: Mail, label: 'Tin nhắn', path: '/dashboard/staff/messages' },
      { icon: Users, label: 'Hỗ trợ Bệnh nhân', path: '/dashboard/staff/support' },
      { icon: Calendar, label: 'Lịch làm việc', path: '/dashboard/staff/schedule' },
      { icon: User, label: 'Hồ sơ cá nhân', path: '/dashboard/staff/profile' },
    ],
    patient: [
      { icon: ChartBar, label: 'Dashboard', path: '/dashboard/patient' },
      { icon: Calendar, label: 'Lịch hẹn', path: '/dashboard/patient/appointments' },
      { icon: FileText, label: 'Kết quả khám', path: '/dashboard/patient/results' },
      { icon: Clock, label: 'Lịch sử khám', path: '/dashboard/patient/history' },
      { icon: Bell, label: 'Thông báo', path: '/dashboard/patient/notifications' },
      { icon: User, label: 'Hồ sơ cá nhân', path: '/dashboard/patient/profile' },
    ],
  };

  const roleColors = {
    admin: 'bg-red-600',
    doctor: 'bg-blue-600',
    staff: 'bg-green-600',
    patient: 'bg-purple-600',
  };

  const roleLabels = {
    admin: 'Quản trị viên',
    doctor: 'Bác sĩ',
    staff: 'Nhân viên',
    patient: 'Bệnh nhân',
  };

  return (
    <div className="w-64 bg-white shadow-lg border-r border-gray-200 min-h-screen">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className={`w-10 h-10 ${roleColors[role]} rounded-lg flex items-center justify-center`}>
            <User className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Bệnh viện ABC</h2>
            <p className="text-sm text-gray-600">{roleLabels[role]}</p>
          </div>
        </div>
      </div>

      <nav className="mt-6">
        <ul className="space-y-2 px-4">
          {menuItems[role].map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={item.path}>
                <button
                  onClick={() => navigate(item.path)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 text-left rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <item.icon className={`w-5 h-5 ${isActive ? 'text-blue-700' : 'text-gray-500'}`} />
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar; 