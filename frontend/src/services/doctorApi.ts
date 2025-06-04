import api from './api';

// Doctor interfaces
export interface Doctor {
  id: number;
  name: string;
  email: string;
  phone: string;
  specialty: string;
  experience: string;
  education: string;
  bio: string;
  avatar: string;
  license_number: string;
  address: string;
  date_of_birth: string;
  gender: string;
  status: 'active' | 'on_leave' | 'inactive';
  certifications: string;
  working_hours: string;
  consultation_price: number;
  patient_count: number;
  appointment_count: number;
  created_at: string;
  updated_at: string;
}

export interface CreateDoctorRequest {
  name: string;
  email: string;
  phone: string;
  specialty: string;
  experience?: string;
  education?: string;
  bio?: string;
  avatar?: string;
  license_number: string;
  address?: string;
  date_of_birth?: string;
  gender?: string;
  status?: 'active' | 'on_leave' | 'inactive';
  certifications?: string;
  working_hours?: string;
  consultation_price?: number;
}

export interface UpdateDoctorRequest extends CreateDoctorRequest {
  id: number;
}

export interface DoctorFilter {
  search?: string;
  specialty?: string;
  status?: string;
  limit?: number;
  offset?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  count?: number;
}

// Doctor API service
export const doctorApi = {
  // Get all doctors with filtering
  getDoctors: async (filter?: DoctorFilter): Promise<ApiResponse<Doctor[]>> => {
    try {
      const params = new URLSearchParams();
      
      if (filter?.search) params.append('search', filter.search);
      if (filter?.specialty) params.append('specialty', filter.specialty);
      if (filter?.status) params.append('status', filter.status);
      if (filter?.limit) params.append('limit', filter.limit.toString());
      if (filter?.offset) params.append('offset', filter.offset.toString());
      if (filter?.sort_by) params.append('sort_by', filter.sort_by);
      if (filter?.sort_order) params.append('sort_order', filter.sort_order);

      const response = await api.get(`/doctors?${params.toString()}`);
      return response.data;
    } catch (error: any) {
      console.error('Error fetching doctors:', error);
      return {
        success: false,
        error: error.response?.data?.error || 'Failed to fetch doctors'
      };
    }
  },

  // Get doctor by ID
  getDoctor: async (id: number): Promise<ApiResponse<Doctor>> => {
    try {
      const response = await api.get(`/doctors/${id}`);
      return response.data;
    } catch (error: any) {
      console.error('Error fetching doctor:', error);
      return {
        success: false,
        error: error.response?.data?.error || 'Failed to fetch doctor'
      };
    }
  },

  // Create new doctor
  createDoctor: async (doctorData: CreateDoctorRequest): Promise<ApiResponse<Doctor>> => {
    try {
      const response = await api.post('/doctors', doctorData);
      return response.data;
    } catch (error: any) {
      console.error('Error creating doctor:', error);
      return {
        success: false,
        error: error.response?.data?.error || 'Failed to create doctor'
      };
    }
  },

  // Update doctor
  updateDoctor: async (id: number, doctorData: CreateDoctorRequest): Promise<ApiResponse<Doctor>> => {
    try {
      const response = await api.put(`/doctors/${id}`, doctorData);
      return response.data;
    } catch (error: any) {
      console.error('Error updating doctor:', error);
      return {
        success: false,
        error: error.response?.data?.error || 'Failed to update doctor'
      };
    }
  },

  // Delete doctor
  deleteDoctor: async (id: number): Promise<ApiResponse<void>> => {
    try {
      const response = await api.delete(`/doctors/${id}`);
      return response.data;
    } catch (error: any) {
      console.error('Error deleting doctor:', error);
      return {
        success: false,
        error: error.response?.data?.error || 'Failed to delete doctor'
      };
    }
  },

  // Get doctor specialties
  getSpecialties: async (): Promise<ApiResponse<string[]>> => {
    try {
      const response = await api.get('/doctors/specialties');
      return response.data;
    } catch (error: any) {
      console.error('Error fetching specialties:', error);
      return {
        success: false,
        error: error.response?.data?.error || 'Failed to fetch specialties'
      };
    }
  }
}; 