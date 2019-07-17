import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import checkToken from './helpers/CheckToken'


export default class AdminPrivate extends React.Component {
  constructor(...rest) {
    super();
  }

  state = {
    auth: null,
  }

  componentDidMount = async (...rest) => {
    let response = await checkToken();
    this.setState({ auth: response });
  }

  render = () => {
    const Component = this.props.component;

    if (this.state.auth === null)
      return null;

    if (this.state.auth) {
      return (
        <Component />
      );
    } else {
      return (
        <Redirect
          to={{
            pathname:"/admin/login",
            state: { from: this.props.location }
          }}
        />
      )
    }
  }
}
