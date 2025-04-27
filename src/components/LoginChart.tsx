import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

interface Payment {
  amount: number;
  status: string;
  user_id: number;
}

interface LoginChartProps {
  payments: Payment[];
}

const COLORS = ['#4caf50', '#2196f3', '#ff9800', '#e91e63', '#9c27b0', '#00bcd4'];

const LoginChart: React.FC<LoginChartProps> = ({ payments }) => {
  const paidPayments = payments.filter(p => p.status === 'success');

  const stats: Record<number, number> = {};
  paidPayments.forEach(p => {
    stats[p.user_id] = (stats[p.user_id] || 0) + 1;
  });

  const data = Object.entries(stats).map(([userId, value]) => ({
    name: `ID ${userId}`,
    value,
  }));

  return (
    <PieChart width={400} height={300}>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        outerRadius={100}
        dataKey="value"
        label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
      >
        {data.map((_, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip formatter={(value: number) => `${value} платежей`} />
      <Legend />
    </PieChart>
  );
};

export default LoginChart;
