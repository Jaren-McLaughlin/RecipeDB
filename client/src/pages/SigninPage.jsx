import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Divider,
  FormLabel,
  FormControl,
  Link,
  TextField,
  Typography,
  Paper,
  Alert,
} from '@mui/material';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import { AuthContext } from '../contexts/MockAuthContext'; // Make sure this path is correct

function SignInPage() {
  const navigate = useNavigate();
  
  // Get auth context safely with fallbacks
  const authContext = useContext(AuthContext);
  // Safely access login function with a fallback
  const login = authContext?.login || ((credentials) => {
    console.error('Login function not available');
    return false;
  });
  
  // Form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  
  // Validation state
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  
  // Status message
  const [statusMessage, setStatusMessage] = useState({ type: '', message: '' });

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!validateInputs()) {
      return;
    }
    
    try {
      // Show loading status
      setStatusMessage({ type: 'info', message: 'Logging in...' });
      
      // Call login function from AuthContext
      const success = await login({ 
        email, 
        password,
        rememberMe
      });
      
      if (success) {
        // Redirect to dashboard on successful login
        navigate('/dash');
      } else {
        // Show error message
        setStatusMessage({ 
          type: 'error', 
          message: 'Invalid email or password. Please try again.' 
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      setStatusMessage({ 
        type: 'error', 
        message: 'Login failed. Please try again later.' 
      });
    }
  };
  
  const validateForm = () => {
    let isValid = true;
    const newErrors = { email: false, password: false };
    const newErrorMessages = { email: '', password: '' };
    
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = true;
      newErrorMessages.email = 'Please enter a valid email address';
      isValid = false;
    }
    
    if (!formData.password) {
      newErrors.password = true;
      newErrorMessages.password = 'Password is required';
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    return isValid;
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8, mb: 4 }}>
      <Paper
        elevation={3}
        sx={{
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2
        }}
      >
        <RestaurantIcon color="primary" sx={{ fontSize: 40 }} />
        <Typography component="h1" variant="h4">
          Sign in
        </Typography>
        
        {/* Show status message if any */}
        {statusMessage.message && (
          <Alert severity={statusMessage.type} sx={{ width: '100%' }}>
            {statusMessage.message}
          </Alert>
        )}
        
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{
            width: '100%',
            mt: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <FormControl>
            <FormLabel htmlFor="email">Email</FormLabel>
            <TextField
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={emailError}
              helperText={emailErrorMessage}
              id="email"
              type="email"
              name="email"
              placeholder="your@email.com"
              autoComplete="email"
              autoFocus
              required
              fullWidth
              variant="outlined"
              color={emailError ? 'error' : 'primary'}
            />
          </FormControl>
          
          <FormControl>
            <FormLabel htmlFor="password">Password</FormLabel>
            <TextField
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={passwordError}
              helperText={passwordErrorMessage}
              name="password"
              placeholder="••••••"
              type="password"
              id="password"
              autoComplete="current-password"
              required
              fullWidth
              variant="outlined"
              color={passwordError ? 'error' : 'primary'}
            />
          </FormControl>
          
          <FormControlLabel
            control={
              <Checkbox 
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                value="remember" 
                color="primary" 
              />
            }
            label="Remember me"
          />
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            sx={{ mt: 1 }}
          >
            Sign in
          </Button>
        </Box>
        
        <Divider sx={{ width: '100%', my: 2 }}>or</Divider>
        
        <Typography sx={{ textAlign: 'center' }}>
          Don't have an account?{' '}
          <Link
            component="button"
            variant="body2"
            onClick={() => navigate('/signup')}
          >
            Sign up
          </Link>
        </Typography>
      </Paper>
    </Container>
  );
}

export default SignInPage;