import React from 'react';
import { Box, InputBase, alpha } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchBox = ({ searchValue, setSearchValue, handleSearch, isMobile }) => {
  return (
    <Box 
      component="form" 
      onSubmit={handleSearch}
      sx={{
        position: 'relative',
        borderRadius: (theme) => theme.shape.borderRadius,
        backgroundColor: (theme) => alpha(theme.palette.common.black, 0.05),
        '&:hover': { 
          backgroundColor: (theme) => alpha(theme.palette.common.black, 0.1) 
        },
        width: isMobile ? '100%' : '240px',
      }}
    >
      <SearchIcon 
        sx={{ 
          position: 'absolute', 
          left: 8, 
          top: '50%', 
          transform: 'translateY(-50%)' 
        }} 
      />
      <InputBase
        placeholder="Search recipes…"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        sx={{ pl: 5, pr: 1, py: 1, width: '100%' }}
      />
    </Box>
  );
};

export default SearchBox;