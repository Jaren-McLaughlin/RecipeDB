import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box,
  useTheme
} from '@mui/material';
import RestaurantIcon from '@mui/icons-material/Restaurant';

const Navbar = () => {
  const theme = useTheme();

  return (
    <AppBar position="static">
      <Toolbar sx={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        padding: theme.spacing(0, 2)
      }}>
        {/* Left section: App branding */}
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center' 
        }}>
          <RestaurantIcon sx={{ mr: 1 }} />
          <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
            Recipe Suite
          </Typography>
        </Box>
        
        {/* Center/Main section: Navigation links */}
        <Box sx={{ 
          display: { xs: 'none', sm: 'flex' },
          justifyContent: 'center',
          flexGrow: 1,
          mx: 2
        }}>
          <Button color="inherit" sx={{ mx: 1 }}>Home</Button>
          <Button color="inherit" sx={{ mx: 1 }}>My Recipes</Button>
          <Button color="inherit" sx={{ mx: 1 }}>Add Recipe</Button>
        </Box>
        
        {/* Right section: Auth buttons */}
        <Box>
          <Button color="inherit">Login</Button>
          <Button 
            color="inherit"
            variant="outlined" 
            sx={{ 
              ml: 1,
              border: '1px solid white',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)'
              }
            }}
          >
            Sign Up
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;