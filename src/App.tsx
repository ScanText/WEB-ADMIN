import React, { useEffect, useState } from 'react';
import Users from './pages/Users';

import Sidebar from './components/Sidebar';
import PaymentsTable from './components/PaymentTable';
import Feedbacks from './pages/Feedbacks';
import AdminLogin, { AdminInfo } from './pages/AdminLogin';
import { Box, Typography, Button, CircularProgress } from '@mui/material';
import axios from 'axios';
import FeedbackChart from './components/FeedbackChart';
import VisitorsChart from './components/VisitorsChart';
import LoginChart from './components/LoginChart';
import SubscriptionChart from './components/SubscriptionChart';
import RevenueChart from './components/RevenueChart';
import PaymentsChart from './components/PaymentsChart';
import StatusBarChart from './components/StatusBarChart';
import {
  Card, CardContent, CardHeader, Divider,
  IconButton, Collapse
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { fetchUploadStats } from './services/AdminService';
import { Payment } from './types/Payment';

const App: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [adminInfo, setAdminInfo] = useState<AdminInfo | null>(null);
  const [selectedPage, setSelectedPage] = useState<'payments' | 'feedbacks' | 'users'>('payments');
  const [uploadCount, setUploadCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const [adminOpen, setAdminOpen] = useState(true);
  const [payments, setPayments] = useState<Payment[]>([]);

  useEffect(() => {
    if (adminInfo) {
      axios.get('http://localhost:8000/payment/all')
        .then(res => setPayments(res.data))
        .catch(err => console.error('Ошибка загрузки платежей:', err));
    }
  }, [adminInfo]);

  useEffect(() => {
    const stored = localStorage.getItem("adminInfo");
    if (stored) {
      setAdminInfo(JSON.parse(stored));
      setLoggedIn(true);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (adminInfo) {
      fetchUploadStats(adminInfo.id)
        .then((res: { upload_count: number }) => setUploadCount(res.upload_count))
        .catch((err: unknown) => {
          console.warn("⚠️ Не удалось получить статистику загрузок:", err);
          setUploadCount(0);
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
      <Sidebar onSelect={(page) => setSelectedPage(page as 'payments' | 'feedbacks' | 'users')} />

      <Box component="main" sx={{ flexGrow: 1, p: 4 }}>
        {adminInfo && (
          <>
            {/* 🧑‍💼 Информация об администраторе */}
            <Card sx={{ maxWidth: 460, mb: 4 }}>
              <CardHeader
                title="🧑‍💼 Информация об администраторе"
                action={
                  <IconButton onClick={() => setAdminOpen(prev => !prev)}>
                    {adminOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                  </IconButton>
                }
              />
              <Collapse in={adminOpen} timeout="auto" unmountOnExit>
                <Divider />
                <CardContent>
                  <ul style={{ lineHeight: '1.8', paddingLeft: '1rem', margin: 0 }}>
                    <li>📎 <strong>ID:</strong> {adminInfo.id}</li>
                    <li>📧 <strong>E-mail:</strong> {adminInfo.email}</li>
                    <li>🔐 <strong>Login:</strong> {adminInfo.username}</li>
                    <li>📅 <strong>Дата регистрации:</strong> {adminInfo.date_registration}</li>
                    <li>🕒 <strong>Последний вход:</strong> {adminInfo.last_login_date}</li>
                    <li>
                      {adminInfo.subscription_status ? '✅ Подписка активна' : '❌ Подписка неактивна'}
                    </li>
                    <li>📸 <strong>Загрузок:</strong> {uploadCount}</li>
                  </ul>

                  <Button
                    variant="outlined"
                    color="error"
                    onClick={handleLogout}
                    sx={{ mt: 3 }}
                    fullWidth
                  >
                    🔓 Выйти из панели
                  </Button>
                </CardContent>
              </Collapse>
            </Card>

            {/* 📊 Блок с графиками */}
            <Box display="flex" gap={3} flexWrap="wrap" mb={4}>
              <Card sx={{ minWidth: 300, flex: '1 1 300px' }}>
                <CardContent>
                  <Typography align="center" variant="subtitle1" gutterBottom>📊 Подписки по типу</Typography>
                  <SubscriptionChart payments={payments} />
                </CardContent>
              </Card>

              <Card sx={{ minWidth: 300, flex: '1 1 300px' }}>
                <CardContent>
                  <Typography align="center" variant="subtitle1" gutterBottom>💰 Сумма по подпискам</Typography>
                  <RevenueChart payments={payments} />
                </CardContent>
              </Card>

              <Card sx={{ minWidth: 300, flex: '1 1 300px' }}>
                <CardContent>
                  <Typography align="center" variant="subtitle1" gutterBottom>👤 Подписки по логинам</Typography>
                  <LoginChart payments={payments} />
                </CardContent>
              </Card>

              <Card sx={{ minWidth: 300, flex: '1 1 300px' }}>
                <CardContent>
                  <Typography align="center" variant="subtitle1" gutterBottom>📦 Статусы платежей</Typography>
                  <StatusBarChart payments={payments} />
                </CardContent>
              </Card>

              <Card sx={{ minWidth: 300, flex: '1 1 300px' }}>
                <CardContent>
                  <Typography align="center" variant="subtitle1" gutterBottom>📍 Платежи по кошелькам</Typography>
                  <PaymentsChart payments={payments} />
                </CardContent>
              </Card>

              <Card sx={{ minWidth: 300, flex: '1 1 300px' }}>
                <CardContent>
                  <Typography align="center" variant="subtitle1" gutterBottom>👥 Посетители</Typography>
                  <VisitorsChart />
                </CardContent>
              </Card>

              <Card sx={{ minWidth: 300, flex: '1 1 300px' }}>
                <CardContent>
                  <Typography align="center" variant="subtitle1" gutterBottom>📊 Отзывы</Typography>
                  <FeedbackChart />
                </CardContent>
              </Card>
            </Box>
          </>
        )}

        {/* Страницы */}
        {selectedPage === 'users' && <Users />}
        {selectedPage === 'payments' && adminInfo && <PaymentsTable adminId={adminInfo.id} />}

        {selectedPage === 'feedbacks' && <Feedbacks />}
      </Box>
    </div>
  );
};

export default App;
