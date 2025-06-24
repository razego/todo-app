'use client';
import * as React from 'react';
import { Typography, Box } from '@mui/material';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';

export interface DeleteTodoModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  todoTitle?: string;
  loading?: boolean;
}

const DeleteTodoModal = React.forwardRef<HTMLDivElement, DeleteTodoModalProps>(
  ({ open, onClose, onConfirm, todoTitle, loading = false }, ref) => {
    return (
      <Modal 
        ref={ref}
        open={open}
        onClose={onClose}
        size="small"
      >
        <Typography variant="h5" component="h2" sx={{ mb: 2, fontWeight: 600 }}>
          Delete Todo
        </Typography>
        
        <Typography sx={{ mb: 3, color: 'text.secondary' }}>
          Are you sure you want to delete{' '}
          {todoTitle ? (
            <>
              &ldquo;<strong>{todoTitle}</strong>&rdquo;
            </>
          ) : (
            'this todo'
          )}
          ? This action cannot be undone.
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
          <Button 
            variant="outline" 
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button 
            variant="danger" 
            onClick={onConfirm}
            loading={loading}
            disabled={loading}
          >
            Delete
          </Button>
        </Box>
      </Modal>
    );
  }
);

DeleteTodoModal.displayName = 'DeleteTodoModal';

export default DeleteTodoModal; 