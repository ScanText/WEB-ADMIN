import React from 'react';
import PaymentTable from '../components/PaymentTable';

const Payments: React.FC = () => {
  return (
    <div style={{ padding: 20 }}>
      <h2>💰 История оплат</h2>
      <PaymentTable />
    </div>
  );
};

export default Payments;