import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

interface Payment {
  status: string;
}

interface StatusBarChartProps {
  payments: Payment[];
}

const COLORS = {
  paid: '#4caf50',
  pending: '#ff9800',
  failed: '#f44336',
};

const StatusBarChart: React.FC<StatusBarChartProps> = ({ payments }) => {
  const counts: Record<string, number> = { paid: 0, pending: 0, failed: 0 };

  payments.forEach(p => {
    const key = p.status.toLowerCase();
    if (counts.hasOwnProperty(key)) {
      counts[key] += 1;
    }
  });

  const data = Object.entries(counts).map(([status, count]) => ({ status, count }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="status" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" name="Кол-во платежей" fill="#8884d8">
          {data.map((entry, index) => (
           <Cell key={`bar-${index}`} fill={COLORS[entry.status as keyof typeof COLORS] || '#9e9e9e'} />

          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default StatusBarChart;
