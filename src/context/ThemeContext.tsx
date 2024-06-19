import React, { createContext, useState, useContext, ReactNode } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { IThemeContextProps } from "./types";

type ThemeMode = "light" | "dark";
type FontSize = "small" | "medium" | "large";

const ThemeContext = createContext<IThemeContextProps | undefined>(undefined);

const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeContext must be used within a ThemeProvider");
  }
  return context;
};

const ThemeContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [mode, setMode] = useState<ThemeMode>("light");
  const [fontSize, setFontSize] = useState<FontSize>("medium");

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  const changeFontSize = (size: FontSize) => {
    setFontSize(size);
  };

  const theme = createTheme({
    palette: {
      mode,
    },
    typography: {
      fontSize: fontSize === "small" ? 12 : fontSize === "medium" ? 16 : 20,
    },
  });

  return (
    <ThemeContext.Provider
      value={{ mode, fontSize, toggleTheme, changeFontSize }}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export { ThemeContextProvider, useThemeContext };
