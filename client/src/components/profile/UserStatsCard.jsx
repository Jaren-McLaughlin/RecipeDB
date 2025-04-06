
import React from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider
} from '@mui/material';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import ShareIcon from '@mui/icons-material/Share';

function UserStatsCard({ userData }) {
  return (
    <Card sx={{ 
          boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',
          '&:hover': {
            boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',  // Same shadow on hover
            transform: 'none'  // Prevent any transform
          }
        }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Activity Stats
        </Typography>
        
        <List>
          <ListItem>
            <ListItemIcon>
              <RestaurantIcon />
            </ListItemIcon>
            <ListItemText 
              primary="Total Recipes" 
              secondary={userData.recipeCount || 0} 
            />
          </ListItem>
          
          <Divider component="li" />
          
          <Divider component="li" />
          
          <ListItem>
            <ListItemIcon>
              <ShareIcon />
            </ListItemIcon>
            <ListItemText 
              primary="Shared Recipes" 
              secondary={userData.sharedCount || 0} 
            />
          </ListItem>
        </List>
      </CardContent>
    </Card>
  );
}

export default UserStatsCard;