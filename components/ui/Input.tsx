'use client';
import * as React from 'react';
import { TextField, TextFieldProps, styled } from '@mui/material';

// Simple input props extending MUI TextField
export interface InputProps extends Omit<TextFieldProps, 'variant' | 'size'> {
  size?: 'small' | 'medium' | 'large';
}

const StyledInput = styled(TextField, {
  shouldForwardProp: (prop) => prop !== 'inputSize',
})<{ inputSize?: string }>(({ theme, inputSize }) => {
  const sizeStyles = {
    small: {
      '& .MuiInputBase-root': {
        fontSize: '0.875rem',
        minHeight: '36px',
      },
    },
    medium: {
      '& .MuiInputBase-root': {
        fontSize: '1rem',
        minHeight: '44px',
      },
    },
    large: {
      '& .MuiInputBase-root': {
        fontSize: '1.125rem',
        minHeight: '52px',
      },
    },
  };

  return {
    '& .MuiOutlinedInput-root': {
      borderRadius: '12px',
      backgroundColor: theme.palette.background.paper,
      transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
      
      '&:hover': {
        transform: 'translateY(-1px)',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      },
      
      '&.Mui-focused': {
        transform: 'translateY(-1px)',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
      },
      
      '& fieldset': {
        borderColor: theme.palette.divider,
        borderWidth: '2px',
      },
      
      '&:hover fieldset': {
        borderColor: theme.palette.primary.main,
      },
      
      '&.Mui-focused fieldset': {
        borderColor: theme.palette.primary.main,
      },
    },
    
    '& .MuiInputLabel-root': {
      color: theme.palette.text.secondary,
      fontWeight: 500,
      
      '&.Mui-focused': {
        color: theme.palette.primary.main,
      },
    },
    
    ...sizeStyles[(inputSize || 'medium') as keyof typeof sizeStyles],
  };
});

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ size = 'medium', ...props }, ref) => {
    return (
      <StyledInput
        ref={ref}
        variant="outlined"
        inputSize={size}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';

export default Input; 