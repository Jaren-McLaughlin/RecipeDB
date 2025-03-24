import React from 'react';
import { Paper, InputBase, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

function SearchBar({ searchTerm, onSearchChange }) {
  return (
    <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%', mb: 3 }}
      onSubmit={(e) => e.preventDefault()}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search recipes..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}

export default SearchBar;