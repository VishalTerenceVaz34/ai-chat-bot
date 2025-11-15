import create from 'zustand';
import api from '../api/axios';

export const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem('token'),
  isAuthenticated: !!localStorage.getItem('token'),

  register: async (username, email, password) => {
    const response = await api.post('/auth/register', {
      username,
      email,
      password
    });
    const { token, user } = response.data;
    localStorage.setItem('token', token);
    set({ user, token, isAuthenticated: true });
    return user;
  },

  login: async (email, password) => {
    const response = await api.post('/auth/login', {
      email,
      password
    });
    const { token, user } = response.data;
    localStorage.setItem('token', token);
    set({ user, token, isAuthenticated: true });
    return user;
  },

  checkAuth: async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const response = await api.get('/auth/me');
        set({ user: response.data, isAuthenticated: true });
      }
    } catch (error) {
      localStorage.removeItem('token');
      set({ user: null, token: null, isAuthenticated: false });
    }
  },

  updateProfile: async (updates) => {
    const response = await api.put('/auth/profile', updates);
    set({ user: response.data });
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
    set({ user: null, token: null, isAuthenticated: false });
  }
}));
