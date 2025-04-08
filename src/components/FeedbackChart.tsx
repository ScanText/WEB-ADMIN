import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import positive from '../data/positive_reviews.json';
import neutral from '../data/neutral_reviews.json';
import negative from '../data/negative_reviews.json';

const COLORS = ['#4caf50', '#ff9800', '#f44336'];

const FeedbackChart: React.FC = () => {
  const data = [
    { name: 'Положительные', value: positive.length },
    { name: 'Нейтральные', value: neutral.length },
    { name: 'Отрицательные', value: negative.length },
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

export default FeedbackChart;
