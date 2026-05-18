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
      fontSize: "clamp(2.1rem, 5vw, 4.2rem)",
      fontWeight: 700,
      lineHeight: 1.02,
      letterSpacing: "-0.035em"
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
      },
      styleOverrides: {
        root: {
          borderRadius: 999,
          fontWeight: 800,
          textTransform: "none"
        },
        containedPrimary: {
          background: "linear-gradient(135deg, #315c50, #47796b)",
          boxShadow: "0 14px 30px rgba(49, 92, 80, 0.28)"
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          border: "1px solid #ded7cd",
          borderRadius: 14,
          boxShadow: "none"
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 14
        }
      }
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 700
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
