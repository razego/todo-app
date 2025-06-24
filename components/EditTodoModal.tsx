'use client';
import * as React from 'react';
import { Typography, Box } from '@mui/material';
import { Todo, TodoUpdateData } from '@/types';

export interface EditTodoModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (updateData: TodoUpdateData) => void;
  todo: Todo | null;
  loading?: boolean;
}

import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Checkbox from '@/components/ui/Checkbox';

export const EditTodoModal = React.forwardRef<HTMLDivElement, EditTodoModalProps>(
  ({ open, onClose, onSave, todo, loading = false }, ref) => {
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [completed, setCompleted] = React.useState(false);

    // Update form when todo prop changes
    React.useEffect(() => {
      if (todo) {
        setName(todo.title);
        setDescription(todo.description || '');
        setCompleted(todo.completed);
      } else {
        setName('');
        setDescription('');
        setCompleted(false);
      }
    }, [todo]);

    const handleSave = () => {
      if (!todo || !name.trim()) return;
      
      // Return only the fields that should be updated
      const updateData = {
        id: todo.id,
        title: name.trim(),
        description: description.trim(),
        completed,
      };
      
      onSave(updateData);
    };

    const handleClose = () => {
      // Reset form to original values when closing
      if (todo) {
        setName(todo.title);
        setDescription(todo.description || '');
        setCompleted(todo.completed);
      }
      onClose();
    };

    const isValid = name.trim().length > 0;

    return (
      <Modal 
        ref={ref}
        open={open}
        onClose={handleClose}
        size="medium"
      >
        <Typography variant="h5" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
          Edit Todo
        </Typography>
        
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Input
            label="Todo Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter todo name..."
            required
            fullWidth
            disabled={loading}
          />

          <Input
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter description (optional)..."
            multiline
            rows={4}
            fullWidth
            disabled={loading}
          />

          <Checkbox
            label="Mark as completed"
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
            disabled={loading}
          />
        </Box>

        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 4 }}>
          <Button 
            variant="outline" 
            onClick={handleClose}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button 
            variant="primary" 
            onClick={handleSave}
            loading={loading}
            disabled={loading || !isValid}
          >
            Save Changes
          </Button>
        </Box>
      </Modal>
    );
  }
);

export default EditTodoModal; 