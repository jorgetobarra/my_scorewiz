import React from 'react';
import { DARK_THEME, LIGHT_THEME } from '../utils/constants';

interface ColorModeContextType {
  mode: string;
  toggleColorMode: () => void;
}

export const ColorModeContext = React.createContext<ColorModeContextType | undefined>(undefined);

export function ColorModeContextProvider({ children }: React.PropsWithChildren<{}>) {
  const [mode, setMode] = React.useState<string>(LIGHT_THEME);
  const toggleColorMode = () => {
    console.log(mode);
    setMode((prevMode) => (prevMode === LIGHT_THEME ? DARK_THEME : LIGHT_THEME));
  };

  return (<ColorModeContext.Provider value={{ mode, toggleColorMode }}>
    {children}
  </ColorModeContext.Provider>
  );
}

export const useColorModeContext = (): ColorModeContextType => {
  const context = React.useContext(ColorModeContext);
  if (context === undefined) {
    throw new Error('useColorModeContext must be used within a ColorModeContextProvider');
  }
  return context;
};