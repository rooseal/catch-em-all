import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'

import Auth from '../../services/auth'

const PrivateRoute = ({ component: Component, render: Render, ...rest }) => (
  <Route {...rest } render={props => {
    return (
      Auth.isAuth()
        ? Component !== undefined
          ? <Component {...props} />
          : <Render {...props} />
        : <Redirect to="/login" />
    )
  }} />
)

export default PrivateRoute
