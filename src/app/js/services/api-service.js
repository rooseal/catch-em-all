import axios from 'axios'

// Fetch base pokemon and extend the PokemonSmarts
export async function getBaseData (name) {
  let base
  try {
    base = await axios.get(`http://localhost:3000/pokemon/${name}`).then(res => res.data)
  } catch (Error) {
    throw new Error('An error occurred retreiving the pokemon data')
  }
  console.log('Base', base)
  return base
}
