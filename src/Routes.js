import React from 'react';
import './App.css';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Form from './components/Claim/Form';

class Routes extends React.Component {
  render() {
    // const { podcasts, deletePodcast } = this.props
    return (

      <Switch>
        <Route path="/claims/new" component={Form} />

        {/* <Route path="/" render={() => {
          return <Home podcasts={podcasts} deletePodcast={deletePodcast} />
        }} /> */}

        {/* <Route path="/register" render={() => {
          return <Register register={this.props.register} authentication={authentication} />
        }} /> */}

        {/* <Route path="/login" render={() => {
          return <Login login={this.props.login} authentication={authentication} />
        }} /> */}

        {/* <Route path="/search" /> */}
      </Switch>
    )
  }
}

export default Routes;