import React from 'react'

import TeamProvider from '../../services/team-provider'

class BatlleRoom extends React.Component {
  render () {
    const { opponent } = this.props

    return (
      <TeamProvider.Consumer>
        {(context => {
          return (
            <div>
              <h1>Battle Room</h1>
              {
                this.state.ownPokemon === undefined
                  ? (
                    <div>
                      <h2>Choose your own pokemon to battle</h2>
                      {
                        context.team.map(pokemon => <p>{pokemon}</p>)
                      }
                    </div>
                  )
                  : (
                    <div>
                      <h2>{this.state.ownPokemon} vs {opponent}</h2>
                    </div>
                  )
              }
            </div>
          )
        })}
      </TeamProvider.Consumer>
    )
  }
}
