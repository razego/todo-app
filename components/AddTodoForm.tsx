'use client';
import * as React from 'react';
import { Box } from '@mui/material';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

export interface AddTodoFormProps {
  onAdd: (todoName: string) => void;
  loading?: boolean;
  placeholder?: string;
}

export const AddTodoForm = React.forwardRef<HTMLDivElement, AddTodoFormProps>(
  ({ onAdd, loading = false, placeholder = "Add Task" }, ref) => {
    const [todoName, setTodoName] = React.useState('');

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (todoName.trim()) {
        onAdd(todoName.trim());
        setTodoName('');
      }
    };

    const isValid = todoName.trim().length > 0;

    return (
      <Box 
        ref={ref}
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          gap: 2,
          alignItems: 'flex-end',
          width: '100%',
        }}
      >
        <Input
          value={todoName}
          onChange={(e) => setTodoName(e.target.value)}
          placeholder={placeholder}
          disabled={loading}
          sx={{ flex: 1 }}
          size="large"
        />
        
        <Button
          type="submit"
          variant="primary"
          size="xl"
          disabled={!isValid || loading}
          loading={loading}
          sx={{ 
            minWidth: '100px',
            height: '52px', // Match large input height
          }}
        >
          Add
        </Button>
      </Box>
    );
  }
);

AddTodoForm.displayName = 'AddTodoForm';

export default AddTodoForm; 