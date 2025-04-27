import React, { useEffect, useState } from 'react';
import {
  Table, TableHead, TableRow, TableCell,
  TableBody, Paper, Typography, TableContainer, Select, MenuItem, Chip
} from '@mui/material';
import { Payment } from '../types/Payment';
import { updateUserSubscription } from '../services/AdminService';
import axios from 'axios';  

interface PaymentsTableProps {
  adminId: number; 
}

const PaymentsTable: React.FC<PaymentsTableProps> = ({ adminId }) => {
  const [payments, setPayments] = useState<Payment[]>([]);

  useEffect(() => {
    if (adminId) {
      axios.get('http://localhost:8000/payment/all')
      .then(res => {
        const fixedData = res.data.map((payment: any) => ({
          ...payment,
          subscription_status: (payment.subscription_status || 'free') as 'free' | 'plus' | 'premium',
        }));
        setPayments(fixedData);
      })
        .catch(err => console.error('Ошибка загрузки платежей:', err));
    }
  }, [adminId]);

  const handleSubscriptionChange = (paymentId: number, userId: number, newStatus: string) => {
    const updatedPayments = payments.map((p) =>
      p.id === paymentId ? { ...p, subscription_status: newStatus as 'free' | 'plus' | 'premium' } : p
    );
    setPayments(updatedPayments);

    updateUserSubscription(userId, newStatus)
      .then(() => console.log(`✅ Подписка пользователя ${userId} обновлена на ${newStatus}`))
      .catch((error) => console.error('❌ Ошибка при обновлении подписки:', error));
  };

  return (
    <div>
      <Typography variant="h5" gutterBottom>💸 История платежей</Typography>

      <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Пользователь (ID)</TableCell>
              <TableCell>Подписка</TableCell>
              <TableCell>Метод оплаты</TableCell>
              <TableCell>Сумма</TableCell>
              <TableCell>Статус</TableCell>
              <TableCell>Транзакция</TableCell>
              <TableCell>Дата</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {payments.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell>{payment.id}</TableCell>
                <TableCell>{payment.user_id}</TableCell>
                <TableCell>
                  <Select
                    size="small"
                    value={payment.subscription_status || 'free'}
                    onChange={(e) => handleSubscriptionChange(payment.id, payment.user_id, e.target.value)}
                    variant="standard"
                    disableUnderline
                    sx={{ minWidth: 140 }}
                  >
                    <MenuItem value="free">Бесплатная</MenuItem>
                    <MenuItem value="plus">Plus (99 грн)</MenuItem>
                    <MenuItem value="premium">Premium (199 грн)</MenuItem>
                  </Select>
                </TableCell>
                <TableCell>{payment.method || '—'}</TableCell>
                <TableCell>{payment.amount !== null ? `${payment.amount} ${payment.currency}` : '—'}</TableCell>
                <TableCell>
                  {payment.status === 'success' ? (
                    <Chip label="Успешно" color="success" size="small" />
                  ) : payment.status === 'pending' ? (
                    <Chip label="Ожидание" color="warning" size="small" />
                  ) : (
                    <Chip label="Ошибка" color="error" size="small" />
                  )}
                </TableCell>
                <TableCell>{payment.transaction_id || '—'}</TableCell>
                <TableCell>{new Date(payment.timestamp).toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default PaymentsTable;
