import axios from 'axios';
import { AdminInfo } from '../pages/AdminLogin';
import { Payment } from '../types/Payment';

const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000';

// Вход администратора
export const loginAdmin = async (login: string, password: string): Promise<AdminInfo> => {
  const response = await axios.post<AdminInfo>(`${API_URL}/admin/login`, {
    username: login,
    password,
  });
  return response.data;
};

// Статистика загрузок
export const fetchUploadStats = async (adminId: number): Promise<{ upload_count: number }> => {
  const response = await axios.get<{ upload_count: number }>(`${API_URL}/admin/${adminId}/stats`);
  return response.data;
};

// Все админы
export const getAllAdmins = async (): Promise<AdminInfo[]> => {
  const response = await axios.get<AdminInfo[]>(`${API_URL}/admin/all`);
  return response.data;
};

export const getAllPayments = async (): Promise<Payment[]> => {
  const response = await axios.get(`${API_URL}/payment/all`);
  return response.data;
};

// 📢 обновление подписки пользователя
export const updateUserSubscription = async (userId: number, subscriptionStatus: string) => {
  await axios.patch(`${API_URL}/user/update-subscription`, {
    user_id: userId,
    subscription_status: subscriptionStatus,
  });
};