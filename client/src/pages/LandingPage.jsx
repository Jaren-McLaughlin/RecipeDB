import React from 'react';
import { Container } from '@mui/material';
import HeroSection from '../components/landing/HeroSection';
import FeaturesSection from '../components/landing/FeaturesSection';
import HowItWorksSection from '../components/landing/HowItWorksSection';
import CtaSection from '../components/landing/CTASection.jsx';

const LandingPage = () => {
  return (
    <Container>
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <CtaSection />
    </Container>
  );
};

export default LandingPage;