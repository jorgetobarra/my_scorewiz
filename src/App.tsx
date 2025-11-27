import React from "react";
import "./App.css";
import { HashRouter as Router } from "react-router-dom";
import Layout from "./components/utils/Layout";
import ContextsSetter from "./contexts/ContextsSetter";
import { LocalThemeProvider } from './utils/LocalThemeProvider';

function App(): React.ReactElement {
  return (
    <Router>
      <ContextsSetter>
        <LocalThemeProvider>
          <Layout className="Layout" />
        </LocalThemeProvider>
      </ContextsSetter>
    </Router>
  );
}

export default App;
