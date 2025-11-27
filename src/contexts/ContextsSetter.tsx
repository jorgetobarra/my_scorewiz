import React from 'react';
import { SnackbarContextProvider } from './SnackbarContext';
import { GoBackContextProvider } from './GoBackContext';
import { ColorModeContextProvider } from './ColorModeContext';

interface ContextsSetterProps {
  children: React.ReactNode;
}

export default function ContextsSetter({ children }: ContextsSetterProps): React.ReactElement {
  return (
    <ColorModeContextProvider>
      <GoBackContextProvider>
        <SnackbarContextProvider>
          {children}
        </SnackbarContextProvider>
      </GoBackContextProvider>
    </ColorModeContextProvider>
  );
}
