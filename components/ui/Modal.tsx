'use client';
import * as React from 'react';
import { Modal as MuiModal, ModalProps as MuiModalProps, Backdrop, styled } from '@mui/material';

// Simple modal props extending MUI Modal
export interface ModalProps extends Omit<MuiModalProps, 'children'> {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  size?: 'small' | 'medium' | 'large';
}

const StyledBackdrop = styled(Backdrop)(({ theme }) => ({
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  backdropFilter: 'blur(4px)',
}));

const StyledModalContainer = styled('div', {
  shouldForwardProp: (prop) => prop !== 'modalSize',
})<{ modalSize?: string }>(({ theme, modalSize }) => {
  const sizeStyles = {
    small: {
      maxWidth: '400px',
      width: '90%',
    },
    medium: {
      maxWidth: '600px',
      width: '90%',
    },
    large: {
      maxWidth: '800px',
      width: '90%',
    },
  };

  return {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: theme.palette.background.paper,
    borderRadius: '16px',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
    padding: '24px',
    outline: 'none',
    maxHeight: '90vh',
    overflowY: 'auto',
    ...sizeStyles[(modalSize || 'medium') as keyof typeof sizeStyles],
  };
});

export const Modal = React.forwardRef<HTMLDivElement, ModalProps>(
  ({ open, onClose, children, size = 'medium', ...props }, ref) => {
    return (
      <MuiModal
        open={open}
        onClose={onClose}
        slots={{ backdrop: StyledBackdrop }}
        {...props}
      >
        <StyledModalContainer ref={ref} modalSize={size}>
          {children}
        </StyledModalContainer>
      </MuiModal>
    );
  }
);

export default Modal; 