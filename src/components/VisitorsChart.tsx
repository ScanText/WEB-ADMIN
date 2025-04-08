import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import users from '../data/users.json';

const COLORS = ['#2196f3', '#9e9e9e'];

const VisitorsChart: React.FC = () => {
  const subscribed = users.filter(u => u.subscription_status).length;
  const notSubscribed = users.length - subscribed;

  const data = [
    { name: 'С подпиской', value: subscribed },
    { name: 'Без подписки', value: notSubscribed },
  ];

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
          <Cell key={`cell-${index}`} fill={COLORS[index]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
};

export default VisitorsChart;
