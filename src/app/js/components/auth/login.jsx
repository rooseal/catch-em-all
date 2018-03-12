import React from 'react'
import { Redirect } from 'react-router-dom'

import authService from '../../services/auth'

class Login extends React.Component {
  state = {
    loginUsername: '',
    loginPassword: '',
    signupUsername: '',
    signupPassword: '',
    signupPassword2: '',
    loggedIn: authService.isAuth()
  }

  handleLogin = async e => {
    const loggedIn = await authService.login(this.state.username, this.state.password)

    this.setState({
      loggedIn
    })
  }

  handleChangeLoginName = e => this.setState({
    loginUsername: e.target.value
  })

  handleChangeLoginPassword = e => this.setState({
    loginPassword: e.target.value
  })

  handleChangeSignupName = e => this.setState({
    signupUsername: e.target.value
  })

  handleChangeSignupPassword = e => this.setState({
    signupPassword: e.target.value
  })

  handleChangeSignupPassword2 = e => this.setState({
    signupPassword2: e.target.value
  })

  render () {
    return (
      this.state.loggedIn
        ? <Redirect to="/" />
        : (
          <div className="flex-parent" style={{justifyContent: 'space-evenly', alignItems: 'flex-end'}}>
            <div style={{padding: '20px'}}>
              <p className="decorative1">Already a member</p>
              <input type="text" placeholder="email adress" value={this.state.loginUsername} onChange={this.handleChangeLoginName} />
              <input type="password" placeholder="password" value={this.state.loginPassword} onChange={this.handleChangeLoginPassword} />
              <button onClick={this.handleLogin}>login</button>
            </div>
            <div style={{padding: '20px'}}>
              <p className="decorative1">First time visitor</p>
              <input type="text" placeholder="email adress" value={this.state.signupUsername} onChange={this.handleChangeSignupName} />
              <input type="password" placeholder="Choose password" value={this.state.signupPassword} onChange={this.handleChangeSignupPassword} />
              <input type="password" placeholder="Repeat password" value={this.state.signupPassword2} onChange={this.handleChangeSignupPassword2} />
              <button onClick={this.handleSignup}>Signup</button>
            </div>
          </div>
        )
    )
  }
}

export default Login
