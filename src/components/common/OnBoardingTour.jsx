import React, { useState, useEffect } from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent,
  DialogActions, 
  Typography, 
  Box, 
  Button,
  useTheme,
  IconButton,
  Fab,
  Tooltip
} from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

// Define the tour steps
const tourSteps = [
  {
    title: "Welcome to Recipe Management Suite!",
    description: "Let's take a quick tour to help you get started with organizing and managing your recipes.",
    icon: <RestaurantIcon sx={{ fontSize: 64, color: 'primary.main' }} />
  },
  {
    title: "Browse Your Recipes",
    description: "View all your recipes in one place and use the search functionality to find exactly what you're looking for.",
    icon: <SearchIcon sx={{ fontSize: 64, color: 'primary.main' }} />
  },
  {
    title: "Create and Edit Recipes",
    description: "Easily add new recipes or modify existing ones with our simple recipe editor.",
    icon: <EditIcon sx={{ fontSize: 64, color: 'primary.main' }} />
  },
  {
    title: "Organize Your Collection",
    description: "Keep your recipes organized and access them from anywhere, anytime.",
    icon: <BookmarkIcon sx={{ fontSize: 64, color: 'primary.main' }} />
  }
];

const OnboardingTour = () => {
  const [open, setOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const theme = useTheme();
  
  // State to track whether we're in debug mode
  const [isDebugMode, setIsDebugMode] = useState(false);
  
  useEffect(() => {
    // Check for debug mode in URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const debugMode = urlParams.get('debug_tour');
    
    if (debugMode === 'true') {
      setIsDebugMode(true);
      setOpen(true);
      return;
    }
    
    // Normal behavior - only show for first time visitors
    const hasSeenTour = localStorage.getItem("hasSeenTour");
    if (!hasSeenTour) {
      setOpen(true);
    }
  }, []);
  
  const handleNext = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };
  
  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const handleComplete = () => {
    // Only set localStorage if not in debug mode
    if (!isDebugMode) {
      localStorage.setItem("hasSeenTour", "true");
    }
    setOpen(false);
  };
  
  const handleSkip = () => {
    handleComplete();
  };
  
  // Function to manually trigger the tour
  const showTour = () => {
    setCurrentStep(0);
    setOpen(true);
  };
  
  // Reset the onboarding flag to see the tour again
  const resetTour = () => {
    localStorage.removeItem("hasSeenTour");
    alert("Onboarding tour has been reset. Refresh the page to see it again.");
  };
  
  return (
    <>
      {/* The Tour Dialog */}
      <Dialog 
        open={open} 
        onClose={handleSkip}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle 
          sx={{ 
            textAlign: 'center',
            pt: 3,
            fontWeight: 'bold'
          }}
        >
          {tourSteps[currentStep].title}
          
          {/* Debug indicator */}
          {isDebugMode && (
            <Typography 
              variant="caption" 
              sx={{ 
                display: 'block', 
                color: 'error.main',
                mt: 1
              }}
            >
              Debug Mode - Step {currentStep + 1} of {tourSteps.length}
            </Typography>
          )}
        </DialogTitle>
        
        <DialogContent>
          <Box 
            sx={{ 
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              py: 3
            }}
          >
            {tourSteps[currentStep].icon}
            
            <Typography 
              variant="body1" 
              sx={{ 
                textAlign: 'center',
                mt: 3,
                px: 2
              }}
            >
              {tourSteps[currentStep].description}
            </Typography>
          </Box>
          
          {/* Step indicators */}
          <Box 
            sx={{ 
              display: 'flex',
              justifyContent: 'center',
              mt: 2,
              mb: 1
            }}
          >
            {tourSteps.map((_, index) => (
              <Box 
                key={index}
                sx={{
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  mx: 0.5,
                  bgcolor: index === currentStep 
                    ? 'primary.main' 
                    : theme.palette.mode === 'light' 
                      ? 'grey.300' 
                      : 'grey.700',
                  cursor: isDebugMode ? 'pointer' : 'default',
                }}
                onClick={() => isDebugMode && setCurrentStep(index)}
              />
            ))}
          </Box>
        </DialogContent>
        
        <DialogActions sx={{ p: 2, justifyContent: 'space-between' }}>
          {isDebugMode ? (
            // Debug mode controls
            <>
              <Button 
                onClick={handlePrevious}
                disabled={currentStep === 0}
                variant="outlined"
              >
                Previous
              </Button>
              <Button 
                onClick={resetTour}
                color="error"
                variant="outlined"
              >
                Reset Tour Flag
              </Button>
              <Button 
                onClick={handleNext}
                variant="contained"
                endIcon={currentStep < tourSteps.length - 1 ? <NavigateNextIcon /> : null}
              >
                {currentStep < tourSteps.length - 1 ? 'Next' : 'Close'}
              </Button>
            </>
          ) : (
            // Normal mode controls
            <>
              <Button 
                onClick={handleSkip}
                color="inherit"
              >
                Skip Tour
              </Button>
              <Button 
                onClick={handleNext}
                variant="contained"
                endIcon={currentStep < tourSteps.length - 1 ? <NavigateNextIcon /> : null}
              >
                {currentStep < tourSteps.length - 1 ? 'Next' : 'Get Started'}
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>
      
      {/* Help button to trigger tour manually - only visible after tour has been seen once */}
      {!open && localStorage.getItem("hasSeenTour") && (
        <Tooltip title="Show Onboarding Tour">
          <Fab 
            color="primary" 
            size="small" 
            onClick={showTour}
            sx={{ 
              position: 'fixed', 
              bottom: 16, 
              right: 16,
              zIndex: 1000
            }}
          >
            <HelpOutlineIcon />
          </Fab>
        </Tooltip>
      )}
    </>
  );
};

export default OnboardingTour;