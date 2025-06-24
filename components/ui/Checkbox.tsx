'use client';
import * as React from 'react';
import { FormControlLabel, styled } from '@mui/material';

// Simple checkbox props
export interface CheckboxProps {
  label?: string;
  size?: 'small' | 'medium' | 'large';
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  value?: string;
}

const CheckboxContainer = styled('div', {
  shouldForwardProp: (prop) => prop !== 'checkboxSize',
})<{ checkboxSize?: string }>(({ theme, checkboxSize }) => {
  const sizeStyles = {
    small: {
      width: '20px',
      height: '20px',
      '& .checkmark': {
        fontSize: '12px',
      },
    },
    medium: {
      width: '24px',
      height: '24px',
      '& .checkmark': {
        fontSize: '14px',
      },
    },
    large: {
      width: '28px',
      height: '28px',
      '& .checkmark': {
        fontSize: '16px',
      },
    },
  };

  return {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '8px',
    backgroundColor: theme.palette.background.paper,
    border: `2px solid ${theme.palette.divider}`,
    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
    cursor: 'pointer',
    
    '&:hover': {
      borderColor: theme.palette.primary.main,
      transform: 'translateY(-1px)',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    },
    
    '&.checked': {
      borderColor: theme.palette.primary.main,
      backgroundColor: theme.palette.primary.main,
      color: 'white',
    },
    
    '&.checked:hover': {
      transform: 'translateY(-1px)',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    },
    
    '&.disabled': {
      opacity: 0.6,
      cursor: 'not-allowed',
    },
    
    '& input': {
      position: 'absolute',
      opacity: 0,
      width: 0,
      height: 0,
    },
    
    ...sizeStyles[(checkboxSize || 'medium') as keyof typeof sizeStyles],
  };
});

const StyledFormControlLabel = styled(FormControlLabel)(({ theme }) => ({
  margin: 0,
  
  '& .MuiFormControlLabel-label': {
    fontSize: '1rem',
    fontWeight: 500,
    color: theme.palette.text.primary,
    marginLeft: '8px',
    userSelect: 'none',
  },
}));

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, size = 'medium', checked, defaultChecked, onChange, disabled, ...props }, ref) => {
    const [isChecked, setIsChecked] = React.useState(defaultChecked || false);
    
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (disabled) return;
      
      // Only update internal state if this is an uncontrolled component
      if (checked === undefined) {
        setIsChecked(event.target.checked);
      }
      
      onChange?.(event);
    };

    const finalChecked = checked !== undefined ? checked : isChecked;

    const checkbox = (
      <CheckboxContainer 
        checkboxSize={size}
        className={`${finalChecked ? 'checked' : ''} ${disabled ? 'disabled' : ''}`}
        onClick={(e) => {
          if (!disabled && !label) {
            e.preventDefault();
            // When there's no label, directly trigger the change
            const inputElement = e.currentTarget.querySelector('input') as HTMLInputElement;
            if (inputElement) {
              // Create a proper synthetic event for the onChange handler
              const event = {
                target: {
                  checked: !finalChecked,
                  value: inputElement.value,
                  name: inputElement.name,
                } as HTMLInputElement,
                currentTarget: inputElement,
                preventDefault: () => {},
                stopPropagation: () => {},
              } as React.ChangeEvent<HTMLInputElement>;
              
              handleChange(event);
            }
          }
        }}
      >
        <input
          ref={ref}
          type="checkbox"
          checked={finalChecked}
          onChange={handleChange}
          disabled={disabled}
          {...props}
        />
        {finalChecked && <span className="checkmark">✓</span>}
      </CheckboxContainer>
    );

    if (label) {
      return (
        <StyledFormControlLabel
          control={checkbox}
          label={label}
          disabled={disabled}
        />
      );
    }

    return checkbox;
  }
);

Checkbox.displayName = 'Checkbox';

export default Checkbox; 