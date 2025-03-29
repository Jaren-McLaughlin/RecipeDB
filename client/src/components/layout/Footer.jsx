import React from 'react';
import { 
  Box, 
  Typography, 
  Link, 
  Divider,
  useTheme
} from '@mui/material';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import GitHubIcon from '@mui/icons-material/GitHub';

const Footer = () => {
  const theme = useTheme();
  
  return (
    <Box 
      component="footer" 
      sx={{ 
        backgroundColor: theme.palette.mode === 'dark' 
          ? 'rgba(30, 30, 30, 0.9)' // Dark footer background
          : '#f5f5f5',               // Light footer background
        color: theme.palette.text.primary,
        width: '100%',
        marginTop: 'auto',
        boxSizing: 'border-box',
      }}
    >
      <Box 
        sx={{ 
          width: '100%',
          maxWidth: '95%',
          mx: 'auto', // Centers the content
          px: 3, // Horizontal padding
          py: 3, // Vertical padding
        }}
      >
        {/* Top section with three columns */}
        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'space-between',
          width: '100%',
          mb: 2
        }}>
          {/* Left column - Logo and tagline */}
          <Box sx={{ 
            mb: { xs: 3, md: 0 },
            minWidth: { md: '200px' }
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <RestaurantIcon sx={{ mr: 1 }} />
              <Typography variant="h6">Recipe Suite</Typography>
            </Box>
            <Typography variant="body2" color="text.secondary">
              Your personal recipe management tool.
            </Typography>
          </Box>
          
          {/* Empty middle section for balance */}
          <Box sx={{ display: { xs: 'none', md: 'block' }, flex: 1 }} />
          
          {/* Right column - Team info */}
          <Box sx={{ 
            display: 'flex',
            flexDirection: 'column',
            alignItems: { xs: 'flex-start', md: 'flex-end' },
            minWidth: { md: '200px' }
          }}>
            <Typography variant="subtitle2" gutterBottom>
              Project Team
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ textAlign: { md: 'right' } }}>
              Tate McCauley, Jaren McLaughlin, Nathan Seneca, Ben Gutierrez
            </Typography>
            <Link 
              href="https://github.com/Jaren-McLaughlin/RecipeDB" 
              target="_blank"
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                mt: 1,
                color: theme.palette.primary.main
              }}
            >
              <GitHubIcon sx={{ mr: 0.5 }} />
              <Typography variant="body2">GitHub Repository</Typography>
            </Link>
          </Box>
        </Box>
        
        {/* Divider */}
        <Divider sx={{ my: 2 }} />
        
        {/* Bottom section - Copyright and links */}
        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between',
          alignItems: { xs: 'flex-start', sm: 'center' },
          width: '100%'
        }}>
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} Recipe Management Suite. IT&C 350 Project.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;