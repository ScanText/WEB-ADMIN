import axios from 'axios';
import { AdminInfo } from '../pages/AdminLogin';

const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000';

// ✅ Вход администратора
export const loginAdmin = async (login: string, password: string): Promise<AdminInfo> => {
  const response = await axios.post(`${API_URL}/admin/login`, {
    username: login,  // 👈 обязательно "login", не "username"
    password,
  });
  return response.data;
};

// 📊 Статистика загрузок
export const fetchUploadStats = async (adminId: number): Promise<{ upload_count: number }> => {
  const response = await axios.get(`${API_URL}/admin/${adminId}/stats`);
  return response.data;
};

// 📋 Все админы 
export const getAllAdmins = async () => {
  const response = await axios.get(`${API_URL}/admin/all`);
  return response.data;
};

export const getPayments = async () => {
  const response = await axios.get(`${API_URL}/admin/payments/`);
  return response.data;
};