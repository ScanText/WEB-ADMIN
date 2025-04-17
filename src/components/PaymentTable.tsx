import React from 'react';

interface Payment {
  id: number;
  user_login?: string | null;
  wallet_address: string;
  amount?: number;
  status?: string;
  reference?: string | null;
  created_at: string;
}

interface PaymentTableProps {
  payments: Payment[];
}

const PaymentTable: React.FC<PaymentTableProps> = ({ payments }) => {
  return (
    <table border={1} style={{ width: '100%', marginTop: 20, borderCollapse: 'collapse' }}>
      <thead>
        <tr style={{ background: '#f0f0f0' }}>
          <th>ID</th>
          <th>Логин</th>
          <th>Кошелёк</th>
          <th>Сумма</th>
          <th>Статус</th>
          <th>Reference</th>
          <th>Дата</th>
        </tr>
      </thead>
      <tbody>
        {payments.map((p) => (
          <tr key={p.id}>
            <td>{p.id}</td>
            <td>{p.user_login || '—'}</td>
            <td>{p.wallet_address}</td>
            <td>{p.amount ?? '—'} ₴</td>
            <td>{p.status ?? '—'}</td>
            <td>{p.reference || '—'}</td>
            <td>{new Date(p.created_at).toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PaymentTable;
