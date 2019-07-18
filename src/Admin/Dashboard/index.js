import React from 'react';
import DashboardHome from './components/DashboardHome';

export default class Dashboard extends React.Component {

  state = {
    view: 'dashboard',
  };

  setView = (view) => {
    this.setState({ view: view })
  }


  convertStatus = (number) => {
    const statuses = ["new", "open", "pending", "closed"];

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

  render = () => { 
    return (
      <>
        <DashboardHome functions={this.usableFunctions()} />
      </>
    );
  }
}