import React from 'react'
import { Link } from 'react-router-dom'

export default props => (
  <div>
    <button onClick={props.onRandom}>get random pokemon</button>
    <button onClick={props.onRelease}>release a pokemon</button>
    <button><Link to="/">View Team</Link></button>
  </div>
)
