import React from 'react';
import { DARK_THEME, LIGHT_THEME } from '../utils/constants';

export default React.createContext({ mode: LIGHT_THEME, toggleColorMode: () => {} });

export function ToggleColorMode() {
  const [mode, setMode] = React.useState(LIGHT_THEME);
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
