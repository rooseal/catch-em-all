import React from 'react'
import { Link } from 'react-router-dom'

import SideBar from './sidebar'

const styles = {
  button: {
    display: 'block',
    margin: '5px 0',
    width: '100%',
    borderBottom: '5px solid royalblue',
    backgroundColor: 'lightgray'
  },
  categoryTitle: {
    lineHeight: '50px',
    fontSize: '16px',
    color: 'gray',
    margin: '0',
    paddingLeft: '10px',
    borderBottom: '1px solid gray'
  },
  topTitle: {
    backgroundColor: 'darkslategray'
  }
}

export default props => (
  <SideBar side="left">
    <p style={Object.assign({}, styles.categoryTitle, styles.topTitle)}><span style={{marginRight: '10px', color: 'black', fontWeight: 'bold'}}>&#x39e;</span>Catch-em-all</p>
    <div style={{marginBottom: '25px'}}>
      <Link to="/"><button style={styles.button}>Team</button></Link>
      <Link to="/pokedex"><button style={styles.button}>Pokedex</button></Link>
      <Link to="/battle"><button style={styles.button}>Battle</button></Link>
    </div>
    <p style={styles.categoryTitle}>Context menu</p>
    <div>
      {
        props.contextMenu
      }
    </div>
  </SideBar>
)
