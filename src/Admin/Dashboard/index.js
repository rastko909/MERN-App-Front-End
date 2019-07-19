import React from 'react';
// import CssBaseline from '@material-ui/core/CssBaseline';

// import DashboardHome from './components/DashboardHome';
// import Navbar from './components/Navbar';
// import Sidebar from './components/Sidebar';

import Home from './components/Home';
// import './index.css';

export default class Dashboard extends React.Component {

  state = {
    view: {
      name: 'openclaims',
      id: undefined,
      data: undefined, 
    },
  };

  setView = (viewObject) => {
    console.log("------------ index.js: setView() ------------------");
    console.log("setView: {name}:", viewObject.name);
    console.log("setView: {id}:", viewObject.id);
    console.log("setView: {data}:", viewObject.data);
    console.log("----------------------- END -----------------------");

    this.setState({
      view: {
        name: viewObject.name || undefined,
        id: viewObject.id || undefined,
        data: viewObject.data || undefined,
      }
    })
  }

  convertStatus = (number) => {
    const statuses = ["New", "Open", "Pending", "Closed"];

    if (number > (statuses.length - 1))
      return statuses[0];
    else
      return statuses[number];
  };

  convertPriority = (number) => {
    const priorities = ["Urgent", "High", "Medium", "Low"];
    return priorities[number];
  };

  usableFunctions = () => {
    return {
      setView: this.setView,
      convertStatus: this.convertStatus,
      convertPriority: this.convertPriority,
    };
  }

  handleView = () => {
    switch(this.state.view) {
      case 'claims':
        return 

      default:
        return null;
    }
  }

  render = () => {
    return (
      <Home view={this.state.view} functions={this.usableFunctions()} />
    );
  }
}