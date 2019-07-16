import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Form from './components/Claim/Form';
import AdminLogin from './components/Admin/Login';
import ClaimLogin from './components/Claim/Login';
import Dashboard from './components/Admin/Dashboard';
import NewBusiness from './components/Admin/NewBusiness';



class Routes extends React.Component {
  render() {
    // const { podcasts, deletePodcast } = this.props
    return (

      <Switch>

        <Route exact path="/" component={Home} /> 
        <Route path="/admin/login" component={AdminLogin} /> 
        <Route exact path="/claim" component={ClaimLogin} /> 
        <Route path="/claim/new" component={Form} />
        <Route exact path="/admin/dashboard/business/new" component={NewBusiness} />
        <Route exact path="/admin/dashboard" component={Dashboard} />

        
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