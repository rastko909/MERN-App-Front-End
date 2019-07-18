import React from 'react';
import DashboardHome from './components/DashboardHome';

export default class Dashboard extends React.Component {
  
  state = {
    view: 'dashboard',
  };

  setView = (view) => {
    console.log("If I see this I went deep!");
    this.setState({ view: view })
  }

  render = () => { 
    return (
      <>
        <DashboardHome setView={this.setView} />
      </>
    );
  }
}