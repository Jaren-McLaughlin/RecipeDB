
import React from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Box,
  Divider
} from '@mui/material';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import ShareIcon from '@mui/icons-material/Share';

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
        <div>
          <Typography variant="body1">{stats.favoriteCount}</Typography>
          <Typography variant="caption">Favorites</Typography>
        </div>
        <div>
          <Typography variant="body1">{stats.sharedCount}</Typography>
          <Typography variant="caption">Shared</Typography>
        </div>
      </Box>
    </Paper>
  );
}

export default UserStatsCard;