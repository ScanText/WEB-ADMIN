import React from 'react';
import data from '../data/payments_history.json';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Typography,
  TableContainer
} from '@mui/material';

interface Payment {
  id: number;
  username: string;
  wallet_address: string;
  amount: number;
  timestamp: string;
}

const Payments: React.FC = () => {
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
              <TableCell>Дата</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((payment: Payment) => (
              <TableRow key={payment.id}>
                <TableCell>{payment.id}</TableCell>
                <TableCell>{payment.username}</TableCell>
                <TableCell>{payment.wallet_address}</TableCell>
                <TableCell>{payment.amount} UAH</TableCell>
                <TableCell>{new Date(payment.timestamp).toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Payments;
