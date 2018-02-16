import pokemonData from '../../data/pokemon/pokemon.json'

export function getPokemonTeam () {
  return [{
    name: 'charmander',
    id: '054896',
    level: 10,
    stats: {
      'hp': 30,
      'attack': 4,
      'defense': 3,
      'sp-attack': 4,
      'sp-defense': 3,
      'speed': 5
    }
  },
  {
    name: 'charizard',
    id: '054897',
    level: 22,
    stats: {
      'hp': 67,
      'attack': 9,
      'defense': 4,
      'sp-attack': 10,
      'sp-defense': 8,
      'speed': 9
    }
  },
  {
    name: 'bulbasaur',
    id: '053256',
    level: 5,
    stats: {
      'hp': 6,
      'attack': 3,
      'defense': 2,
      'sp-attack': 3,
      'sp-defense': 2,
      'speed': 3
    }
  },
  {
    name: 'wartortle',
    id: '053215',
    level: 9,
    stats: {
      'hp': 12,
      'attack': 5,
      'defense': 7,
      'sp-attack': 4,
      'sp-defense': 4,
      'speed': 5
    }
  }
  ]
}

export function getPokemonData () {
  return pokemonData
}
