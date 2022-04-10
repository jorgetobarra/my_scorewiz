/* eslint-disable react/prop-types */
import React from 'react';
import ColorModeContext, { ToggleColorMode } from './ColorModeContext';
import GoBackContext, { ToggleGoBack } from './GoBackContext';
import SnackbarContext, { OpenSnackBar } from './SnackbarContext';

export default function ContextsSetter({ children }) {
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
