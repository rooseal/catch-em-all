import React from 'react'
import { Link } from 'react-router-dom'

export default props => (
  <div style={{marginBottom: '50px'}}>
    <Link to="/"><button>Team</button></Link>
    <Link to="/pokedex"><button>Pokedex</button></Link>
    <Link to="/battle"><button>Battle</button></Link>
  </div>
)
