import React from 'react';
import { Box } from '@mui/material';
import BugReportIcon from '@mui/icons-material/BugReport';

const MockIndicator = ({ isMockAuth }) => {
  if (!isMockAuth) return null;
  
  return (
    <Box
      sx={{
        bgcolor: (theme) => theme.palette.warning.main,
        color: (theme) => theme.palette.warning.contrastText,
        fontSize: '0.7rem',
        fontWeight: 'bold',
        px: 1,
        py: 0.3,
        borderRadius: 1,
        ml: 1,
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <BugReportIcon sx={{ fontSize: '0.9rem', mr: 0.5 }} />
      MOCK
    </Box>
  );
};

export default MockIndicator;