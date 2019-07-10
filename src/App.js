import React from 'react';
import Routes from './Routes';
import CssBaseline from '@material-ui/core/CssBaseline';
import './App.css';

function App() {
  return (
    <>
      {/* <div className="logo">Testing Logo Font (Open Sans)</div> */}

      {/* <Navigation  /> */}
      <div className="container">
        <div className="container-inner">
          <Routes />
        </div>
      </div>
      <CssBaseline />
    </>
  );
}

export default App;
