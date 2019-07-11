import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Form from './components/Claim/Form';
import AdminLogin from './components/Admin/Login';
import ClaimLogin from './components/Claim/Login';

class Routes extends React.Component {
  render() {
    // const { podcasts, deletePodcast } = this.props
    return (

      <Switch>

        <Route path="/admin/login" component={AdminLogin} /> 
        <Route path="/claim/login" component={ClaimLogin} /> 
        <Route path="/claim/new" component={Form} />
        
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