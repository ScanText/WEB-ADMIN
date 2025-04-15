  import React, { useState } from 'react';
  import { Button, TextField, Typography, Paper, Box } from '@mui/material';
  import { loginAdmin } from '../services/AdminService';
  
  export interface AdminInfo {
    id: number;
    email: string;
    login: string;
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
    const [error, setError] = useState<string | null>(null);
  
      // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();

  //   if (login === mockAdmin.login && password === mockAdmin.password) {
  //     onLogin({
  //       id: mockAdmin.id,
  //       email: mockAdmin.email,
  //       login: mockAdmin.login,
  //       date_registration: mockAdmin.date_registration,
  //       last_login_date: mockAdmin.last_login_date,
  //       subscription_status: mockAdmin.subscription_status
  //     });
  //   } else {
  //     alert('Неверный логин или пароль');
  //   }
  // };
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        const admin = await loginAdmin(login, password); // ✅ запрос к API
        onLogin(admin);
      } catch (err) {
        setError("❌ Неверный логин или пароль");
      }
    };
  
    return (
      <Paper elevation={3} sx={{ maxWidth: 400, margin: '100px auto', padding: 4 }}>
        <Typography variant="h5" gutterBottom align="center">🔐 Вход в админпанель</Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField label="Логин" fullWidth margin="normal" value={login} onChange={(e) => setLogin(e.target.value)} />
          <TextField label="Пароль" type="password" fullWidth margin="normal" value={password} onChange={(e) => setPassword(e.target.value)} />
          {error && <Typography color="error" variant="body2">{error}</Typography>}
          <Button variant="contained" fullWidth type="submit" sx={{ mt: 2 }}>
            Войти
          </Button>
        </Box>
      </Paper>
    );
  };
  
  export default AdminLogin;
  