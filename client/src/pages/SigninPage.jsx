import React, { useState } from 'react';
import { Box, FormControlLabel, Checkbox, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../components/auth/AuthLayout';
import AuthHeader from '../components/auth/AuthHeader';
import EmailField from '../components/auth/EmailField';
import PasswordField from '../components/auth/PasswordField';
import AuthSubmitButton from '../components/auth/AuthSubmitButton';
import AuthDivider from '../components/auth/AuthDivider';
import AuthFooter from '../components/auth/AuthFooter';

function SignInPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  
  const [errors, setErrors] = useState({
    email: false,
    password: false
  });
  
  const [errorMessages, setErrorMessages] = useState({
    email: '',
    password: ''
  });
  
  const [formStatus, setFormStatus] = useState({
    submitting: false,
    error: null
  });

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'rememberMe' ? checked : value
    });
    
    if (errors[name]) {
      setErrors({ ...errors, [name]: false });
      setErrorMessages({ ...errorMessages, [name]: '' });
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
    }
    
    setErrors(newErrors);
    setErrorMessages(newErrorMessages);
    return isValid;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setFormStatus({ submitting: true, error: null });

    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        })
      });

      const data = await response.text();

      if (!response.ok) {
        throw new Error(data || 'Login failed');
      }

      // Successful login - navigate to dashboard
      navigate('/');
      
    } catch (error) {
      let errorMessage = 'Login failed';
      if (error.message.includes('Invalid credentials')) {
        errorMessage = 'Invalid email or password';
      } else if (error.message.includes('missing required information')) {
        errorMessage = 'Please fill in all fields';
      }
      
      setFormStatus({
        submitting: false,
        error: errorMessage
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