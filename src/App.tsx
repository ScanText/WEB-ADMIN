import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Payments from './pages/Payments';
import Feedbacks from './pages/Feedbacks';
import AdminLogin, { AdminInfo } from './pages/AdminLogin';
import { Box, Typography } from '@mui/material';

const App: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [adminInfo, setAdminInfo] = useState<AdminInfo | null>(null);
  const [selectedPage, setSelectedPage] = useState<'payments' | 'feedbacks'>('payments');

  const handleLogin = (admin: AdminInfo) => {
    setLoggedIn(true);
    setAdminInfo(admin);
  };

  if (!loggedIn) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar onSelect={(page) => setSelectedPage(page as 'payments' | 'feedbacks')} />

      <Box component="main" sx={{ flexGrow: 1, p: 4 }}>
        {/* 👤 Информация о пользователе */}
        {adminInfo && (
          <Box mb={4}>
            <Typography variant="h6" gutterBottom>👤 Информация о пользователе</Typography>
            <ul style={{ lineHeight: '1.8', paddingLeft: '1rem' }}>
              <li><strong>ID:</strong> {adminInfo.id}</li>
              <li><strong>E-mail:</strong> {adminInfo.email}</li>
              <li><strong>Login:</strong> {adminInfo.login}</li>
              <li><strong>Password:</strong> {adminInfo.password}</li>
              <li><strong>Date registration:</strong> {adminInfo.date_registration}</li>
              <li><strong>Last login date:</strong> {adminInfo.last_login_date}</li>
              <li><strong>Subscription status:</strong> {adminInfo.subscription_status ? 'Активна' : 'Неактивна'}</li>
            </ul>
          </Box>
        )}

        {/* 📄 Содержимое страниц */}
        {selectedPage === 'payments' && <Payments />}
        {selectedPage === 'feedbacks' && <Feedbacks />}
      </Box>
    </div>
  );
};

export default App;
