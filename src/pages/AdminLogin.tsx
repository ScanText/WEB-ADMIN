import React, { useState } from 'react';
import { Button, TextField, Typography, Paper, Box } from '@mui/material';
import { loginAdmin } from '../services/AdminService';

// ✅ Интерфейс администратора
export interface AdminInfo {
  id: number;
  email: string;
  username: string;
  date_registration: string;
  last_login_date: string;
  subscription_status: 'free' | 'plus' | 'premium';  // ✅ исправлено: теперь строка Enum
}

// ✅ Пропсы для компонента
interface AdminLoginProps {
  onLogin: (admin: AdminInfo) => void;
}

// ✅ Компонент входа администратора
const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin }) => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await loginAdmin(login, password); // ответ от API
      const admin: AdminInfo = {
        id: response.id,
        email: response.email,
        username: response.username,
        date_registration: response.date_registration,
        last_login_date: response.last_login_date,
        subscription_status: response.subscription_status as 'free' | 'plus' | 'premium',  // ✅ явное приведение типов
      };
      onLogin(admin);
    } catch (err) {
      setError("❌ Неверный логин или пароль");
    }
  };

  return (
    <Paper elevation={3} sx={{ maxWidth: 400, margin: '100px auto', padding: 4 }}>
      <Typography variant="h5" gutterBottom align="center">🔐 Вход в админпанель</Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          label="Логин"
          fullWidth
          margin="normal"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        />
        <TextField
          label="Пароль"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <Typography color="error" variant="body2">{error}</Typography>}
        <Button variant="contained" fullWidth type="submit" sx={{ mt: 2 }}>
          Войти
        </Button>
      </Box>
    </Paper>
  );
};

export default AdminLogin;
