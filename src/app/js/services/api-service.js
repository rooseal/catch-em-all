import axios from 'axios'

// Set host
const host = `http://localhost:3000`

// Fetch base pokemon and extend the PokemonSmarts
export async function getBaseData (name) {
  let base
  try {
    base = await axios.get(`${host}/pokemon/${name}`).then(res => res.data)
  } catch (Error) {
    throw Error('An error occurred retreiving the pokemon data')
  }
  return base
}

export async function getPokemonList (start, end) {
  let list
  try {
    list = await axios.get(`${host}/pokemons/${start}/${end}`).then(res => res.data)
  } catch (Error) {
    throw Error('An error occurred retreiving the pokemon data')
  }
  return list
}
