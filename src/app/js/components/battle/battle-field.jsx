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
    [OPPONENT]: this.props.opponent,
    [PLAYER]: this.props.player,
    log: {
      [OPPONENT]: [],
      [PLAYER]: []
    },
    turn: 0,
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

    order.forEach((attackerRef, i) => {
      let attacker = this.state[attackerRef]
      let defenderRef = this.getOther(attackerRef)
      let defender = this.state[defenderRef]
      let result = attacker.attack(defender)

      this.setState(state => {
        // Check log concat for one liner instead of push
        let log = state.log[attackerRef]
        let message = `${state.turn}. ${names[attackerRef]} used ${result.ability} for ${result.damage} damage. My hp is ${attacker.currentHealth}`

        log.push(message)

        return { [defenderRef]: defender.damage(result.damage), log: {...state.log, [attackerRef]: log}, turn: state.turn + 1 }
      }, () => {
        this.handleEnd()
      })
    })
  }

  handleEnd = () => {
    if (this.state[OPPONENT].currentHealth <= 0) {
      this.setState({
        endMessage: `You have won this fight`,
        score: 1
      }, () => console.log(this.state.endMessage))
      clearInterval(this.turn)
      this.turn = undefined
    }
    if (this.state[PLAYER].currentHealth <= 0) {
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
      [PLAYER]: (opponent.currentHealth / opponent.calculateMaxHealth()) * 100,
      [OPPONENT]: (player.currentHealth / player.calculateMaxHealth()) * 100
    }

    console.log(player, opponent)

    return (
      <div>
        <div className="flex-parent" style={{justifyContent: 'space-around'}}>
          <div>
            <PokeTag pokemon={opponent} />
            <div style={{transition: `all ${this.state.simulationSpeed}ms linear`, height: '20px', width: Math.max(0, currentHp[PLAYER]) + '%', backgroundColor: currentHp[PLAYER] > 70 ? 'green' : currentHp[PLAYER] > 30 ? 'orange' : 'red'}} />
          </div>
          <div style={{width: '50%'}}>
            {
              log[PLAYER].concat(log[OPPONENT])
                .sort()
                .map((message, i) => {
                  let align = message.indexOf('Opponent') !== -1 ? 'left' : 'right'

                  return <p style={{textAlign: align}} key={message + i}>{message}</p>
                })
            }
          </div>
          <div>
            <PokeTag pokemon={player} />
            <div style={{transition: `all ${this.state.simulationSpeed}ms linear`, height: '20px', width: Math.max(0, currentHp[OPPONENT]) + '%', backgroundColor: currentHp[OPPONENT] > 70 ? 'green' : currentHp[OPPONENT] > 30 ? 'orange' : 'red'}} />
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
