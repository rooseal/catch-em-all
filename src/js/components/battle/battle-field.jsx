import React from 'react'

import { getStartHealth } from '../../services/pokemon-service'

const PLAYER = Symbol('player')
const OPPONENT = Symbol('opponent')

class BattleField extends React.Component {
  state = {
    [OPPONENT]: {...this.props.opponent, health: getStartHealth(this.props.opponent)},
    [PLAYER]: {...this.props.player, health: getStartHealth(this.props.player)},
    log: []
  }

  componentDidMount () {
    const { [PLAYER]: player, [OPPONENT]: opponent } = this.state

    // Setup actions timelines
    this.actionsOpponent = setInterval(() => this.handleAction(OPPONENT), opponent.stats.speed * this.props.simulationSpeed)
    this.actionsPlayer = setInterval(() => this.handleAction(PLAYER), player.stats.speed * this.props.simulationSpeed)
  }

  handeAction = side => {
    let damage = 5
    let message = {
      text: `${side} attacked for ${damage} damage`,
      side
    }

    this.setState(state => {
      // Check log concat for one liner instead of push
      let log = state.log
      let health = state[side].health - damage

      log.push(message)

      return { [side]: {...state[side], health}, log }
    })
  }

  handleEnd = side => {
    if (this.state[side].health <= 0) {
      if (side === OPPONENT) {
        this.setState({
          endMessage: `You have won this fight`,
          score: 1
        })
      } else {
        this.setState({
          endMessage: `You have lost this fight`,
          score: 0
        })
      }
    }
  }

  render () {
    const { [PLAYER]: player, [OPPONENT]: opponent, log, endMessage } = this.state

    return (
      <div>
        <div style={{borderBottom: '1px solid black'}}>
          <div style={{fontSize: '14px', float: 'left'}}>
            {opponent.name}
            <div style={{height: '20px', width: '200px', backgroundColor: 'orange'}} />
          </div>
          <div style={{fontSize: '14px', float: 'left'}}>
            {opponent.name}
            <div style={{height: '20px', width: '200px', backgroundColor: 'orange'}} />
          </div>
        </div>
        <div>
          <p>Start of battle</p>
          {
            log.map(message => <p style={{textAlign: message.side === OPPONENT ? 'left' : 'right'}}>{message.text}</p>)
          }
          {
            endMessage !== undefined && endMessage
          }
        </div>
      </div>
    )
  }
}