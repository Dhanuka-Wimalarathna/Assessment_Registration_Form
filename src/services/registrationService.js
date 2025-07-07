import apiClient from '../api/apiClient';
import { API_ENDPOINTS } from '../utils/constants';

export const registrationService = {
  register: async (userData) => {
    try {
      const payload = {
        fullName: userData.fullName,
        email: userData.email,
        phone: userData.phone || undefined,
        password: userData.password
      };

      Object.keys(payload).forEach(key => 
        payload[key] === undefined && delete payload[key]
      );

      console.log('Registering user with payload:', payload);

      const response = await apiClient.post(API_ENDPOINTS.REGISTER, payload);
      
      return {
        success: true,
        data: response.data,
        message: 'Registration successful!'
      };
    } catch (error) {
      console.error('Registration error:', error);
      
      return {
        success: false,
        error: error.message || 'Registration failed. Please try again.',
        data: null
      };
    }
  }
};