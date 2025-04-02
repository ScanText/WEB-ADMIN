import React, { useEffect, useState } from 'react';
import Sidebar from './components/Sidebar';
import Payments from './pages/Payments';
import Feedbacks from './pages/Feedbacks';
import AdminLogin, { AdminInfo } from './pages/AdminLogin';
import { Box, Typography, Button, CircularProgress } from '@mui/material';
import axios from 'axios';

const App: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [adminInfo, setAdminInfo] = useState<AdminInfo | null>(null);
  const [selectedPage, setSelectedPage] = useState<'payments' | 'feedbacks'>('payments');
  const [uploadCount, setUploadCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true); // 👈 добавим флаг загрузки

  useEffect(() => {
    const storedAdmin = localStorage.getItem("adminInfo");
    if (storedAdmin) {
      setAdminInfo(JSON.parse(storedAdmin));
      setLoggedIn(true);
    }
    setIsLoading(false); // ✅ установка флага после чтения из localStorage
  }, []);

  useEffect(() => {
    if (adminInfo) {
      axios
        .get(`https://api.example.com/admin/${adminInfo.id}/stats`)
        .then(res => setUploadCount(res.data.upload_count))
        .catch(err => {
          console.warn("⚠️ Не удалось получить статистику загрузок:", err);
          setUploadCount(0); // по умолчанию
        });
    }
  }, [adminInfo]);

  const handleLogout = () => {
    localStorage.removeItem("adminInfo");
    setAdminInfo(null);
    setLoggedIn(false);
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!loggedIn) {
    return <AdminLogin onLogin={(admin) => {
      setLoggedIn(true);
      setAdminInfo(admin);
      localStorage.setItem("adminInfo", JSON.stringify(admin));
    }} />;
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar onSelect={(page) => setSelectedPage(page as 'payments' | 'feedbacks')} />

      <Box component="main" sx={{ flexGrow: 1, p: 4 }}>
        {adminInfo && (
          <Box mb={4}>
            <Typography variant="h6" gutterBottom>👤 Информация о пользователе</Typography>
            <ul style={{ lineHeight: '1.8', paddingLeft: '1rem' }}>
              <li><strong>ID:</strong> {adminInfo.id}</li>
              <li><strong>E-mail:</strong> {adminInfo.email}</li>
              <li><strong>Login:</strong> {adminInfo.login}</li>
              <li><strong>Date registration:</strong> {adminInfo.date_registration}</li>
              <li><strong>Last login date:</strong> {adminInfo.last_login_date}</li>
              <li><strong>Subscription status:</strong> {adminInfo.subscription_status ? 'Активна' : 'Неактивна'}</li>
              <li><strong>📸 Загрузок:</strong> {uploadCount}</li>
            </ul>
            <Button variant="outlined" color="error" onClick={handleLogout} sx={{ mt: 2 }}>
              Выйти
            </Button>
          </Box>
        )}

        {selectedPage === 'payments' && <Payments />}
        {selectedPage === 'feedbacks' && <Feedbacks />}
      </Box>
    </div>
  );
};

export default App;
