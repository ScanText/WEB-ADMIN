import React from 'react';

const FeedbackTable: React.FC = () => {
  const dummyFeedback = [
    { id: 1, user: 'pavlova', message: 'Отличный сервис!' },
    { id: 2, user: 'borodina', message: 'Очень удобно.' }
  ];

  return (
    <table border={1} style={{ width: '100%', marginTop: 20 }}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Пользователь</th>
          <th>Отзыв</th>
        </tr>
      </thead>
      <tbody>
        {dummyFeedback.map((fb) => (
          <tr key={fb.id}>
            <td>{fb.id}</td>
            <td>{fb.user}</td>
            <td>{fb.message}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default FeedbackTable;