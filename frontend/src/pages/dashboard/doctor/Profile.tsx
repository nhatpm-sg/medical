import React, { useState } from 'react';
import Sidebar from '../../../components/dashboard/Sidebar';
import Header from '../../../components/dashboard/Header';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Clock, 
  Stethoscope, 
  Award, 
  BookOpen, 
  Edit3, 
  Save, 
  X, 
  Camera,
  Settings,
  Bell,
  Shield,
  Eye,
  EyeOff
} from 'lucide-react';

const Profile: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'profile' | 'schedule' | 'settings'>('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordChange, setShowPasswordChange] = useState(false);

  // Doctor profile data
  const [doctorProfile, setDoctorProfile] = useState({
    id: 'BS001',
    name: 'BS. Trần Thị Bình',
    speciality: 'Nội khoa',
    email: 'tranbinhdoc@hospital.vn',
    phone: '0901234567',
    address: '123 Đường ABC, Quận 1, TP.HCM',
    dateOfBirth: '1985-05-15',
    gender: 'Nữ',
    experience: '8 năm',
    education: 'Bác sĩ Y khoa - Đại học Y Dược TP.HCM',
    certifications: [
      'Chứng chỉ chuyên khoa cấp II Nội khoa',
      'Chứng chỉ Tim mạch can thiệp',
      'Chứng chỉ Siêu âm tim'
    ],
    bio: 'Bác sĩ chuyên khoa Nội - Tim mạch với 8 năm kinh nghiệm trong việc chẩn đoán và điều trị các bệnh lý tim mạch, tăng huyết áp, tiểu đường.',
    workingHours: {
      monday: { start: '08:00', end: '17:00', active: true },
      tuesday: { start: '08:00', end: '17:00', active: true },
      wednesday: { start: '08:00', end: '17:00', active: true },
      thursday: { start: '08:00', end: '17:00', active: true },
      friday: { start: '08:00', end: '17:00', active: true },
      saturday: { start: '08:00', end: '12:00', active: true },
      sunday: { start: '', end: '', active: false }
    },
    consultationPrice: 200000,
    avatar: 'https://placehold.co/200x200/e0e7ff/6366f1?text=TB'
  });

  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    appointmentReminders: true,
    consultationAlerts: true,
    systemUpdates: true,
    marketingEmails: false,
    language: 'vi',
    timezone: 'Asia/Ho_Chi_Minh',
    autoAcceptConsultations: false,
    workingMode: 'hybrid' // online, offline, hybrid
  });

  const handleSaveProfile = () => {
    // Handle save profile logic
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    // Reset form data
    setIsEditing(false);
  };

  const ProfileTab = () => (
    <div className="space-y-6">
      {/* Avatar and Basic Info */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-start space-x-6">
          <div className="relative">
            <img
              src={doctorProfile.avatar}
              alt={doctorProfile.name}
              className="w-24 h-24 rounded-full object-cover"
            />
            {isEditing && (
              <button className="absolute bottom-0 right-0 p-1 bg-blue-600 text-white rounded-full hover:bg-blue-700">
                <Camera className="w-4 h-4" />
              </button>
            )}
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{doctorProfile.name}</h2>
                <p className="text-lg text-blue-600 font-medium">{doctorProfile.speciality}</p>
                <p className="text-gray-600 mt-1">Mã BS: {doctorProfile.id}</p>
              </div>
              <div className="flex space-x-2">
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
                  >
                    <Edit3 className="w-4 h-4 mr-2" />
                    Chỉnh sửa
                  </button>
                ) : (
                  <>
                    <button
                      onClick={handleCancelEdit}
                      className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 flex items-center"
                    >
                      <X className="w-4 h-4 mr-2" />
                      Hủy
                    </button>
                    <button
                      onClick={handleSaveProfile}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Lưu
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Personal Information */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <User className="w-5 h-5 mr-2" />
          Thông tin cá nhân
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Họ và tên</label>
            {isEditing ? (
              <input
                type="text"
                value={doctorProfile.name}
                onChange={(e) => setDoctorProfile({...doctorProfile, name: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="text-gray-900">{doctorProfile.name}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Chuyên khoa</label>
            {isEditing ? (
              <select
                value={doctorProfile.speciality}
                onChange={(e) => setDoctorProfile({...doctorProfile, speciality: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>Nội khoa</option>
                <option>Ngoại khoa</option>
                <option>Nhi khoa</option>
                <option>Sản phụ khoa</option>
                <option>Tim mạch</option>
                <option>Da liễu</option>
              </select>
            ) : (
              <p className="text-gray-900">{doctorProfile.speciality}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            {isEditing ? (
              <input
                type="email"
                value={doctorProfile.email}
                onChange={(e) => setDoctorProfile({...doctorProfile, email: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-2 text-gray-500" />
                <p className="text-gray-900">{doctorProfile.email}</p>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Số điện thoại</label>
            {isEditing ? (
              <input
                type="tel"
                value={doctorProfile.phone}
                onChange={(e) => setDoctorProfile({...doctorProfile, phone: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-2 text-gray-500" />
                <p className="text-gray-900">{doctorProfile.phone}</p>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Ngày sinh</label>
            {isEditing ? (
              <input
                type="date"
                value={doctorProfile.dateOfBirth}
                onChange={(e) => setDoctorProfile({...doctorProfile, dateOfBirth: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="text-gray-900">{new Date(doctorProfile.dateOfBirth).toLocaleDateString('vi-VN')}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Giới tính</label>
            {isEditing ? (
              <select
                value={doctorProfile.gender}
                onChange={(e) => setDoctorProfile({...doctorProfile, gender: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>Nam</option>
                <option>Nữ</option>
              </select>
            ) : (
              <p className="text-gray-900">{doctorProfile.gender}</p>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Địa chỉ</label>
            {isEditing ? (
              <textarea
                value={doctorProfile.address}
                onChange={(e) => setDoctorProfile({...doctorProfile, address: e.target.value})}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-2 text-gray-500" />
                <p className="text-gray-900">{doctorProfile.address}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Professional Information */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Stethoscope className="w-5 h-5 mr-2" />
          Thông tin nghề nghiệp
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Kinh nghiệm</label>
            {isEditing ? (
              <input
                type="text"
                value={doctorProfile.experience}
                onChange={(e) => setDoctorProfile({...doctorProfile, experience: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="text-gray-900">{doctorProfile.experience}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Học vấn</label>
            {isEditing ? (
              <textarea
                value={doctorProfile.education}
                onChange={(e) => setDoctorProfile({...doctorProfile, education: e.target.value})}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <div className="flex items-center">
                <BookOpen className="w-4 h-4 mr-2 text-gray-500" />
                <p className="text-gray-900">{doctorProfile.education}</p>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Chứng chỉ</label>
            <div className="space-y-2">
              {doctorProfile.certifications.map((cert, index) => (
                <div key={index} className="flex items-center">
                  <Award className="w-4 h-4 mr-2 text-gray-500" />
                  <p className="text-gray-900">{cert}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Giới thiệu</label>
            {isEditing ? (
              <textarea
                value={doctorProfile.bio}
                onChange={(e) => setDoctorProfile({...doctorProfile, bio: e.target.value})}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="text-gray-700">{doctorProfile.bio}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Giá tư vấn</label>
            {isEditing ? (
              <input
                type="number"
                value={doctorProfile.consultationPrice}
                onChange={(e) => setDoctorProfile({...doctorProfile, consultationPrice: parseInt(e.target.value)})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="text-gray-900">{doctorProfile.consultationPrice.toLocaleString('vi-VN')} VND</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const ScheduleTab = () => (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <Calendar className="w-5 h-5 mr-2" />
        Lịch làm việc
      </h3>
      <div className="space-y-4">
        {Object.entries(doctorProfile.workingHours).map(([day, schedule]) => {
          const dayNames = {
            monday: 'Thứ Hai',
            tuesday: 'Thứ Ba',
            wednesday: 'Thứ Tư',
            thursday: 'Thứ Năm',
            friday: 'Thứ Sáu',
            saturday: 'Thứ Bảy',
            sunday: 'Chủ Nhật'
          };

          return (
            <div key={day} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-20">
                  <p className="font-medium text-gray-900">{dayNames[day as keyof typeof dayNames]}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={schedule.active}
                    onChange={(e) => {
                      const newWorkingHours = {
                        ...doctorProfile.workingHours,
                        [day]: { ...schedule, active: e.target.checked }
                      };
                      setDoctorProfile({...doctorProfile, workingHours: newWorkingHours});
                    }}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-600">Hoạt động</span>
                </div>
              </div>
              
              {schedule.active && (
                <div className="flex items-center space-x-2">
                  <input
                    type="time"
                    value={schedule.start}
                    onChange={(e) => {
                      const newWorkingHours = {
                        ...doctorProfile.workingHours,
                        [day]: { ...schedule, start: e.target.value }
                      };
                      setDoctorProfile({...doctorProfile, workingHours: newWorkingHours});
                    }}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-gray-500">-</span>
                  <input
                    type="time"
                    value={schedule.end}
                    onChange={(e) => {
                      const newWorkingHours = {
                        ...doctorProfile.workingHours,
                        [day]: { ...schedule, end: e.target.value }
                      };
                      setDoctorProfile({...doctorProfile, workingHours: newWorkingHours});
                    }}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      <div className="mt-6 flex justify-end">
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Lưu lịch làm việc
        </button>
      </div>
    </div>
  );

  const SettingsTab = () => (
    <div className="space-y-6">
      {/* Notification Settings */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Bell className="w-5 h-5 mr-2" />
          Cài đặt thông báo
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Thông báo email</p>
              <p className="text-sm text-gray-600">Nhận thông báo qua email</p>
            </div>
            <input
              type="checkbox"
              checked={settings.emailNotifications}
              onChange={(e) => setSettings({...settings, emailNotifications: e.target.checked})}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Thông báo SMS</p>
              <p className="text-sm text-gray-600">Nhận thông báo qua tin nhắn</p>
            </div>
            <input
              type="checkbox"
              checked={settings.smsNotifications}
              onChange={(e) => setSettings({...settings, smsNotifications: e.target.checked})}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Nhắc nhở lịch hẹn</p>
              <p className="text-sm text-gray-600">Nhận nhắc nhở về lịch hẹn sắp tới</p>
            </div>
            <input
              type="checkbox"
              checked={settings.appointmentReminders}
              onChange={(e) => setSettings({...settings, appointmentReminders: e.target.checked})}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Cảnh báo tư vấn</p>
              <p className="text-sm text-gray-600">Nhận cảnh báo khi có yêu cầu tư vấn mới</p>
            </div>
            <input
              type="checkbox"
              checked={settings.consultationAlerts}
              onChange={(e) => setSettings({...settings, consultationAlerts: e.target.checked})}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Cập nhật hệ thống</p>
              <p className="text-sm text-gray-600">Nhận thông báo về các cập nhật hệ thống</p>
            </div>
            <input
              type="checkbox"
              checked={settings.systemUpdates}
              onChange={(e) => setSettings({...settings, systemUpdates: e.target.checked})}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Email marketing</p>
              <p className="text-sm text-gray-600">Nhận email về khuyến mãi và tin tức</p>
            </div>
            <input
              type="checkbox"
              checked={settings.marketingEmails}
              onChange={(e) => setSettings({...settings, marketingEmails: e.target.checked})}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* General Settings */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Settings className="w-5 h-5 mr-2" />
          Cài đặt chung
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Ngôn ngữ</label>
            <select
              value={settings.language}
              onChange={(e) => setSettings({...settings, language: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="vi">Tiếng Việt</option>
              <option value="en">English</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Múi giờ</label>
            <select
              value={settings.timezone}
              onChange={(e) => setSettings({...settings, timezone: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Asia/Ho_Chi_Minh">Việt Nam (UTC+7)</option>
              <option value="Asia/Bangkok">Thái Lan (UTC+7)</option>
              <option value="Asia/Singapore">Singapore (UTC+8)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Chế độ làm việc</label>
            <select
              value={settings.workingMode}
              onChange={(e) => setSettings({...settings, workingMode: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="online">Chỉ trực tuyến</option>
              <option value="offline">Chỉ tại phòng khám</option>
              <option value="hybrid">Kết hợp</option>
            </select>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Tự động chấp nhận tư vấn</p>
              <p className="text-sm text-gray-600">Tự động chấp nhận các yêu cầu tư vấn mới</p>
            </div>
            <input
              type="checkbox"
              checked={settings.autoAcceptConsultations}
              onChange={(e) => setSettings({...settings, autoAcceptConsultations: e.target.checked})}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Security Settings */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Shield className="w-5 h-5 mr-2" />
          Bảo mật
        </h3>
        <div className="space-y-4">
          <button
            onClick={() => setShowPasswordChange(!showPasswordChange)}
            className="w-full text-left px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center justify-between"
          >
            <span>Đổi mật khẩu</span>
            <Edit3 className="w-4 h-4" />
          </button>

          {showPasswordChange && (
            <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Mật khẩu hiện tại</label>
                <div className="relative">
                  <input
                    type="password"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Mật khẩu mới</label>
                <input
                  type="password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Xác nhận mật khẩu mới</label>
                <input
                  type="password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex space-x-2">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Cập nhật
                </button>
                <button
                  onClick={() => setShowPasswordChange(false)}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                >
                  Hủy
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-end">
        <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Lưu tất cả cài đặt
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <Sidebar role="doctor" />
        <div className="flex-1">
          <Header role="doctor" userName="BS. Trần Thị Bình" />
          <main className="p-6">
            <div className="max-w-6xl mx-auto">
              {/* Header */}
              <div className="mb-6">
                <h1 className="text-2xl font-semibold text-gray-900">Hồ sơ cá nhân</h1>
                <p className="text-gray-600">Quản lý thông tin cá nhân và cài đặt tài khoản</p>
              </div>

              {/* Tabs */}
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
                <div className="flex space-x-4 border-b border-gray-200">
                  {[
                    { key: 'profile', label: 'Thông tin cá nhân', icon: User },
                    { key: 'schedule', label: 'Lịch làm việc', icon: Calendar },
                    { key: 'settings', label: 'Cài đặt', icon: Settings }
                  ].map(tab => (
                    <button
                      key={tab.key}
                      onClick={() => setActiveTab(tab.key as any)}
                      className={`pb-4 px-1 font-medium text-sm flex items-center space-x-2 ${
                        activeTab === tab.key
                          ? 'text-blue-600 border-b-2 border-blue-600'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      <tab.icon className="w-4 h-4" />
                      <span>{tab.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Tab Content */}
              {activeTab === 'profile' && <ProfileTab />}
              {activeTab === 'schedule' && <ScheduleTab />}
              {activeTab === 'settings' && <SettingsTab />}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Profile; 