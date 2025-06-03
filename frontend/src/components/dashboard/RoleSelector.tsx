import React from 'react';
import { User, Users, Briefcase, UserCog } from 'lucide-react';

interface RoleSelectorProps {
  selectedRole: 'admin' | 'doctor' | 'staff' | 'patient';
  onRoleChange: (role: 'admin' | 'doctor' | 'staff' | 'patient') => void;
}

const RoleSelector: React.FC<RoleSelectorProps> = ({ selectedRole, onRoleChange }) => {
  const roles = [
    {
      id: 'admin',
      label: 'Quản trị viên',
      icon: UserCog,
      color: 'bg-red-600',
      hoverColor: 'hover:bg-red-500',
      selectedColor: 'bg-red-500',
      description: 'Quản lý toàn bộ hệ thống'
    },
    {
      id: 'doctor',
      label: 'Bác sĩ',
      icon: User,
      color: 'bg-blue-600',
      hoverColor: 'hover:bg-blue-500',
      selectedColor: 'bg-blue-500',
      description: 'Khám và điều trị bệnh nhân'
    },
    {
      id: 'staff',
      label: 'Nhân viên',
      icon: Briefcase,
      color: 'bg-green-600',
      hoverColor: 'hover:bg-green-500',
      selectedColor: 'bg-green-500',
      description: 'Hỗ trợ vận hành bệnh viện'
    },
    {
      id: 'patient',
      label: 'Bệnh nhân',
      icon: Users,
      color: 'bg-purple-600',
      hoverColor: 'hover:bg-purple-500',
      selectedColor: 'bg-purple-500',
      description: 'Đặt lịch và xem kết quả khám'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {roles.map(role => (
        <button
          key={role.id}
          onClick={() => onRoleChange(role.id as any)}
          className={`flex items-center p-4 rounded-lg border-2 transition-all ${
            selectedRole === role.id
              ? `${role.selectedColor} text-white border-transparent`
              : `bg-white border-gray-200 ${role.hoverColor} hover:text-white`
          }`}
        >
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-4 ${
            selectedRole === role.id ? 'bg-white/20' : role.color
          }`}>
            <role.icon className={`w-6 h-6 ${
              selectedRole === role.id ? 'text-white' : 'text-white'
            }`} />
          </div>
          <div className="text-left">
            <h3 className="font-semibold">{role.label}</h3>
            <p className={`text-sm ${selectedRole === role.id ? 'text-white/80' : 'text-gray-600'}`}>
              {role.description}
            </p>
          </div>
        </button>
      ))}
    </div>
  );
};

export default RoleSelector; 