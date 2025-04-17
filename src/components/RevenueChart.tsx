import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

interface Payment {
  amount: number;
  status: string;
}

interface RevenueChartProps {
  payments: Payment[];
}

const COLORS = ['#4caf50', '#2196f3', '#9e9e9e'];

const RevenueChart: React.FC<RevenueChartProps> = ({ payments }) => {
  const paid = payments.filter(p => p.status === 'paid');

  const plusRevenue = paid.filter(p => p.amount === 200).reduce((sum, p) => sum + p.amount, 0);
  const premiumRevenue = paid.filter(p => p.amount === 400).reduce((sum, p) => sum + p.amount, 0);
  const otherRevenue = paid
    .filter(p => p.amount !== 200 && p.amount !== 400)
    .reduce((sum, p) => sum + p.amount, 0);

  const data = [
    { name: 'Plus (200 грн)', value: plusRevenue },
    { name: 'Premium (400 грн)', value: premiumRevenue },
    { name: 'Другое', value: otherRevenue },
  ];

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
      <Tooltip formatter={(value: number) => `${value} грн`} />
      <Legend />
    </PieChart>
  );
};

export default RevenueChart;
