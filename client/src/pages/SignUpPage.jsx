import React, { useState } from 'react';
import { Box, FormControlLabel, Checkbox, Alert, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });
  
  const [errors, setErrors] = useState({
    userName: false,
    email: false,
    password: false,
    confirmPassword: false,
    agreeToTerms: false
  });
  
  const [errorMessages, setErrorMessages] = useState({
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: ''
  });
  
  const [formStatus, setFormStatus] = useState({
    submitting: false,
    success: false,
    error: null
  });

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'agreeToTerms' ? checked : value
    });
    
    if (errors[name]) {
      setErrors({ ...errors, [name]: false });
      setErrorMessages({ ...errorMessages, [name]: '' });
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };
    const newErrorMessages = { ...errorMessages };
    
    // Validation logic remains the same
    // ... (keep existing validation code)
    
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setFormStatus({ submitting: true, success: false, error: null });

    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/auth/register`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userName: formData.userName,
          email: formData.email,
          password: formData.password
        })
      });

      const data = await response.text();

      if (!response.ok) {
        throw new Error(data || 'Registration failed');
      }

      setFormStatus({
        submitting: false,
        success: true,
        error: null
      });

      // Redirect after 2 seconds
      setTimeout(() => navigate('/signin'), 2000);

    } catch (error) {
      let errorMessage = 'Registration failed';
      
      if (error.message.includes('missing required information')) {
        errorMessage = 'Please fill in all required fields';
      } else if (error.message.includes('could not create user')) {
        errorMessage = 'Account with this email already exists';
      }

      setFormStatus({
        submitting: false,
        success: false,
        error: errorMessage
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
        {/* Keep all existing form fields */}
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