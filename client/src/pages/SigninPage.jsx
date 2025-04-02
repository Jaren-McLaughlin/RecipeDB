import React, { useState } from 'react';
import { Box, FormControlLabel, Checkbox, Alert } from '@mui/material';

import AuthLayout from '../components/auth/AuthLayout';
import AuthHeader from '../components/auth/AuthHeader';
import EmailField from '../components/auth/EmailField';
import PasswordField from '../components/auth/PasswordField';
import AuthSubmitButton from '../components/auth/AuthSubmitButton';
import AuthDivider from '../components/auth/AuthDivider';
import AuthFooter from '../components/auth/AuthFooter';

function SignInPage() {
  // Form state
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  
  // Error states
  const [errors, setErrors] = useState({
    email: false,
    password: false
  });
  
  // Error messages
  const [errorMessages, setErrorMessages] = useState({
    email: '',
    password: ''
  });
  
  // Form status
  const [formStatus, setFormStatus] = useState({
    submitting: false,
    error: null
  });
  
  // Handle input changes
  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'rememberMe' ? checked : value
    });
    
    // Clear errors
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: false
      });
      setErrorMessages({
        ...errorMessages,
        [name]: ''
      });
    }
  };
  
  // Form validation
  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };
    const newErrorMessages = { ...errorMessages };
    
    // Validate email
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = true;
      newErrorMessages.email = 'Please enter a valid email address';
      isValid = false;
    }
    
    // Validate password
    if (!formData.password) {
      newErrors.password = true;
      newErrorMessages.password = 'Password is required';
      isValid = false;
    }
    
    setErrors(newErrors);
    setErrorMessages(newErrorMessages);
    return isValid;
  };
  
  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setFormStatus({
      submitting: true,
      error: null
    });
    
    try {
      // Simulate API call
      console.log('Signing in with:', formData);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For now, just simulate success
      window.location.href = '/'; // Or use navigate
    } catch (error) {
      console.error('Sign in error:', error);
      setFormStatus({
        submitting: false,
        error: 'Invalid email or password. Please try again.'
      });
    }
  };
  
  return (
    <AuthLayout>
      <AuthHeader title="Sign In" />
      
      {formStatus.error && (
        <Alert severity="error" sx={{ width: '100%' }}>
          {formStatus.error}
        </Alert>
      )}
      
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <EmailField
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          helperText={errorMessages.email}
          autoFocus={true}
        />
        
        <PasswordField
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          helperText={errorMessages.password}
        />
        
        <FormControlLabel
          control={
            <Checkbox
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleChange}
              color="primary"
            />
          }
          label="Remember me"
        />
        
        <AuthSubmitButton
          label="Sign In"
          isSubmitting={formStatus.submitting}
        />
      </Box>
      
      <AuthDivider />
      
      <AuthFooter
        message="Don't have an account?"
        linkText="Sign Up"
        linkPath="/signup"
      />
    </AuthLayout>
  );
}

export default SignInPage;