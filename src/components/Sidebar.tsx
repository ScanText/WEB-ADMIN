import React from 'react';
import { Box, Button, Stack } from '@mui/material';

const Sidebar: React.FC<{
  onSelect: (page: 'payments' | 'feedbacks' | 'users') => void;
}> = ({ onSelect }) => {
  return (
    <Box
      sx={{
        width: 240,
        height: '100vh',
        backgroundColor: '#fafafa',
        padding: 3,
        boxShadow: 3,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <Stack spacing={2} alignItems="center">
        <Button
          fullWidth
          variant="outlined"
          onClick={() => onSelect('users')}
          sx={{ textTransform: 'none' }}
        >
          👥 Пользователи
        </Button>

        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={() => onSelect('payments')}
          sx={{ textTransform: 'none' }}
        >
          💰 Оплаты
        </Button>

        <Button
          fullWidth
          variant="contained"
          color="secondary"
          onClick={() => onSelect('feedbacks')}
          sx={{ textTransform: 'none' }}
        >
          📝 Отзывы
        </Button>
      </Stack>
    </Box>
  );
};

export default Sidebar;

