import React from 'react'

export default props => (
  <div>
    <button onClick={props.onRandom}>get random pokemon</button>
    <button onClick={props.onRelease}>release a pokemon</button>
    <button>go to battle map</button>
  </div>
)
