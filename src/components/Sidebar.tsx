import React from 'react';
import { Box, Button, Stack } from '@mui/material';

const Sidebar: React.FC<{
  onSelect: (page: 'payments' | 'feedbacks') => void;
}> = ({ onSelect }) => {
  return (
    <Box
      sx={{
        width: 220,
        height: '100vh',
        backgroundColor: '#f5f5f5',
        padding: 2,
        boxShadow: 3,
      }}
    >
      <Stack spacing={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => onSelect('payments')}
        >
          💰 Оплаты
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => onSelect('feedbacks')}
        >
          📝 Отзывы
        </Button>
      </Stack>
    </Box>
  );
};

export default Sidebar;
