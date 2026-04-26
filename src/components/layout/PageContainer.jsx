
/**
 * Container component for page layout with navigation and footer.
 * @memberof Layout
 * @function PageContainer
 * @param {Object} props - Component properties
 * @param {React.ReactNode} props.children - Child components to render within the container
 * @returns {JSX.Element} Page container component
 * @example
 * <PageContainer>
 *   <DashboardPage />
 * </PageContainer>
 */

import React from 'react';
import { Box } from '@mui/material';
import Navbar from './NavigationBar'; 
import Footer from './Footer';

const PageContainer = ({ children }) => {
  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column',
      minHeight: '100vh'  // This ensures the footer sticks to the bottom
    }}>
      <Navbar />
      <Box sx={{ 
        flexGrow: 1,
        py: 3
      }}>
        {children}
      </Box>
      <Footer />
    </Box>
  );
};

export default PageContainer;