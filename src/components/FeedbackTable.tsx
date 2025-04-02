import React, { useState } from 'react';
import positive from '../data/positive_reviews.json';
import neutral from '../data/neutral_reviews.json';
import negative from '../data/negative_reviews.json';
import { Box, Button, Typography, Card, CardContent } from '@mui/material';

type Feedback = {
  email: string;
  date: string;
  review: string;
  service: string;
};

const Feedbacks: React.FC = () => {
  const [category, setCategory] = useState<'positive' | 'neutral' | 'negative'>('positive');

  const getCurrentData = (): Feedback[] => {
    switch (category) {
      case 'neutral': return neutral;
      case 'negative': return negative;
      default: return positive;
    }
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>Отзывы</Typography>

      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <Button variant={category === 'positive' ? 'contained' : 'outlined'} onClick={() => setCategory('positive')}>
          👍 Положительные
        </Button>
        <Button variant={category === 'neutral' ? 'contained' : 'outlined'} onClick={() => setCategory('neutral')}>
          😐 Нейтральные
        </Button>
        <Button variant={category === 'negative' ? 'contained' : 'outlined'} onClick={() => setCategory('negative')}>
          👎 Отрицательные
        </Button>
      </Box>

      {getCurrentData().map((feedback, index) => (
        <Card key={index} sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="subtitle2" color="textSecondary">
              {feedback.email} — {feedback.date}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Сервис:</strong> {feedback.service}
            </Typography>
            <Typography>{feedback.review}</Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default Feedbacks;
