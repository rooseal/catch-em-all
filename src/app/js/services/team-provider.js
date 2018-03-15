import { createContext } from 'react'

function addPokemon (state, pokemon) {
  const { team } = state.team

  return {
    ...state,
    team: team.push(pokemon)
  }
}

export default createContext({ team: [] })
