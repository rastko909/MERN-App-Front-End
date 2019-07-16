import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Form from './components/Claim/Form';
import AdminLogin from './components/Admin/Login';
import ClaimLogin from './components/Claim/Login';
import Dashboard from './components/Admin/Dashboard';
import NewBusiness from './components/Admin/NewBusiness';
import Claim from './components/Claim/Claim'
import { AdminPrivate } from './AdminPrivate';
import { ClaimPrivate } from './ClaimPrivate';




class Routes extends React.Component {
  render() {
    // const { podcasts, deletePodcast } = this.props
    return (

      <Switch>
        <Route exact path="/" component={Home} /> 
        <Route exact path="/admin/login" component={AdminLogin} /> 
        <Route exact path="/claim/login" component={ClaimLogin} /> 
        <Route exact path="/claim/new" component={Form} />
        <ClaimPrivate exact path="/claim" component={Claim} />
        <AdminPrivate exact path="/admin/dashboard/business/new" component={NewBusiness} />
        <AdminPrivate exact path="/admin/dashboard" component={Dashboard} />

        
        {/* <Route path="/" render={() => {
          return <Home podcasts={podcasts} deletePodcast={deletePodcast} />
        }} /> */}

        {/* <Route path="/register" render={() => {
          return <Register register={this.props.register} authentication={authentication} />
        }} /> */}

        {/* <Route path="/login" render={() => {
          return <Login login={this.props.login} authentication={authentication} />
        }} /> */}

      </Switch>
    )
  }
}

export default Routes;