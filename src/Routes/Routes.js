import React from 'react';
import '../App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from '../Home';
import ClaimForm from '../Claim/Form';
import ClaimLogin from '../Claim/Login';
import AdminLogin from '../Admin/Login';
import AdminDashboard from '../Admin/Dashboard';
import AdminPrivate from './AdminPrivate';
import NotFound from '../Shared/NotFound'

export default class Routes extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/claim" component={ClaimLogin} /> 
          <Route exact path="/claim/new" component={ClaimForm} />
          <Route exact path="/admin/login" component={AdminLogin} /> 
          <AdminPrivate exact path="/admin/dashboard" component={AdminDashboard} />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    )
  }
}
