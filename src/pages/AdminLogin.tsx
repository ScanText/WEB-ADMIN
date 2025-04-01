// src/pages/AdminLogin.tsx
import React, { useState } from 'react';
import { Button, TextField, Typography, Paper, Box } from '@mui/material';

export interface AdminInfo {
  id: number;
  email: string;
  login: string;
  password: string;
  date_registration: string;
  last_login_date: string;
  subscription_status: boolean;
}

interface AdminLoginProps {
  onLogin: (admin: AdminInfo) => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin }) => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (login === 'admin' && password === 'admin123') {
      // Мок-данные администратора
      onLogin({
        id: 1,
        email: 'admin@example.com',
        login: 'admin',
        password: 'admin123',
        date_registration: '2024-01-01',
        last_login_date: '2025-04-02',
        subscription_status: true,
      });
    } else {
      alert('Неверный логин или пароль');
    }
  };

  return (
    <Paper elevation={3} sx={{ maxWidth: 400, margin: '100px auto', padding: 4 }}>
      <Typography variant="h5" gutterBottom align="center">🔐 Вход в админпанель</Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField label="Логин" fullWidth margin="normal" value={login} onChange={(e) => setLogin(e.target.value)} />
        <TextField label="Пароль" type="password" fullWidth margin="normal" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button variant="contained" fullWidth type="submit" sx={{ mt: 2 }}>
          Войти
        </Button>
      </Box>
    </Paper>
  );
};

export default AdminLogin;
