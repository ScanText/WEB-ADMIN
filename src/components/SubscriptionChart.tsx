import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

interface Payment {
  amount: number;
  status: string;
}

interface SubscriptionChartProps {
  payments: Payment[];
}

const COLORS = ['#ff9800', '#3f51b5', '#9e9e9e'];

const SubscriptionChart: React.FC<SubscriptionChartProps> = ({ payments }) => {
  const paid = payments.filter(p => p.status === 'success'); 

  const plusCount = paid.filter(p => p.amount === 99).length;
  const premiumCount = paid.filter(p => p.amount === 199).length;
  const otherCount = paid.length - plusCount - premiumCount;

  const data = [
    { name: 'Plus (99 грн)', value: plusCount },
    { name: 'Premium (199 грн)', value: premiumCount },
    { name: 'Другое / прочее', value: otherCount },
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
      <Tooltip />
      <Legend />
    </PieChart>
  );
};

export default SubscriptionChart;
