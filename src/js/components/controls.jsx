import React from 'react'
import { Link } from 'react-router-dom'

import SideBar from './sidebar'

export default props => (
  <SideBar {...props}>
    <p className="side-header">
      <span style={{marginRight: '10px', color: 'black', fontWeight: 'bold'}}>&#x39e;</span>
      Catch-em-all
    </p>
    <div style={{marginBottom: '25px'}}>
      <Link to="/"><button className="side-button">Team</button></Link>
      <Link to="/pokedex"><button className="side-button">Pokedex</button></Link>
      <Link to="/battle"><button className="side-button">Battle</button></Link>
    </div>
    <p className="side-title">Context menu</p>
    <div id="context-menu">

    </div>
  </SideBar>
)
