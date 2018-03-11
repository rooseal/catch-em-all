import React from 'react'

import Auth from '../services/auth'

class TopMenu extends React.Component {
  render () {
    return (
      <header className="top-menu">
        <div className="top-menu-user" style={{float: 'right'}}>
          {
            Auth.isAuth()
              ? (
                <React.Fragment>
                  <img className="avatar" src="" />
                  { Auth.getUser() }
                </React.Fragment>
              )
              : (
                <React.Fragment>
                  You are not logged in
                </React.Fragment>
              )
          }
        </div>
        <h1 className="alt-text">
          <span onClick={() => this.setState(state => ({sideMenu: {...state.sideMenu, open: !state.sideMenu.open}}))} style={{marginRight: '20px', color: 'white', fontWeight: 'bold', cursor: 'pointer'}}>&#x39e;</span>
          Collect all pokemons
        </h1>
      </header>
    )
  }
}

export default TopMenu
