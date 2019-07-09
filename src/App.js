import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import './App.css';

function App() {
  return (
    <>
    <div className="logo">Testing Logo Font (Open Sans)</div>
    <div>Testing Body Font (Roboto)</div>
    <CssBaseline />
    <Button variant="contained" color="primary">
      Hello World
    </Button>
    </>
  );
}

export default App;
