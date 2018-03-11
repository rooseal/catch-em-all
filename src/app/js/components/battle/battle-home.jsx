import React from 'react'
import { Link, Route } from 'react-router-dom'

import ComingSoon from '../coming-soon'
import { BattleComp, BattleRoom } from './'

export default props => {
  return (
    <React.Fragment>
      { props.match.isExact &&
        <div className="battle-home-container">
          <div className="battle-option">
            <h2>Pokemon battles</h2>
            <p className="text">
              If you want to improve your current pokemons you can battle versus other random pokemons. This will allow them to gain experience upon victory.
              You won't be able to acquire new pokemons this way but it is the only way to gain in strength and be able to challenge other players successfuly.
            </p>
            <Link to="/battle/comp"><button className='animated' style={{width: '50%', margin: '50px auto 20px'}}>Find pokemons</button></Link>
          </div>
          <div className="battle-option" style={{position: 'relative'}}>
            <ComingSoon />
            <h2>Trainer battles</h2>
            <p className="text">
              When you feel confident in your pokemons abilities you can enter the in the arena versus pokemons of your friends. Be warned however.
              The victor of the battle will receive the losing pokemon as price. There is no experience to be gained this way, only new pokemons.
              If you want to get all pokemons this is the way to go.
            </p>
            <button className='animated' style={{width: '50%', margin: '50px auto 20px'}}>Find friends</button>
          </div>
        </div>
      }

      <Route path="/battle/comp" component={BattleComp} />
      <Route path="/battle/room" component={BattleRoom} />
    </React.Fragment>
  )
}

// <Route path="/battle/friends" component={BattleFriends} />
