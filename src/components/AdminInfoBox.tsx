import React from 'react';
import { AdminInfo } from '../pages/AdminLogin';

interface AdminInfoBoxProps {
  admin: AdminInfo;
  uploadCount: number;
}

const AdminInfoBox: React.FC<AdminInfoBoxProps> = ({ admin, uploadCount }) => {
  return (
    <div style={styles.container}>
      <h3 style={styles.title}>🧑‍💼 Информация об администраторе</h3>
      <p><strong>ID:</strong> {admin.id}</p>
      <p><strong>Email:</strong> {admin.email}</p>
      <p><strong>Логин:</strong> {admin.username}</p>
      <p><strong>Дата регистрации:</strong> {new Date(admin.date_registration).toLocaleString()}</p>
      <p><strong>Последний вход:</strong> {new Date(admin.last_login_date).toLocaleString()}</p>
      <p><strong>Подписка:</strong> {admin.subscription_status}</p>
      <p><strong>Загрузок:</strong> {uploadCount}</p>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    marginBottom: 20,
  },
  title: {
    marginBottom: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
};

export default AdminInfoBox;
