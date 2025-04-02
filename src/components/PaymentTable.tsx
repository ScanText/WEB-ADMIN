import React from 'react';

interface Payment {
  id: number;
  username: string;
  wallet_address: string;
  date: string;
}

interface PaymentTableProps {
  payments: Payment[];
}

const PaymentTable: React.FC<PaymentTableProps> = ({ payments }) => {
  return (
    <table border={1} style={{ width: '100%', marginTop: 20 }}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Пользователь</th>
          <th>Кошелек</th>
          <th>Дата</th>
        </tr>
      </thead>
      <tbody>
        {payments.map((p) => (
          <tr key={p.id}>
            <td>{p.id}</td>
            <td>{p.username}</td>
            <td>{p.wallet_address}</td>
            <td>{p.date}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PaymentTable;
