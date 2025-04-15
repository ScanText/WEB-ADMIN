import React from 'react';
import UsersList from '../components/UsersList';

const Users: React.FC = () => {
  return (
    <div style={{ padding: 20 }}>
      <h2>👥 Зарегистрированные пользователи</h2>
      <UsersList />
    </div>
  );
};

export default Users;
