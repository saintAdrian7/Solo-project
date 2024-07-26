import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Paper } from '@mui/material';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext/AuthContextConsts';
import CustomRating from './CustomRating';

interface ReviewFormProps {
  productId: string | undefined;
  onReviewSubmit: () => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ productId, onReviewSubmit }) => {
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const { state } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      setError('Please provide a rating');
      return;
    }

    try {
      await axios.post(`http://localhost:5000/api/reviews/${productId}`, {
        rating,
        comment,
        userId: state.loggedInUser?._id,
      });
      setRating(0);
      setComment('');
      setError(null);
      onReviewSubmit();
    } catch (err) {
      setError('Failed to submit review. Please try again.');
      console.error(err);
    }
  };

  return (
    <Paper elevation={3} sx={{ padding: 3, marginTop: 4 }}>
      <Box component="form" onSubmit={handleSubmit}>
        <Typography variant="h6" gutterBottom>
          Write a Review
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Typography variant="body1" sx={{ mr: 2 }}>
            Your Rating:
          </Typography>
          <CustomRating rating={rating} setRating={setRating} />
        </Box>
        <TextField
          label="Comment"
          multiline
          rows={4}
          fullWidth
          variant="outlined"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button type="submit" variant="contained" color="primary">
          Submit Review
        </Button>
      </Box>
    </Paper>
  );
};

export default ReviewForm;
