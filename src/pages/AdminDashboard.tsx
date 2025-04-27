import React, { useState, useEffect } from 'react';
import { AdminInfo } from './AdminLogin';
import { fetchUploadStats } from '../services/AdminService';
import AdminInfoBox from '../components/AdminInfoBox';
import SubscriptionChart from '../components/SubscriptionChart';
import VisitorsChart from '../components/VisitorsChart';
import PaymentTable from '../components/PaymentTable';
import FeedbackChart from '../components/FeedbackChart';
import { Payment } from '../types/Payment';
import { getAllPayments } from '../services/AdminService';


const AdminDashboard: React.FC<{ admin: AdminInfo }> = ({ admin }) => {
  const [uploadCount, setUploadCount] = useState<number>(0);
  const [payments, setPayments] = useState<Payment[]>([]);

  useEffect(() => {
    async function fetchData() {
      const uploadStats = await fetchUploadStats(admin.id);
      setUploadCount(uploadStats.upload_count);

      getAllPayments()
      .then((data) => setPayments(data))
      .catch((err) => console.error('Ошибка загрузки платежей:', err));

    }
    fetchData();
  }, [admin.id]);

  return (
    <div style={styles.dashboard}>
      <AdminInfoBox admin={admin} uploadCount={uploadCount} />

      <div style={styles.chartsGrid}>
        <SubscriptionChart payments={payments} />
        <VisitorsChart />
        <FeedbackChart />
      </div>

      <div style={styles.paymentsSection}>
      <PaymentTable adminId={admin.id} />

      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  dashboard: {
    padding: '20px',
    fontFamily: 'Segoe UI, sans-serif',
    backgroundColor: '#f8f9fa',
    minHeight: '100vh',
  },
  chartsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '20px',
    marginTop: '30px',
  },
  paymentsSection: {
    marginTop: '40px',
  },
};

export default AdminDashboard;
