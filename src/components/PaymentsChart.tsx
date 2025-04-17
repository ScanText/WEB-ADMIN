import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

interface Payment {
  id: number;
  user_login?: string;
  wallet_address: string;
  amount: number;
  status?: string;
  reference?: string;
  created_at: string;
}

interface PaymentsChartProps {
  payments: Payment[];
}

const COLORS = ['#ff5722', '#ff9800', '#4caf50', '#3f51b5', '#9c27b0', '#2196f3'];

const PaymentsChart: React.FC<PaymentsChartProps> = ({ payments }) => {
  const loginStats: Record<string, number> = {};

  payments.forEach(p => {
    const login = p.user_login || 'неизвестно';
    loginStats[login] = (loginStats[login] || 0) + 1;
  });

  const data = Object.entries(loginStats).map(([name, value]) => ({ name, value }));

  return (
    <PieChart width={420} height={300}>
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

export default PaymentsChart;
