import React from 'react';
import '../App.css';
import { Route, Switch } from 'react-router-dom';
import Home from '../components/Home';
import Form from '../components/Claim/Form';
import AdminLogin from '../components/Admin/Login';
import ClaimLogin from '../components/Claim/Login';
import Dashboard from '../components/Admin/Dashboard';
import NewBusiness from '../components/Admin/NewBusiness';
import AdminPrivate from './AdminPrivate';

export default class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/claim" component={ClaimLogin} /> 
        <Route exact path="/claim/new" component={Form} />
        <Route exact path="/admin/login" component={AdminLogin} /> 
        <AdminPrivate exact path="/admin/dashboard" component={Dashboard} />
        <AdminPrivate exact path="/admin/dashboard/business/new" component={NewBusiness} />
      </Switch>
    )
  }
}
