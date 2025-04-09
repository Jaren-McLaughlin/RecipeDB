
import React from 'react';
import { 
  Typography, 
  Paper,
  Box,
  Divider
} from '@mui/material';

function UserStatsCard({ stats }) {
  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Recipe Statistics
      </Typography>
      <Divider sx={{ my: 2 }} />
      <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
        <div>
          <Typography variant="body1">{stats.recipeCount}</Typography>
          <Typography variant="caption">Recipes</Typography>
        </div>
      </Box>
    </Paper>
  );
}

export default UserStatsCard;