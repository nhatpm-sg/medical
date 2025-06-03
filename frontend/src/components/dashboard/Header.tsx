import React from 'react';
import { Bell, Search, User, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  role: 'admin' | 'doctor' | 'staff' | 'patient';
  userName: string;
  onLogout?: () => void;
}

const Header: React.FC<HeaderProps> = ({ role, userName, onLogout }) => {
  const navigate = useNavigate();

  const getRolePath = () => {
    switch (role) {
      case 'admin':
        return '/dashboard/admin';
      case 'doctor':
        return '/dashboard/doctor';
      case 'staff':
        return '/dashboard/staff';
      case 'patient':
        return '/dashboard/patient';
      default:
        return '/dashboard';
    }
  };

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 py-4 px-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-xl font-semibold text-gray-800 mr-6">Dashboard</h1>
          <div className="relative hidden md:block">
            <input
              type="text"
              placeholder="Tìm kiếm..."
              className="w-64 py-2 pl-10 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button className="relative p-2 rounded-full hover:bg-gray-100">
            <Bell className="w-6 h-6 text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          
          <button 
            onClick={handleLogout}
            className="p-2 rounded-full hover:bg-gray-100" 
            title="Đăng xuất"
          >
            <LogOut className="w-6 h-6 text-gray-600" />
          </button>
          
          <div className="flex items-center space-x-3">
            <div className="hidden md:block text-right">
              <p className="text-sm font-medium text-gray-700">{userName}</p>
              <p className="text-xs text-gray-500">
                {role === 'admin' && 'Quản trị viên'}
                {role === 'doctor' && 'Bác sĩ'}
                {role === 'staff' && 'Nhân viên'}
                {role === 'patient' && 'Bệnh nhân'}
              </p>
            </div>
            <button 
              onClick={() => navigate(`${getRolePath()}/profile`)}
              className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center"
            >
              <User className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 