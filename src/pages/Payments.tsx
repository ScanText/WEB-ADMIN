import React, { useEffect, useState } from 'react';
import {
  Table, TableHead, TableRow, TableCell,
  TableBody, Paper, Typography, TableContainer
} from '@mui/material';
import { getAllPayments } from '../services/AdminService';
import { Payment } from '../types/Payment';
import { AdminInfo } from './AdminLogin';

const Payments: React.FC<{ admin: AdminInfo }> = ({ admin }) => {
  const [payments, setPayments] = useState<Payment[]>([]);

  useEffect(() => {
    getAllPayments()
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
              <TableCell>Пользователь (ID)</TableCell>
              <TableCell>Метод оплаты</TableCell>
              <TableCell>Сумма</TableCell>
              <TableCell>Статус</TableCell>
              <TableCell>Транзакция</TableCell>
              <TableCell>Дата</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {payments.length > 0 ? payments.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell>{payment.id}</TableCell>
                <TableCell>{payment.user_id}</TableCell>
                <TableCell>{payment.method || '—'}</TableCell>
                <TableCell>{payment.amount !== null ? `${payment.amount} ${payment.currency}` : '—'}</TableCell>
                <TableCell>
                  {payment.status === 'success' ? (
                    <span style={{ color: 'green', fontWeight: 'bold' }}>Успешно</span>
                  ) : payment.status === 'pending' ? (
                    <span style={{ color: 'orange', fontWeight: 'bold' }}>Ожидание</span>
                  ) : (
                    <span style={{ color: 'red', fontWeight: 'bold' }}>Ошибка</span>
                  )}
                </TableCell>
                <TableCell>{payment.transaction_id || '—'}</TableCell>
                <TableCell>{new Date(payment.timestamp).toLocaleString()}</TableCell>
              </TableRow>
            )) : (
              <TableRow>
                <TableCell colSpan={7} align="center">
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
