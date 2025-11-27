import React from 'react';
import ColorModeContext, { ToggleColorMode } from './ColorModeContext';
import GoBackContext, { ToggleGoBack } from './GoBackContext';
import SnackbarContext, { OpenSnackBar } from './SnackbarContext';

interface ContextsSetterProps {
  children: React.ReactNode;
}

export default function ContextsSetter({ children }: ContextsSetterProps): React.ReactElement {
  return (
    <ColorModeContext.Provider value={ToggleColorMode()}>
      <GoBackContext.Provider value={ToggleGoBack()}>
        <SnackbarContext.Provider value={OpenSnackBar()}>
          { children }
        </SnackbarContext.Provider>
      </GoBackContext.Provider>
    </ColorModeContext.Provider>
  );
}
