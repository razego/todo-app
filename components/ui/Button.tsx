'use client';
import * as React from 'react';
import { Button as MuiButton, ButtonProps as MuiButtonProps, styled } from '@mui/material';
import { alpha } from '@mui/material/styles';

// Extended button props to include custom variants
export interface ButtonProps extends Omit<MuiButtonProps, 'variant'> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const StyledButton = styled(MuiButton, {
  shouldForwardProp: (prop) => prop !== 'loading' && prop !== 'leftIcon' && prop !== 'rightIcon' && prop !== 'customVariant' && prop !== 'buttonSize',
})<{ customVariant?: string; buttonSize?: string }>(({ theme, customVariant, buttonSize }) => {
  const baseStyles = {
    borderRadius: '12px',
    textTransform: 'none' as const,
    fontWeight: 600,
    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
    position: 'relative' as const,
    overflow: 'hidden',
    
    '&:before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: '-100%',
      width: '100%',
      height: '100%',
      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
      transition: 'left 0.5s',
    },
    
    '&:hover:before': {
      left: '100%',
    },
    
    '&:disabled': {
      opacity: 0.6,
      cursor: 'not-allowed',
    },
  };

  const sizeStyles = {
    small: {
      padding: '8px 16px',
      fontSize: '0.875rem',
      minHeight: '36px',
    },
    medium: {
      padding: '12px 24px',
      fontSize: '1rem',
      minHeight: '44px',
    },
    large: {
      padding: '16px 32px',
      fontSize: '1.125rem',
      minHeight: '52px',
    },
  };

  const variantStyles = {
    primary: {
      background: theme.customButtons.primary.background,
      color: theme.customButtons.primary.color,
      boxShadow: theme.customButtons.primary.shadow,
      border: 'none',
      
      '&:hover': {
        background: theme.customButtons.primary.backgroundHover,
        boxShadow: theme.customButtons.primary.shadowHover,
        transform: 'translateY(-2px)',
      },
      
      '&:active': {
        transform: 'translateY(0)',
        boxShadow: theme.customButtons.primary.shadow,
      },
    },
    
    secondary: {
      background: theme.customButtons.secondary.background,
      color: theme.customButtons.secondary.color,
      boxShadow: theme.customButtons.secondary.shadow,
      border: 'none',
      
      '&:hover': {
        background: theme.customButtons.secondary.backgroundHover,
        boxShadow: theme.customButtons.secondary.shadowHover,
        transform: 'translateY(-2px)',
      },
      
      '&:active': {
        transform: 'translateY(0)',
        boxShadow: theme.customButtons.secondary.shadow,
      },
    },
    
    outline: {
      background: 'transparent',
      color: theme.palette.primary.main,
      border: `2px solid ${theme.palette.primary.main}`,
      boxShadow: 'none',
      
      '&:hover': {
        background: alpha(theme.palette.primary.main, 0.1),
        borderColor: theme.palette.primary.dark,
        transform: 'translateY(-1px)',
      },
      
      '&:active': {
        transform: 'translateY(0)',
        background: alpha(theme.palette.primary.main, 0.2),
      },
    },
    
    ghost: {
      background: 'transparent',
      color: theme.palette.text.primary,
      border: 'none',
      boxShadow: 'none',
      
      '&:hover': {
        background: alpha(theme.palette.action.hover, 0.1),
        transform: 'translateY(-1px)',
      },
      
      '&:active': {
        transform: 'translateY(0)',
        background: alpha(theme.palette.action.hover, 0.2),
      },
    },
    
    danger: {
      background: theme.customButtons.danger.background,
      color: theme.customButtons.danger.color,
      boxShadow: theme.customButtons.danger.shadow,
      border: 'none',
      
      '&:hover': {
        background: theme.customButtons.danger.backgroundHover,
        boxShadow: theme.customButtons.danger.shadowHover,
        transform: 'translateY(-2px)',
      },
      
      '&:active': {
        transform: 'translateY(0)',
        boxShadow: theme.customButtons.danger.shadow,
      },
    },
  };

  return {
    ...baseStyles,
    ...sizeStyles[(buttonSize || 'medium') as keyof typeof sizeStyles],
    ...variantStyles[(customVariant || 'primary') as keyof typeof variantStyles],
  };
});

const LoadingSpinner = styled('div')(({ theme }) => ({
  width: '16px',
  height: '16px',
  border: '2px solid transparent',
  borderTop: '2px solid currentColor',
  borderRadius: '50%',
  animation: 'spin 1s linear infinite',
  marginRight: '8px',
  
  '@keyframes spin': {
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' },
  },
}));

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, loading, leftIcon, rightIcon, disabled, variant = 'primary', size = 'medium', ...props }, ref) => {
    return (
      <StyledButton
        ref={ref}
        disabled={disabled || loading}
        customVariant={variant}
        buttonSize={size}
        variant="text" // Use text variant to avoid MUI styling conflicts
        {...props}
      >
        {loading && <LoadingSpinner />}
        {!loading && leftIcon && (
          <span style={{ marginRight: '8px', display: 'flex', alignItems: 'center' }}>
            {leftIcon}
          </span>
        )}
        {children}
        {!loading && rightIcon && (
          <span style={{ marginLeft: '8px', display: 'flex', alignItems: 'center' }}>
            {rightIcon}
          </span>
        )}
      </StyledButton>
    );
  }
);

Button.displayName = 'Button';

export default Button;