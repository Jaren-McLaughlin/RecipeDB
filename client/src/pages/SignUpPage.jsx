import React, { useState } from 'react';
import { Box, FormControlLabel, Checkbox, Alert, Typography } from '@mui/material';

import AuthLayout from '../components/auth/AuthLayout';
import AuthHeader from '../components/auth/AuthHeader';
import UsernameField from '../components/auth/UsernameField';
import EmailField from '../components/auth/EmailField';
import PasswordField from '../components/auth/PasswordField';
import AuthSubmitButton from '../components/auth/AuthSubmitButton';
import AuthDivider from '../components/auth/AuthDivider';
import AuthFooter from '../components/auth/AuthFooter';
import PasswordPolicy from '../components/auth/PasswordPolicy';

function SignUpPage() {
  // Form state
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });
  
  // Error states
  const [errors, setErrors] = useState({
    userName: false,
    email: false,
    password: false,
    confirmPassword: false,
    agreeToTerms: false
  });
  
  // Error messages
  const [errorMessages, setErrorMessages] = useState({
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: ''
  });
  
  // Form status
  const [formStatus, setFormStatus] = useState({
    submitting: false,
    success: false,
    error: null
  });
  
  // Handle input changes
  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'agreeToTerms' ? checked : value
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
    
    // Clear confirm password error if password changes
    if (name === 'password' && errors.confirmPassword) {
      setErrors({
        ...errors,
        confirmPassword: false
      });
      setErrorMessages({
        ...errorMessages,
        confirmPassword: ''
      });
    }
  };
  
  // Form validation
  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };
    const newErrorMessages = { ...errorMessages };
    
    // Validate username
    if (!formData.userName.trim()) {
      newErrors.userName = true;
      newErrorMessages.userName = 'Username is required';
      isValid = false;
    } else if (formData.userName.length < 3) {
      newErrors.userName = true;
      newErrorMessages.userName = 'Username must be at least 3 characters';
      isValid = false;
    }
    
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
    } else {
      const minLength = formData.password.length >= 8;
      const hasUpperCase = /[A-Z]/.test(formData.password);
      const hasNumber = /\d/.test(formData.password);
      const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(formData.password);
      
      if (!minLength || !hasUpperCase || !hasNumber || !hasSpecial) {
        newErrors.password = true;
        newErrorMessages.password = 'Password does not meet requirements';
        isValid = false;
      }
    }
    
    // Validate confirm password
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = true;
      newErrorMessages.confirmPassword = 'Passwords do not match';
      isValid = false;
    }
    
    // Validate terms agreement
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = true;
      newErrorMessages.agreeToTerms = 'You must agree to the terms';
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
      success: false,
      error: null
    });
    
    try {
      // Simulate API call
      console.log('Registering with:', formData);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setFormStatus({
        submitting: false,
        success: true,
        error: null
      });
      
      // Redirect after success message
      setTimeout(() => {
        window.location.href = '/signin'; // Or use navigate
      }, 2000);
    } catch (error) {
      console.error('Registration error:', error);
      setFormStatus({
        submitting: false,
        success: false,
        error: 'Registration failed. Please try again.'
      });
    }
  };
  
  return (
    <AuthLayout>
      <AuthHeader title="Create Account" />
      
      {formStatus.success && (
        <Alert severity="success" sx={{ width: '100%' }}>
          Account created successfully! Redirecting to login...
        </Alert>
      )}
      
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
        <UsernameField
          value={formData.userName}
          onChange={handleChange}
          error={errors.userName}
          helperText={errorMessages.userName}
          autoFocus={true}
        />
        
        <EmailField
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          helperText={errorMessages.email}
        />
        
        <PasswordField
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          helperText={errorMessages.password}
          autoComplete="new-password"
        />
        
        {formData.password && <PasswordPolicy password={formData.password} />}
        
        <PasswordField
          id="confirmPassword"
          label="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
          helperText={errorMessages.confirmPassword}
          autoComplete="new-password"
        />
        
        <FormControlLabel
          control={
            <Checkbox
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleChange}
              color={errors.agreeToTerms ? "error" : "primary"}
              required
            />
          }
          label="I agree to the Terms and Conditions"
        />
        {errors.agreeToTerms && (
          <Box sx={{ mt: -1, ml: 2 }}>
            <Typography color="error" variant="caption">
              {errorMessages.agreeToTerms}
            </Typography>
          </Box>
        )}
        
        <AuthSubmitButton
          label="Create Account"
          isSubmitting={formStatus.submitting}
        />
      </Box>
      
      <AuthDivider />
      
      <AuthFooter
        message="Already have an account?"
        linkText="Sign In"
        linkPath="/signin"
      />
    </AuthLayout>
  );
}

export default SignUpPage;