import React, { useState } from 'react';
import Sidebar from '../../../components/dashboard/Sidebar';
import Header from '../../../components/dashboard/Header';
import { Search, Filter, FileText, Calendar, User, Check, Clipboard, Plus } from 'lucide-react';

const MedicalRecords: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'completed'>('all');
  
  const records = [
    { 
      id: 1, 
      patient: 'Nguyễn Văn A', 
      age: 45,
      gender: 'Nam',
      date: '01/12/2023', 
      doctor: 'BS. Trần Thị Bình',
      diagnosis: 'Viêm họng cấp',
      status: 'completed',
      notes: 'Bệnh nhân có triệu chứng ho, đau họng, sốt nhẹ.',
      prescriptions: [
        { name: 'Paracetamol 500mg', dosage: '1 viên x 3 lần/ngày', duration: '5 ngày' },
        { name: 'Vitamin C 1000mg', dosage: '1 viên/ngày', duration: '10 ngày' },
      ]
    },
    { 
      id: 2, 
      patient: 'Trần Thị B', 
      age: 32,
      gender: 'Nữ',
      date: '30/11/2023', 
      doctor: 'BS. Trần Thị Bình',
      diagnosis: 'Đau đầu, căng thẳng',
      status: 'pending',
      notes: 'Bệnh nhân than phiền đau đầu kéo dài, đặc biệt là khi làm việc nhiều.',
      prescriptions: [
        { name: 'Panadol Extra', dosage: '1 viên x 2 lần/ngày', duration: '3 ngày' },
      ]
    },
    { 
      id: 3, 
      patient: 'Lê Văn C', 
      age: 50,
      gender: 'Nam',
      date: '28/11/2023', 
      doctor: 'BS. Trần Thị Bình',
      diagnosis: 'Tăng huyết áp',
      status: 'completed',
      notes: 'Huyết áp 150/90 mmHg. Bệnh nhân cần tiếp tục theo dõi huyết áp hàng ngày.',
      prescriptions: [
        { name: 'Amlodipine 5mg', dosage: '1 viên/ngày (tối)', duration: '30 ngày' },
      ]
    },
  ];

  const filteredRecords = activeTab === 'all' 
    ? records 
    : records.filter(record => record.status === activeTab);

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
                <h1 className="text-2xl font-semibold text-gray-900">Hồ sơ y tế</h1>
                <div className="flex space-x-2">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Tìm kiếm hồ sơ..."
                      className="w-full md:w-64 py-2 pl-10 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  </div>
                  <button className="p-2 bg-white text-gray-600 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors">
                    <Filter className="w-5 h-5" />
                  </button>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center">
                    <Plus className="w-5 h-5 mr-1" />
                    <span>Thêm mới</span>
                  </button>
                </div>
              </div>

              {/* Tabs */}
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
                <div className="flex space-x-4 border-b border-gray-200">
                  <button
                    onClick={() => setActiveTab('all')}
                    className={`pb-4 px-1 font-medium text-sm ${
                      activeTab === 'all'
                        ? 'text-blue-600 border-b-2 border-blue-600'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Tất cả
                  </button>
                  <button
                    onClick={() => setActiveTab('pending')}
                    className={`pb-4 px-1 font-medium text-sm ${
                      activeTab === 'pending'
                        ? 'text-blue-600 border-b-2 border-blue-600'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Chờ hoàn thành
                  </button>
                  <button
                    onClick={() => setActiveTab('completed')}
                    className={`pb-4 px-1 font-medium text-sm ${
                      activeTab === 'completed'
                        ? 'text-blue-600 border-b-2 border-blue-600'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Đã hoàn thành
                  </button>
                </div>
              </div>

              {/* Records */}
              <div className="space-y-6">
                {filteredRecords.map((record) => (
                  <div key={record.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <div className="flex justify-between items-start">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0 h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                          <User className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <h2 className="text-lg font-semibold text-gray-900">{record.patient}</h2>
                          <p className="text-gray-600">{record.age} tuổi, {record.gender}</p>
                          <div className="flex items-center mt-1 text-sm text-gray-500">
                            <Calendar className="w-4 h-4 mr-1" />
                            <span>{record.date}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          record.status === 'completed'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {record.status === 'completed' ? 'Đã hoàn thành' : 'Chờ hoàn thành'}
                        </span>
                        <p className="text-sm text-gray-500 mt-1">{record.doctor}</p>
                      </div>
                    </div>

                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center mb-3">
                          <FileText className="w-5 h-5 text-blue-600 mr-2" />
                          <h3 className="font-medium text-gray-900">Chẩn đoán và ghi chú</h3>
                        </div>
                        <div className="space-y-3">
                          <div>
                            <p className="text-sm font-medium text-gray-500">Chẩn đoán:</p>
                            <p className="text-gray-900">{record.diagnosis}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-500">Ghi chú:</p>
                            <p className="text-gray-700">{record.notes}</p>
                          </div>
                        </div>
                        {record.status === 'pending' && (
                          <div className="mt-4 flex justify-end">
                            <button className="flex items-center text-sm text-blue-600 hover:text-blue-800">
                              <Check className="w-4 h-4 mr-1" />
                              <span>Hoàn thành</span>
                            </button>
                          </div>
                        )}
                      </div>

                      <div className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center mb-3">
                          <Clipboard className="w-5 h-5 text-blue-600 mr-2" />
                          <h3 className="font-medium text-gray-900">Đơn thuốc</h3>
                        </div>
                        {record.prescriptions.length > 0 ? (
                          <div className="space-y-3">
                            {record.prescriptions.map((prescription, index) => (
                              <div key={index} className="border-b border-gray-100 pb-2 last:border-b-0 last:pb-0">
                                <p className="font-medium text-gray-900">{prescription.name}</p>
                                <div className="flex justify-between text-sm">
                                  <span className="text-gray-600">{prescription.dosage}</span>
                                  <span className="text-gray-500">{prescription.duration}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-gray-500 text-sm">Không có đơn thuốc</p>
                        )}
                        <div className="mt-4 flex justify-end">
                          <button className="flex items-center text-sm text-blue-600 hover:text-blue-800">
                            <span>Xem chi tiết</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 flex justify-end space-x-3">
                      <button className="px-3 py-1.5 text-sm text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                        In hồ sơ
                      </button>
                      <button className="px-3 py-1.5 text-sm text-blue-600 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors">
                        Chỉnh sửa
                      </button>
                    </div>
                  </div>
                ))}

                {filteredRecords.length === 0 && (
                  <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 text-center">
                    <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-1">Không có hồ sơ nào</h3>
                    <p className="text-gray-500">
                      {activeTab === 'pending' 
                        ? 'Không có hồ sơ nào đang chờ hoàn thành' 
                        : activeTab === 'completed'
                        ? 'Không có hồ sơ nào đã hoàn thành'
                        : 'Không tìm thấy hồ sơ nào phù hợp'
                      }
                    </p>
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default MedicalRecords; 