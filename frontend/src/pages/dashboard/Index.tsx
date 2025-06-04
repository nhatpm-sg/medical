import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/dashboard/Sidebar';
import Header from '../../components/dashboard/Header';
import AdminDashboard from '../../components/dashboards/AdminDashboard';
import DoctorDashboard from '../../components/dashboards/DoctorDashboard';
import StaffDashboard from '../../components/dashboards/StaffDashboard';
import PatientDashboard from '../../components/dashboards/PatientDashboard';
import { authService } from '@/services/api';
import { toast } from 'sonner';

const Dashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fixed role - all users are patients
  const userRole: 'admin' | 'doctor' | 'staff' | 'patient' = 'patient';

  useEffect(() => {
    // Kiểm tra người dùng đã đăng nhập chưa
    const currentUser = authService.getCurrentUser();
    if (!currentUser) {
      toast.error('Vui lòng đăng nhập để truy cập trang này');
      navigate('/signin');
      return;
    }
    
    setUser(currentUser);
    setLoading(false);
  }, [navigate]);

  const handleLogout = () => {
    authService.logout();
    toast.success('Đã đăng xuất thành công');
    navigate('/signin');
  };

  const renderDashboard = () => {
    // Since userRole is always 'patient', we can directly return PatientDashboard
    return <PatientDashboard user={user} />;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500 border-r-2 border-b-2"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <Sidebar role={userRole} />
        <div className="flex-1">
          <Header 
            role={userRole} 
            userName={user?.username || 'Người dùng'} 
            onLogout={handleLogout}
          />
          <main className="p-6">
            <div className="max-w-7xl mx-auto">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Chào mừng, {user?.username || 'Người dùng'}!
                </h2>
                <div className="bg-white p-4 rounded-lg shadow mb-6">
                  <div className="font-medium">Email: {user?.email}</div>
                  <div className="text-sm text-gray-500">ID người dùng: {user?.id}</div>
                </div>
              </div>
              {renderDashboard()}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 