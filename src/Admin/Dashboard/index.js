import React from 'react';
import Home from './components/Home';
import { Redirect } from 'react-router-dom';

export default class Dashboard extends React.Component {

  state = {
    view: {
      name: 'openclaims',
      id: undefined,
      data: undefined, 
    },
  };

  setView = (viewObject) => {
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
    const { view } = this.state;

    if (view.name === "logout")
      return <Redirect to="/admin/login" />

    return (
      <Home view={view} functions={this.usableFunctions()} />
    );
  }
}