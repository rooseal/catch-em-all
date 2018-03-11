import React from 'react'
import { Redirect } from 'react-router-dom'

import authService from '../../services/auth'

class Login extends React.Component {
  state = {
    username: '',
    password: '',
    loggedIn: authService.isAuth()
  }

  handleLogin = async e => {
    const loggedIn = await authService.login(this.state.username, this.state.password)

    this.setState({
      loggedIn
    })
  }

  handleChangeName = e => this.setState({
    username: e.target.value
  })

  handleChangePassword = e => this.setState({
    password: e.target.value
  })

  render () {
    return (
      this.state.loggedIn
        ? <Redirect to="/" />
        : (
          <div>
            <input type="text" placeholder="username" value={this.state.username} onChange={this.handleChangeName} />
            <input type="password" placeholder="password" value={this.state.password} onChange={this.handleChangePassword} />
            <button className="big-button" onClick={this.handleLogin}>login</button>
          </div>
        )
    )
  }
}

export default Login
