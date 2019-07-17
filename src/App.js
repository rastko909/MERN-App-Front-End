import React from 'react';
import Routes from './Routes/Routes';
import CssBaseline from '@material-ui/core/CssBaseline';
import './App.css';

class App extends React.Component {

  render() {
    return (
      <div className="container">
        <div className="container-inner">
          <Routes />
          <CssBaseline />
        </div>
      </div>
    )
  }
}

export default App;
