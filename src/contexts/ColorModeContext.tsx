import React from 'react';
import { DARK_THEME, LIGHT_THEME } from '../utils/constants';

interface ColorModeContextType {
  mode: string;
  toggleColorMode: () => void;
}

export default React.createContext<ColorModeContextType>({
  mode: LIGHT_THEME,
  toggleColorMode: () => {},
});

interface ToggleColorModeReturn {
  mode: string;
  colorMode: {
    toggleColorMode: () => void;
  };
}

export function ToggleColorMode(): ToggleColorModeReturn {
  const [mode, setMode] = React.useState<string>(LIGHT_THEME);
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        console.log(mode);
        setMode((prevMode) => (prevMode === LIGHT_THEME ? DARK_THEME : LIGHT_THEME));
      },
    }),
    [],
  );
  return { mode, colorMode };
}
