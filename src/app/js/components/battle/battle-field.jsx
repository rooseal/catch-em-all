import React from 'react'

import PokeTag from '../team/poke-tag'

const PLAYER = Symbol('player')
const OPPONENT = Symbol('opponent')

const names = {
  [PLAYER]: 'You',
  [OPPONENT]: 'Opponent'
}

class BattleField extends React.Component {
  state = {
    [OPPONENT]: this.props.player ? this.props.opponent.preparation() : undefined,
    [PLAYER]: this.props.player ? this.props.player.preparation() : undefined,
    log: {
      [OPPONENT]: [],
      [PLAYER]: []
    },
    simulationSpeed: this.props.simulationSpeed || 500
  }

  componentDidMount () {
    const { simulationSpeed } = this.state

    // Setup actions timelines
    // this.actionsOpponent = setInterval(() => this.handleAction(OPPONENT), opponent.stats.speed * simulationSpeed)
    // this.actionsPlayer = setInterval(() => this.handleAction(PLAYER), player.stats.speed * simulationSpeed)

    this.turn = setInterval(() => this.handleTurn(), simulationSpeed)
  }

  getOther = side => {
    return side === PLAYER ? OPPONENT : PLAYER
  }

  handleTurn = () => {
    let { [OPPONENT]: opponent, [PLAYER]: player } = this.state
    let order = opponent.stats.speed > player.stats.speed ? [OPPONENT, PLAYER] : [PLAYER, OPPONENT]

    order.forEach((attacker, i) => {
      let defender = this.getOther(attacker)
      let result = attacker.attack(this.state[defender])

      this.setState(state => {
        // Check log concat for one liner instead of push
        let log = state.log[attacker]
        let health = state[defender].health - result.damage
        let message = `${names[attacker]} used ${result.ability} for ${result.damage} damage. My hp is ${state[attacker].health}`

        log.push(message)

        return { [defender]: {...state[defender], health}, log: {...state.log, [attacker]: log} }
      }, () => {
        this.handleEnd()
      })
    })
  }

  handleEnd = () => {
    if (this.state[OPPONENT].health <= 0) {
      this.setState({
        endMessage: `You have won this fight`,
        score: 1
      }, () => console.log(this.state.endMessage))
      clearInterval(this.turn)
      this.turn = undefined
    }
    if (this.state[PLAYER].health <= 0) {
      this.setState({
        endMessage: `You have lost this fight`,
        score: 0
      }, () => console.log(this.state.endMessage))
      clearInterval(this.turn)
      this.turn = undefined
    }
  }

  render () {
    const { [PLAYER]: player, [OPPONENT]: opponent, log, endMessage } = this.state
    const currentHp = {
      [PLAYER]: (opponent.currentHealth / opponent.maxHealth()) * 100,
      [OPPONENT]: (player.currentHealth / player.maxHealth()) * 100
    }

    return (
      <div>
        <div className="flex-parent" style={{justifyContent: 'space-around'}}>
          <div>
            <PokeTag pokemon={opponent} />
            <div style={{height: '20px', width: Math.max(0, currentHp[PLAYER]) + '%', backgroundColor: currentHp[PLAYER] > 70 ? 'green' : currentHp[PLAYER] > 30 ? 'orange' : 'red'}} />
            {
              log[OPPONENT].map((message, i) => <p key={message + i}>{message}</p>)
            }
          </div>
          <div>
            <PokeTag pokemon={player} />
            <div style={{transition: `all ${this.state.simulationSpeed}ms linear`, height: '20px', width: Math.max(0, currentHp[OPPONENT]) + '%', backgroundColor: currentHp[OPPONENT] > 70 ? 'green' : currentHp[OPPONENT] > 30 ? 'orange' : 'red'}} />
            {
              log[PLAYER].map((message, i) => <p key={message + i}>{message}</p>)
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
