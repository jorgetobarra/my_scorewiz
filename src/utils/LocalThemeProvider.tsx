import { createTheme, ThemeProvider } from "@mui/material/styles";
import React from "react";
import { useColorModeContext } from "../contexts/ColorModeContext";

export function LocalThemeProvider({ children }: React.PropsWithChildren<{}>) {
  const { mode } = useColorModeContext();
  const lightTheme = {
    primary: {
      main: "#00cf85",
      // dark: "#92766c",
      // contrastText: "rgba(255,255,255,0.87)",
    },
    secondary: {
      main: "#ffd54f",
    },
    error: {
      main: "#000000ff",
    }
  };
  const darkTheme = {
    ...lightTheme,
    primary: {
      main: "#00cf85",
    },
    background: {
      default: "#121212",
      paper: "#1d1d1d",
    },
  }

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {mode: mode as "light" | "dark", ...(mode === "light" ? lightTheme : darkTheme)},
      }),
    [mode]
  );

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
