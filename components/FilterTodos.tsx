import * as React from 'react';
import { Box } from '@mui/material';
import Button from '@/components/ui/Button';

export type FilterStatus = 'all' | 'completed' | 'pending';

export interface FilterTodosProps {
  value: FilterStatus;
  onChange: (value: FilterStatus) => void;
}

const FilterTodos = ({ value, onChange }: FilterTodosProps) => {
  return (
    <Box sx={{ display: 'flex', gap: 1 }}>
      <Button
        variant={value === 'all' ? 'primary' : 'ghost'}
        size="small"
        onClick={() => onChange('all')}
      >
        All
      </Button>
      <Button
        variant={value === 'pending' ? 'primary' : 'ghost'}
        size="small"
        onClick={() => onChange('pending')}
      >
        Pending
      </Button>
      <Button
        variant={value === 'completed' ? 'primary' : 'ghost'}
        size="small"
        onClick={() => onChange('completed')}
      >
        Completed
      </Button>
    </Box>
  );
};

export default FilterTodos; 