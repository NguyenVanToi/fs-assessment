import { createTheme } from "@mui/material/styles";
import { Roboto } from 'next/font/google';


export const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
});

export const theme = createTheme({
  cssVariables: true,
  palette: {
    primary: {
      dark: '#d32f2f',
      main: '#f44336',
      light: '#e57373',
    },
    secondary: {
      main: '#f8f5f0',
    },
    text: {
      primary: '#171717'
    }
  },
  typography: {
    fontFamily: 'var(--font-roboto)'
  }
});