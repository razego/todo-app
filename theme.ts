'use client';
import { createTheme } from '@mui/material/styles';
import { Poppins } from 'next/font/google';

// Augment the theme to include custom button colors
declare module '@mui/material/styles' {
  interface Theme {
    customButtons: {
      primary: {
        background: string;
        backgroundHover: string;
        color: string;
        shadow: string;
        shadowHover: string;
      };
      secondary: {
        background: string;
        backgroundHover: string;
        color: string;
        shadow: string;
        shadowHover: string;
      };
      danger: {
        background: string;
        backgroundHover: string;
        color: string;
        shadow: string;
        shadowHover: string;
      };
    };
  }

  interface ThemeOptions {
    customButtons?: {
      primary?: {
        background?: string;
        backgroundHover?: string;
        color?: string;
        shadow?: string;
        shadowHover?: string;
      };
      secondary?: {
        background?: string;
        backgroundHover?: string;
        color?: string;
        shadow?: string;
        shadowHover?: string;
      };
      danger?: {
        background?: string;
        backgroundHover?: string;
        color?: string;
        shadow?: string;
        shadowHover?: string;
      };
    };
  }
}

const poppins = Poppins({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const theme = createTheme({
  colorSchemes: { light: true, dark: true },
  cssVariables: {
    colorSchemeSelector: 'class',
  },
  palette: {
    text: {
      primary: '#111111',
      secondary: '#666666',
    },
    primary: {
      main: '#667eea',
      dark: '#5a6fd8',
    },
  },
  typography: {
    fontFamily: poppins.style.fontFamily,
  },
  customButtons: {
    primary: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      backgroundHover: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
      color: '#ffffff',
      shadow: '0 4px 15px 0 rgba(102, 126, 234, 0.4)',
      shadowHover: '0 6px 20px 0 rgba(102, 126, 234, 0.6)',
    },
    secondary: {
      background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      backgroundHover: 'linear-gradient(135deg, #ee84f0 0%, #f0475a 100%)',
      color: '#ffffff',
      shadow: '0 4px 15px 0 rgba(240, 147, 251, 0.4)',
      shadowHover: '0 6px 20px 0 rgba(240, 147, 251, 0.6)',
    },
    danger: {
      background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%)',
      backgroundHover: 'linear-gradient(135deg, #ff5252 0%, #e74c3c 100%)',
      color: '#ffffff',
      shadow: '0 4px 15px 0 rgba(255, 107, 107, 0.4)',
      shadowHover: '0 6px 20px 0 rgba(255, 107, 107, 0.6)',
    },
  },
});

export default theme;