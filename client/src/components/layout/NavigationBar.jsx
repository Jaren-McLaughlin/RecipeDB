import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box,
  useTheme
} from '@mui/material';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import { useNavigate } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const theme = useTheme();
  const navigate = useNavigate(); // navigation hook

  const handleNavigateHome = () => {
    navigate('/');
  };

  const handleNavigateAddRecipe = () => {
    navigate('/add-recipe'); 
  };

  const handleNavigateLogin = () => {
    navigate('/'); // Navigate to login page
  };

  const handleNavigateSignUp = () => {
    navigate('/signup'); // Navigate to sign up page
  };

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
          <Button color="inherit" sx={{ mx: 1 }} onClick={handleNavigateHome}>My Recipes</Button>
          <Button color="inherit" sx={{ mx: 1 }} onClick={handleNavigateAddRecipe}>Add Recipe</Button>
        </Box>
        
        {/* Right section: Auth buttons and theme toggle */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {/* Add the theme toggle button */}
          <ThemeToggle />
          
          <Button color="inherit" onClick={handleNavigateLogin}>Login</Button>
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
            onClick={handleNavigateSignUp}
          >
            Sign Up
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};


export default Navbar;