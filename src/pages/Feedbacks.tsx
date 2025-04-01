import React from 'react';
import FeedbackTable from '../components/FeedbackTable';

const Feedbacks: React.FC = () => {
  return (
    <div style={{ padding: 20 }}>
      <h2>📝 Отзывы пользователей</h2>
      <FeedbackTable />
    </div>
  );
};

export default Feedbacks;