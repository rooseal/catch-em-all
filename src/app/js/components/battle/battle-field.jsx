import React from 'react'

import PokeTag from '../team/poke-item-4'

import { getStartHealth, attack } from '../../services/pokemon-service'

const PLAYER = Symbol('player')
const OPPONENT = Symbol('opponent')

const names = {
  [PLAYER]: 'You',
  [OPPONENT]: 'Opponent'
}

class BattleField extends React.Component {
  state = {
    [OPPONENT]: this.props.player ? {...this.props.opponent, health: getStartHealth(this.props.opponent)} : undefined,
    [PLAYER]: this.props.player ? {...this.props.player, health: getStartHealth(this.props.player)} : undefined,
    log: {
      [OPPONENT]: [],
      [PLAYER]: []
    },
    simulationSpeed: this.props.simulationSpeed || 200
  }

  componentDidMount () {
    const { [PLAYER]: player, [OPPONENT]: opponent, simulationSpeed } = this.state

    // Setup actions timelines
    this.actionsOpponent = setInterval(() => this.handleAction(OPPONENT), opponent.stats.speed * simulationSpeed)
    this.actionsPlayer = setInterval(() => this.handleAction(PLAYER), player.stats.speed * simulationSpeed)
  }

  getOther = side => {
    return side === PLAYER ? OPPONENT : PLAYER
  }

  handleAction = side => {
    let other = this.getOther(side)
    let result = attack(this.state[side], this.state[other])

    this.setState(state => {
      // Check log concat for one liner instead of push
      console.log('side', side, 'other', other)
      let log = state.log[side]
      let health = state[other].health - result.damage
      let message = `${names[side]} used ${result.ability} for ${result.damage} damage. My hp is ${state[side].health}`

      log.push(message)

      return { [other]: {...state[other], health}, log: {...state.log, [side]: log} }
    }, () => {
      this.handleEnd(side)
    })
  }

  handleEnd = side => {
    if (this.state[side].health <= 0) {
      if (side === OPPONENT) {
        this.setState({
          endMessage: `You have won this fight`,
          score: 1
        }, () => console.log(this.state.endMessage))
      } else {
        this.setState({
          endMessage: `You have lost this fight`,
          score: 0
        }, () => console.log(this.state.endMessage))
      }
      clearInterval(this.actionsOpponent)
      clearInterval(this.actionsPlayer)
      this.actionsOpponent = undefined
      this.actionsPlayer = undefined
    }
  }

  render () {
    const { [PLAYER]: player, [OPPONENT]: opponent, log, endMessage } = this.state
    const currentHp = {
      [PLAYER]: (opponent.health / getStartHealth(opponent)) * 100,
      [OPPONENT]: (player.health / getStartHealth(player)) * 100
    }

    return (
      <div>
        <div className="flex-parent" style={{justifyContent: 'space-around'}}>
          <div>
            <PokeTag pokemon={opponent} />
            <div style={{height: '20px', width: Math.max(0, currentHp[PLAYER]) + '%', backgroundColor: currentHp[PLAYER] > 70 ? 'green' : currentHp[PLAYER] > 30 ? 'orange' : 'red'}} />
            {
              log[OPPONENT].map(message => <p>{message}</p>)
            }
          </div>
          <div>
            <PokeTag pokemon={player} />
            <div style={{transition: `all ${player.stats.speed * this.state.simulationSpeed}ms`, height: '20px', width: Math.max(0, currentHp[OPPONENT]) + '%', backgroundColor: currentHp[OPPONENT] > 70 ? 'green' : currentHp[OPPONENT] > 30 ? 'orange' : 'red'}} />
            {
              log[PLAYER].map(message => <p>{message}</p>)
            }
          </div>
        </div>
        <div>
          {
            endMessage !== undefined && endMessage
          }
        </div>
      </div>
    )
  }
}

export default BattleField
