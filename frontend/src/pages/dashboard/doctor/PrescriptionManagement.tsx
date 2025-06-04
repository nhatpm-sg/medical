import React, { useState } from 'react';
import Sidebar from '../../../components/dashboard/Sidebar';
import Header from '../../../components/dashboard/Header';
import { Search, Filter, Plus, Edit, Trash2, Eye, Pill, Calendar, User, FileText, Printer, Download } from 'lucide-react';

interface Medicine {
  id: number;
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
  quantity: number;
}

interface Prescription {
  id: number;
  patient: {
    name: string;
    age: number;
    gender: string;
    id: string;
  };
  date: string;
  diagnosis: string;
  medicines: Medicine[];
  status: 'draft' | 'active' | 'completed' | 'cancelled';
  notes: string;
  doctor: string;
  nextVisit?: string;
}

const PrescriptionManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'draft' | 'active' | 'completed'>('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedPrescription, setSelectedPrescription] = useState<Prescription | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Sample data
  const prescriptions: Prescription[] = [
    {
      id: 1,
      patient: {
        name: 'Nguyễn Văn A',
        age: 45,
        gender: 'Nam',
        id: 'P00001'
      },
      date: '2023-12-01',
      diagnosis: 'Viêm họng cấp',
      medicines: [
        {
          id: 1,
          name: 'Paracetamol 500mg',
          dosage: '500mg',
          frequency: '3 lần/ngày',
          duration: '5 ngày',
          instructions: 'Uống sau ăn',
          quantity: 15
        },
        {
          id: 2,
          name: 'Vitamin C 1000mg',
          dosage: '1000mg',
          frequency: '1 lần/ngày',
          duration: '10 ngày',
          instructions: 'Uống vào buổi sáng',
          quantity: 10
        }
      ],
      status: 'active',
      notes: 'Bệnh nhân cần nghỉ ngơi, uống nhiều nước',
      doctor: 'BS. Trần Thị Bình',
      nextVisit: '2023-12-06'
    },
    {
      id: 2,
      patient: {
        name: 'Trần Thị B',
        age: 32,
        gender: 'Nữ',
        id: 'P00002'
      },
      date: '2023-11-30',
      diagnosis: 'Đau đầu, căng thẳng',
      medicines: [
        {
          id: 3,
          name: 'Panadol Extra',
          dosage: '500mg',
          frequency: '2 lần/ngày',
          duration: '3 ngày',
          instructions: 'Uống khi đau đầu',
          quantity: 6
        }
      ],
      status: 'completed',
      notes: 'Bệnh nhân nên tránh căng thẳng, tập thể dục nhẹ',
      doctor: 'BS. Trần Thị Bình'
    },
    {
      id: 3,
      patient: {
        name: 'Lê Văn C',
        age: 50,
        gender: 'Nam',
        id: 'P00003'
      },
      date: '2023-12-01',
      diagnosis: 'Tăng huyết áp',
      medicines: [
        {
          id: 4,
          name: 'Amlodipine 5mg',
          dosage: '5mg',
          frequency: '1 lần/ngày',
          duration: '30 ngày',
          instructions: 'Uống vào buổi tối',
          quantity: 30
        }
      ],
      status: 'draft',
      notes: 'Theo dõi huyết áp hàng ngày, kiểm tra lại sau 2 tuần',
      doctor: 'BS. Trần Thị Bình',
      nextVisit: '2023-12-15'
    }
  ];

  const filteredPrescriptions = prescriptions.filter(prescription => {
    const matchesTab = activeTab === 'all' || prescription.status === activeTab;
    const matchesSearch = prescription.patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         prescription.patient.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         prescription.diagnosis.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'draft': return 'Bản nháp';
      case 'active': return 'Đang sử dụng';
      case 'completed': return 'Hoàn thành';
      case 'cancelled': return 'Đã hủy';
      default: return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'active': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const CreatePrescriptionModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
        <h3 className="text-lg font-semibold mb-6">Tạo đơn thuốc mới</h3>
        
        <div className="space-y-6">
          {/* Patient Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Bệnh nhân</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Chọn bệnh nhân...</option>
                <option>Nguyễn Văn A (P00001)</option>
                <option>Trần Thị B (P00002)</option>
                <option>Lê Văn C (P00003)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Chẩn đoán</label>
              <input 
                type="text" 
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nhập chẩn đoán..."
              />
            </div>
          </div>

          {/* Medicines */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <label className="block text-sm font-medium text-gray-700">Thuốc</label>
              <button className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
                Thêm thuốc
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Tên thuốc</label>
                    <input 
                      type="text" 
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Tên thuốc..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Liều dùng</label>
                    <input 
                      type="text" 
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="500mg..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Tần suất</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>1 lần/ngày</option>
                      <option>2 lần/ngày</option>
                      <option>3 lần/ngày</option>
                      <option>4 lần/ngày</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Thời gian</label>
                    <input 
                      type="text" 
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="5 ngày..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Số lượng</label>
                    <input 
                      type="number" 
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="15..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Cách dùng</label>
                    <input 
                      type="text" 
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Uống sau ăn..."
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Ghi chú</label>
            <textarea 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
              placeholder="Ghi chú thêm cho bệnh nhân..."
            />
          </div>

          {/* Next Visit */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Lịch tái khám</label>
            <input 
              type="date" 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        
        <div className="flex justify-end space-x-3 mt-6 pt-6 border-t border-gray-200">
          <button
            onClick={() => setShowCreateModal(false)}
            className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Hủy
          </button>
          <button className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600">
            Lưu nháp
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Tạo đơn thuốc
          </button>
        </div>
      </div>
    </div>
  );

  const PrescriptionDetailModal = () => (
    selectedPrescription && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-start mb-6">
            <h3 className="text-lg font-semibold">Chi tiết đơn thuốc #{selectedPrescription.id.toString().padStart(6, '0')}</h3>
            <div className="flex space-x-2">
              <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                <Printer className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                <Download className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          <div className="space-y-6">
            {/* Patient and Doctor Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  Thông tin bệnh nhân
                </h4>
                <div className="space-y-2 text-sm">
                  <div><span className="font-medium">Họ tên:</span> {selectedPrescription.patient.name}</div>
                  <div><span className="font-medium">Tuổi:</span> {selectedPrescription.patient.age}</div>
                  <div><span className="font-medium">Giới tính:</span> {selectedPrescription.patient.gender}</div>
                  <div><span className="font-medium">Mã BN:</span> {selectedPrescription.patient.id}</div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                  <FileText className="w-5 h-5 mr-2" />
                  Thông tin khám bệnh
                </h4>
                <div className="space-y-2 text-sm">
                  <div><span className="font-medium">Ngày khám:</span> {selectedPrescription.date}</div>
                  <div><span className="font-medium">Bác sĩ:</span> {selectedPrescription.doctor}</div>
                  <div><span className="font-medium">Chẩn đoán:</span> {selectedPrescription.diagnosis}</div>
                  <div className="flex items-center">
                    <span className="font-medium mr-2">Trạng thái:</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedPrescription.status)}`}>
                      {getStatusLabel(selectedPrescription.status)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Medicines List */}
            <div>
              <h4 className="font-medium text-gray-900 mb-4 flex items-center">
                <Pill className="w-5 h-5 mr-2" />
                Danh sách thuốc
              </h4>
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tên thuốc</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Liều dùng</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tần suất</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Thời gian</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Số lượng</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cách dùng</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {selectedPrescription.medicines.map((medicine) => (
                      <tr key={medicine.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {medicine.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {medicine.dosage}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {medicine.frequency}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {medicine.duration}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {medicine.quantity}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {medicine.instructions}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Notes and Next Visit */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Ghi chú</h4>
                <p className="text-gray-700 text-sm bg-gray-50 p-3 rounded-lg">
                  {selectedPrescription.notes}
                </p>
              </div>
              
              {selectedPrescription.nextVisit && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    Lịch tái khám
                  </h4>
                  <p className="text-gray-700 text-sm bg-blue-50 p-3 rounded-lg">
                    {selectedPrescription.nextVisit}
                  </p>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex justify-end space-x-3 mt-6 pt-6 border-t border-gray-200">
            <button
              onClick={() => setShowDetailModal(false)}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Đóng
            </button>
            {selectedPrescription.status === 'draft' && (
              <>
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                  Kích hoạt
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Chỉnh sửa
                </button>
              </>
            )}
            {selectedPrescription.status === 'active' && (
              <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700">
                Hoàn thành
              </button>
            )}
          </div>
        </div>
      </div>
    )
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <Sidebar role="doctor" />
        <div className="flex-1">
          <Header role="doctor" userName="BS. Trần Thị Bình" />
          <main className="p-6">
            <div className="max-w-7xl mx-auto">
              {/* Header */}
              <div className="mb-6 flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0">
                <h1 className="text-2xl font-semibold text-gray-900">Quản lý đơn thuốc</h1>
                <div className="flex space-x-2">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Tìm kiếm đơn thuốc..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full md:w-64 py-2 pl-10 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  </div>
                  <button className="p-2 bg-white text-gray-600 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors">
                    <Filter className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => setShowCreateModal(true)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                  >
                    <Plus className="w-5 h-5 mr-1" />
                    Tạo đơn thuốc
                  </button>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <div className="flex items-center">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <FileText className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Tổng đơn thuốc</p>
                      <p className="text-2xl font-semibold text-gray-900">{prescriptions.length}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <div className="flex items-center">
                    <div className="p-3 bg-green-100 rounded-lg">
                      <Pill className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Đang sử dụng</p>
                      <p className="text-2xl font-semibold text-gray-900">
                        {prescriptions.filter(p => p.status === 'active').length}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <div className="flex items-center">
                    <div className="p-3 bg-yellow-100 rounded-lg">
                      <Edit className="w-6 h-6 text-yellow-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Bản nháp</p>
                      <p className="text-2xl font-semibold text-gray-900">
                        {prescriptions.filter(p => p.status === 'draft').length}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <div className="flex items-center">
                    <div className="p-3 bg-purple-100 rounded-lg">
                      <Calendar className="w-6 h-6 text-purple-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Hoàn thành</p>
                      <p className="text-2xl font-semibold text-gray-900">
                        {prescriptions.filter(p => p.status === 'completed').length}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
                <div className="flex space-x-4 border-b border-gray-200">
                  {[
                    { key: 'all', label: 'Tất cả' },
                    { key: 'draft', label: 'Bản nháp' },
                    { key: 'active', label: 'Đang sử dụng' },
                    { key: 'completed', label: 'Hoàn thành' }
                  ].map(tab => (
                    <button
                      key={tab.key}
                      onClick={() => setActiveTab(tab.key as any)}
                      className={`pb-4 px-1 font-medium text-sm ${
                        activeTab === tab.key
                          ? 'text-blue-600 border-b-2 border-blue-600'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Prescriptions List */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Mã ĐT</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Bệnh nhân</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ngày tạo</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Chẩn đoán</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Số thuốc</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Trạng thái</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Thao tác</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredPrescriptions.map((prescription) => (
                        <tr key={prescription.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            #{prescription.id.toString().padStart(6, '0')}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="text-sm font-medium text-gray-900">{prescription.patient.name}</div>
                              <div className="text-sm text-gray-500">{prescription.patient.id}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {prescription.date}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900">
                            {prescription.diagnosis}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {prescription.medicines.length} thuốc
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(prescription.status)}`}>
                              {getStatusLabel(prescription.status)}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex justify-end space-x-2">
                              <button 
                                onClick={() => {
                                  setSelectedPrescription(prescription);
                                  setShowDetailModal(true);
                                }}
                                className="text-blue-600 hover:text-blue-900"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              <button className="text-green-600 hover:text-green-900">
                                <Edit className="w-4 h-4" />
                              </button>
                              <button className="text-red-600 hover:text-red-900">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {filteredPrescriptions.length === 0 && (
                  <div className="text-center py-12">
                    <Pill className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">Không có đơn thuốc nào</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Bắt đầu bằng cách tạo đơn thuốc mới cho bệnh nhân.
                    </p>
                    <div className="mt-6">
                      <button
                        onClick={() => setShowCreateModal(true)}
                        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                      >
                        <Plus className="-ml-1 mr-2 h-5 w-5" />
                        Tạo đơn thuốc mới
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Modals */}
      {showCreateModal && <CreatePrescriptionModal />}
      {showDetailModal && <PrescriptionDetailModal />}
    </div>
  );
};

export default PrescriptionManagement; 