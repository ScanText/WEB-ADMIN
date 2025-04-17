import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import users from '../data/users.json';

const COLORS = ['#4caf50', '#f44336'];

const VisitorsChart: React.FC = () => {
  const subscribed = users.filter(u => u.subscription_status).length;
  const notSubscribed = users.length - subscribed;

  const data = [
    { name: 'С подпиской', value: subscribed },
    { name: 'Без подписки', value: notSubscribed },
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={50}
          outerRadius={100}
          paddingAngle={5}
          dataKey="value"
          label={({ name, percent }) =>
            `${name} (${(percent * 100).toFixed(0)}%)`
          }
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value: number) => `${value} пользователей`} />
        <Legend verticalAlign="bottom" />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default VisitorsChart;
