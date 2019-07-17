import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import checkToken from '../helpers/CheckTokenAdmin'

export const AdminPrivate = ({ component: Component, ...rest }) => {
  return (
    <Route {...rest}
      render= {props => {
        const path = props.location.pathname
        checkToken(path).then((result) => {
          if (result === true) { 
            console.log("checkToken === true");
            return ( <Component {...props} />)
          } else {
            console.log("checkToken === false");
            return ( 
              <Redirect
                to={{
                  pathname:"/admin/login",
                  state: { from: props.location }
                }}
              />
            )
          }
        });

      }}
    />
  )
};
