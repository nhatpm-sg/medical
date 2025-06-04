import React, { useState, useEffect } from 'react';
import Sidebar from '../../../components/dashboard/Sidebar';
import Header from '../../../components/dashboard/Header';
import AddDoctorModal from '../../../components/modals/AddDoctorModal';
import { Search, Filter, Plus, MoreHorizontal, Edit2, Trash2, Phone, Mail, CalendarClock } from 'lucide-react';
import { doctorApi, Doctor } from '../../../services/doctorApi';

const DoctorManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'on_leave' | 'inactive'>('all');
  const [activeDoctor, setActiveDoctor] = useState<number | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [specialties, setSpecialties] = useState<string[]>([]);

  useEffect(() => {
    loadDoctors();
    loadSpecialties();
  }, [activeTab, searchTerm, selectedSpecialty]);

  const loadDoctors = async () => {
    setLoading(true);
    try {
      const filter = {
        search: searchTerm || undefined,
        specialty: selectedSpecialty || undefined,
        status: activeTab === 'all' ? undefined : activeTab,
        limit: 50,
        sort_by: 'created_at',
        sort_order: 'desc' as const
      };

      const response = await doctorApi.getDoctors(filter);
      if (response.success && response.data) {
        setDoctors(response.data);
      } else {
        console.error('Failed to load doctors:', response.error);
        setDoctors([]);
      }
    } catch (error) {
      console.error('Error loading doctors:', error);
      setDoctors([]);
    } finally {
      setLoading(false);
    }
  };

  const loadSpecialties = async () => {
    try {
      const response = await doctorApi.getSpecialties();
      if (response.success && response.data) {
        setSpecialties(response.data);
      }
    } catch (error) {
      console.error('Error loading specialties:', error);
    }
  };

  const handleDeleteDoctor = async (id: number) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa bác sĩ này?')) {
      try {
        const response = await doctorApi.deleteDoctor(id);
        if (response.success) {
          await loadDoctors();
        } else {
          alert('Có lỗi xảy ra khi xóa bác sĩ: ' + response.error);
        }
      } catch (error) {
        console.error('Error deleting doctor:', error);
        alert('Có lỗi xảy ra khi xóa bác sĩ');
      }
    }
  };

  const handleAddSuccess = () => {
    loadDoctors();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'on_leave':
        return 'bg-yellow-100 text-yellow-800';
      case 'inactive':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active':
        return 'Đang hoạt động';
      case 'on_leave':
        return 'Nghỉ phép';
      case 'inactive':
        return 'Không hoạt động';
      default:
        return status;
    }
  };

  const filteredDoctors = doctors;

  const getTabCount = (tab: 'all' | 'active' | 'on_leave' | 'inactive') => {
    if (tab === 'all') return doctors.length;
    return doctors.filter(doctor => doctor.status === tab).length;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar role="admin" />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header role="admin" userName="Admin" />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-6 flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0">
              <h1 className="text-2xl font-semibold text-gray-900">Quản lý bác sĩ</h1>
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Tìm kiếm bác sĩ..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full md:w-64 py-2 pl-10 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                </div>
                <select
                  value={selectedSpecialty}
                  onChange={(e) => setSelectedSpecialty(e.target.value)}
                  className="py-2 px-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Tất cả chuyên khoa</option>
                  {specialties.map(specialty => (
                    <option key={specialty} value={specialty}>{specialty}</option>
                  ))}
                </select>
                <button 
                  onClick={() => setShowAddModal(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                >
                  <Plus className="w-5 h-5 mr-1" />
                  <span>Thêm bác sĩ</span>
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="mb-6 border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                {[
                  { key: 'all', label: 'Tất cả' },
                  { key: 'active', label: 'Đang hoạt động' },
                  { key: 'on_leave', label: 'Nghỉ phép' },
                  { key: 'inactive', label: 'Không hoạt động' }
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key as any)}
                    className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm ${
                      activeTab === tab.key
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {tab.label} ({getTabCount(tab.key as any)})
                  </button>
                ))}
              </nav>
            </div>

            {/* Loading */}
            {loading && (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-2 text-gray-600">Đang tải...</p>
              </div>
            )}

            {/* Doctors Table */}
            {!loading && (
              <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Bác sĩ
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Chuyên khoa
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Kinh nghiệm
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Trạng thái
                        </th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Bệnh nhân
                        </th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Lịch hẹn
                        </th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Giá khám
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Thao tác
                        </th>
                      </tr>
                    </thead>

                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredDoctors.map((doctor) => (
                        <React.Fragment key={doctor.id}>
                          <tr 
                            className={`hover:bg-gray-50 cursor-pointer ${activeDoctor === doctor.id ? 'bg-blue-50' : ''}`}
                            onClick={() => setActiveDoctor(activeDoctor === doctor.id ? null : doctor.id)}
                          >
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10 rounded-full overflow-hidden bg-gray-200">
                                  {doctor.avatar ? (
                                    <img 
                                      src={doctor.avatar} 
                                      alt={doctor.name}
                                      className="h-10 w-10 object-cover"
                                    />
                                  ) : (
                                    <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                                      <span className="text-blue-600 font-medium text-sm">
                                        {doctor.name.charAt(0)}
                                      </span>
                                    </div>
                                  )}
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">{doctor.name}</div>
                                  <div className="text-sm text-gray-500">ID: BS{doctor.id.toString().padStart(4, '0')}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{doctor.specialty}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{doctor.experience || 'Chưa cập nhật'}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(doctor.status)}`}>
                                {getStatusLabel(doctor.status)}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-center">
                              <div className="text-sm text-gray-900">{doctor.patient_count}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-center">
                              <div className="text-sm text-gray-900">{doctor.appointment_count}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-center">
                              <div className="text-sm text-gray-900">
                                {doctor.consultation_price ? formatCurrency(doctor.consultation_price) : 'Chưa cập nhật'}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <div className="flex justify-end space-x-2">
                                <button className="text-blue-600 hover:text-blue-900">Xem</button>
                                <button 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteDoctor(doctor.id);
                                  }}
                                  className="text-red-600 hover:text-red-900"
                                >
                                  Xóa
                                </button>
                                <button className="text-gray-600 hover:text-gray-900">
                                  <MoreHorizontal className="w-5 h-5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                          {activeDoctor === doctor.id && (
                            <tr>
                              <td colSpan={8} className="px-6 py-4 bg-blue-50">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                  <div className="space-y-3">
                                    <h3 className="text-sm font-medium text-gray-900">Thông tin liên hệ</h3>
                                    <div className="flex items-center text-sm text-gray-600">
                                      <Mail className="w-4 h-4 mr-2 text-gray-500" />
                                      <span>{doctor.email}</span>
                                    </div>
                                    <div className="flex items-center text-sm text-gray-600">
                                      <Phone className="w-4 h-4 mr-2 text-gray-500" />
                                      <span>{doctor.phone}</span>
                                    </div>
                                    {doctor.address && (
                                      <div className="text-sm text-gray-600">
                                        <strong>Địa chỉ:</strong> {doctor.address}
                                      </div>
                                    )}
                                  </div>
                                  
                                  <div className="space-y-3">
                                    <h3 className="text-sm font-medium text-gray-900">Thông tin nghề nghiệp</h3>
                                    <div className="text-sm text-gray-600">
                                      <strong>Giấy phép:</strong> {doctor.license_number}
                                    </div>
                                    {doctor.education && (
                                      <div className="text-sm text-gray-600">
                                        <strong>Học vấn:</strong> {doctor.education}
                                      </div>
                                    )}
                                    {doctor.bio && (
                                      <div className="text-sm text-gray-600">
                                        <strong>Giới thiệu:</strong> {doctor.bio}
                                      </div>
                                    )}
                                  </div>
                                  
                                  <div className="space-y-3">
                                    <h3 className="text-sm font-medium text-gray-900">Thông tin khác</h3>
                                    <div className="text-sm text-gray-600">
                                      <strong>Ngày tạo:</strong> {formatDate(doctor.created_at)}
                                    </div>
                                    {doctor.date_of_birth && (
                                      <div className="text-sm text-gray-600">
                                        <strong>Ngày sinh:</strong> {formatDate(doctor.date_of_birth)}
                                      </div>
                                    )}
                                    {doctor.gender && (
                                      <div className="text-sm text-gray-600">
                                        <strong>Giới tính:</strong> {doctor.gender}
                                      </div>
                                    )}
                                    <div className="flex justify-end space-x-2 items-start pt-2">
                                      <button className="px-3 py-1.5 bg-blue-50 text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors">
                                        <Edit2 className="w-4 h-4" />
                                      </button>
                                      <button 
                                        onClick={() => handleDeleteDoctor(doctor.id)}
                                        className="px-3 py-1.5 bg-red-50 text-red-600 border border-red-200 rounded-lg hover:bg-red-100 transition-colors"
                                      >
                                        <Trash2 className="w-4 h-4" />
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          )}
                        </React.Fragment>
                      ))}
                    </tbody>
                  </table>
                </div>

                {filteredDoctors.length === 0 && !loading && (
                  <div className="text-center py-8">
                    <p className="text-gray-500">Không tìm thấy bác sĩ nào</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Add Doctor Modal */}
      <AddDoctorModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSuccess={handleAddSuccess}
      />
    </div>
  );
};

export default DoctorManagement; 