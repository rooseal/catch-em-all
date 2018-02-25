import React from 'react'
import { Link, Route } from 'react-router-dom'

import { BattleComp, BattleFriends } from './'

export default props => {
  return (
    <React.Fragment>
      { props.match.isExact &&
        <div>
          <div>
            <p className="text">
              If you want to improve your current pokemons you can battle versus other random pokemons. This will allow them to gain experience upon victory.
              You won't be able to acquire new pokemons this way but it is the only way to gain in strength and be able to challenge other players successfuly.
            </p>
            <Link to="/battle/comp"><button className="big-button">Battle Pokemons</button></Link>
          </div>
          <div>
            <p className="text">
              When you feel confident in your pokemons abilities you can enter the in the arena versus pokemons of your friends. Be warned however.
              The victor of the battle will receive the losing pokemon as price. There is no experience to be gained this way, only new pokemons.
              If you want to get all pokemons this is the way to go.
            </p>
            <Link to="/battle/friends"><button className="big-button">Battle Friends</button></Link>
          </div>
        </div>
      }

      <Route path="/battle/comp" component={BattleComp} />
      <Route path="/battle/friends" component={BattleFriends} />
    </React.Fragment>
  )
}
