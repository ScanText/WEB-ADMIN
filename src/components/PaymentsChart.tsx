import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { Payment } from '../types/Payment';


interface PaymentsChartProps {
  payments: Payment[];
}

const COLORS = ['#ff5722', '#ff9800', '#4caf50', '#3f51b5', '#9c27b0', '#2196f3'];

const PaymentsChart: React.FC<PaymentsChartProps> = ({ payments }) => {
  const methodStats: Record<string, number> = {};

  payments.forEach(p => {
    const method = p.method || 'неизвестно'; 
    methodStats[method] = (methodStats[method] || 0) + 1;
  });

  const data = Object.entries(methodStats).map(([name, value]) => ({ name, value }));

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
