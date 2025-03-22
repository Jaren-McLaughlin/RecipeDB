// src/components/dashboard/PaginationControls.jsx
import React from 'react';
import { 
    Box, 
    Pagination, 
    FormControl, 
    Select, 
    MenuItem, 
    Typography 
} from '@mui/material';

function PaginationControls({ 
  totalItems, 
  itemsPerPage, 
  currentPage, 
  onPageChange, 
  onItemsPerPageChange 
}) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  return (
    <Box sx={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center',
      mt: 3 
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography variant="body2" sx={{ mr: 2 }}>
          Recipes per page:
        </Typography>
        <FormControl size="small" variant="outlined" sx={{ minWidth: 80 }}>
          <Select
            value={itemsPerPage}
            onChange={(e) => onItemsPerPageChange(e.target.value)}
          >
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={8}>8</MenuItem>
            <MenuItem value={12}>12</MenuItem>
            <MenuItem value={16}>16</MenuItem>
          </Select>
        </FormControl>
      </Box>
      
      {totalPages > 1 && (
        <Pagination 
          count={totalPages}
          page={currentPage}
          onChange={(event, page) => onPageChange(page)}
          color="primary"
          showFirstButton
          showLastButton
        />
      )}
    </Box>
  );
}

export default PaginationControls;