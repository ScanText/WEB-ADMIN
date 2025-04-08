import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import payments from '../data/payments_history.json';

const COLORS = ['#ff5722', '#ff9800', '#ffc107', '#795548'];

const PaymentsChart: React.FC = () => {
  const walletStats: Record<string, number> = {};

  payments.forEach(p => {
    walletStats[p.wallet_address] = (walletStats[p.wallet_address] || 0) + 1;
  });

  const data = Object.entries(walletStats).map(([name, value]) => ({ name, value }));

  return (
    <PieChart width={400} height={300}>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        outerRadius={100}
        fill="#8884d8"
        dataKey="value"
        label
      >
        {data.map((_, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
};

export default PaymentsChart;
