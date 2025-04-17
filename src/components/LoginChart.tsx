import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

interface Payment {
  amount: number;
  status: string;
  user_login: string;
}

interface LoginChartProps {
  payments: Payment[];
}

const COLORS = ['#4caf50', '#2196f3', '#ff9800', '#e91e63', '#9c27b0', '#00bcd4'];

const LoginChart: React.FC<LoginChartProps> = ({ payments }) => {
  const paidPayments = payments.filter(p => p.status === 'paid');

  const stats: Record<string, number> = {};
  paidPayments.forEach(p => {
    if (p.user_login) {
      stats[p.user_login] = (stats[p.user_login] || 0) + 1;
    }
  });

  const data = Object.entries(stats).map(([name, value]) => ({ name, value }));

  return (
    <PieChart width={400} height={300}>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        outerRadius={100}
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

export default LoginChart;
