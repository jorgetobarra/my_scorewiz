import { createTheme, ThemeProvider } from '@mui/material/styles';
import React from 'react';
import './App.css';
import { HashRouter as Router } from 'react-router-dom';
import Layout from './components/utils/Layout';
import {useColorModeContext} from './contexts/ColorModeContext';
import ContextsSetter from './contexts/ContextsSetter';

function App(): React.ReactElement {
  const { mode } = useColorModeContext();
  const theme = React.useMemo(
    () => createTheme({
      palette: {
        mode: mode as 'light' | 'dark',
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
