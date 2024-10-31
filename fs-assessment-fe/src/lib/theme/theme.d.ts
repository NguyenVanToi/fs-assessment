declare module '@mui/material/styles' {
  interface Theme {
    cssVariables: boolean;
    palette: {
      primary: string;
      secondary: string;
      text: {
        primary: string
      }
    };
    typography: {
      fontFamily: string
    }
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    cssVariables: boolean;
    palette: {
      primary: string;
      secondary: string;
      text: {
        primary: string
      }
    };
    typography: {
      fontFamily: string
    }
  }
}