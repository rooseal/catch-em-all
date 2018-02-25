import React from 'react'
import { Link } from 'react-router-dom'

export default props => (
  <div>
    <Link to="/"><button>Team</button></Link>
    <button><Link to="/pokedex">Pokedex</Link></button>
    <button><Link to="/battle">Battle</Link></button>
  </div>
)
