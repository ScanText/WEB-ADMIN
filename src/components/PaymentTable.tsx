import React from 'react';

const PaymentTable: React.FC = () => {
  const dummyData = [
    { id: 1, username: 'pavlova', wallet: '0x123...', date: '2024-04-01' },
    { id: 2, username: 'borodina', wallet: '0xabc...', date: '2024-04-02' }
  ];

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
        {dummyData.map((p) => (
          <tr key={p.id}>
            <td>{p.id}</td>
            <td>{p.username}</td>
            <td>{p.wallet}</td>
            <td>{p.date}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PaymentTable;