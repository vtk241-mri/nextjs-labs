"use client";

import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import type { ReactNode } from "react";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#315c50"
    },
    secondary: {
      main: "#9b5f43"
    },
    background: {
      default: "#f5f2ed",
      paper: "#ffffff"
    }
  },
  shape: {
    borderRadius: 8
  },
  typography: {
    fontFamily: 'Roboto, Arial, "Helvetica Neue", sans-serif',
    h1: {
      fontSize: "2.3rem",
      fontWeight: 700,
      lineHeight: 1.15
    },
    h2: {
      fontSize: "1.55rem",
      fontWeight: 700
    },
    h3: {
      fontSize: "1.2rem",
      fontWeight: 700
    }
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          border: "1px solid #ded7cd",
          boxShadow: "none"
        }
      }
    }
  }
});

export function AppThemeProvider({ children }: { children: ReactNode }) {
  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
