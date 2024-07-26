import React, { useState } from 'react';
import { Box} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

interface CustomRatingProps {
  rating: number;
  setRating: (rating: number) => void;
}

const CustomRating: React.FC<CustomRatingProps> = ({ rating, setRating }) => {
  const [hover, setHover] = useState<number | null>(null);

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      {[1, 2, 3, 4, 5].map((value) => (
        <Box
          key={value}
          sx={{
            cursor: 'pointer',
            color: value <= (hover || rating) ? '#ffb400' : '#ccc',
          }}
          onClick={() => setRating(value)}
          onMouseEnter={() => setHover(value)}
          onMouseLeave={() => setHover(null)}
        >
          {value <= (hover || rating) ? <StarIcon fontSize="large" /> : <StarBorderIcon fontSize="large" />}
        </Box>
      ))}
    </Box>
  );
};

export default CustomRating;
