import { createTheme, useMediaQuery, ThemeProvider } from "@mui/material";
import { FC, ReactNode, useMemo } from "react";

export const useThemeProvider = () => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? "dark" : "light",
        },
      }),
    [prefersDarkMode]
  );

  const Provider = useMemo(() => {
    const Com: FC<{
      children: ReactNode;
    }> = ({ children }) => (
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    );
    return Com;
  }, [theme]);

  return {
    Provider,
  };
};
