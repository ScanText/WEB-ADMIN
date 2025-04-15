import React, { useEffect, useState } from 'react';
import {
  Table, TableHead, TableRow, TableCell,
  TableBody, Paper, Typography, TableContainer
} from '@mui/material';
import { getPayments } from '../services/AdminService';

interface Payment {
  id: number;
  wallet_address: string;
  amount: number | null;
  status: string | null;
  timestamp: string;
  user: {
    id: number;
    username: string;
  };
}

const Payments: React.FC = () => {
  const [payments, setPayments] = useState<Payment[]>([]);

  useEffect(() => {
    getPayments()
      .then((data) => setPayments(data))
      .catch((err) => console.error('❌ Ошибка загрузки платежей:', err));
  }, []);

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        💸 История платежей
      </Typography>

      <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Имя пользователя</TableCell>
              <TableCell>Кошелёк</TableCell>
              <TableCell>Сумма</TableCell>
              <TableCell>Статус</TableCell>
              <TableCell>Дата</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {payments.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell>{payment.id}</TableCell>
                <TableCell>{payment.user?.username || '—'}</TableCell>
                <TableCell>{payment.wallet_address || '—'}</TableCell>
                <TableCell>{payment.amount !== null ? `${payment.amount} UAH` : '—'}</TableCell>
                <TableCell>{payment.status || 'не указан'}</TableCell>
                <TableCell>{new Date(payment.timestamp).toLocaleString()}</TableCell>
              </TableRow>
            ))}
            {payments.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  Нет данных о платежах
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Payments;
