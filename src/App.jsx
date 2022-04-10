/* eslint-disable no-unused-vars */
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React from 'react';
import './App.css';
import { HashRouter as Router } from 'react-router-dom';
import Layout from './components/utils/Layout';
import ColorModeContext from './contexts/ColorModeContext';
import ContextsSetter from './contexts/ContextsSetter';

function App() {
  const { mode } = React.useContext(ColorModeContext);
  const theme = React.useMemo(
    () => createTheme({
      palette: {
        mode,
        primary: {
          main: '#00cf85',
          dark: '#92766c',
          contrastText: 'rgba(255,255,255,0.87)',
        },
        secondary: {
          main: '#ffd54f',
        },
      },
    }),
    [mode],
  );

  return (
    <Router>
      <ContextsSetter>
        <ThemeProvider theme={theme}>
          {/* TODO: Fix dark theme */}
          <Layout className="Layout" />
        </ThemeProvider>
      </ContextsSetter>
    </Router>
  );
}

export default App;
