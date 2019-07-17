import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import checkToken from './helpers/CheckTocken'

export const AdminPrivate = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render= {props => {
        const path = props.location.pathname
        if (checkToken(path) === true) { 
          return ( <Component {...props} />)
        } else {
          return ( 
            <Redirect
              to={{
                pathname:"/admin/login",
                state: { from: props.location }
              }}
            />
          )
        }
      }}
    />
  )
};
