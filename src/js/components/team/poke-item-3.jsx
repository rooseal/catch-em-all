import React from 'react'

const styles = {
  container: {
    position: 'relative',
    width: '400px',
    height: '200px',
    marginTop: '50px',
    borderTop: '1px solid darkgray',
    textAlign: 'left'
  },
  image: {
    width: '100px',
    height: '100px',
    position: 'absolute',
    left: '150px',
    top: '-50px',
    backgroundColor: 'white',
    border: '1px solid darkgray'
  },
  decorative: {
    textAlign: 'center',
    margin: '0',
    color: 'royalblue',
    fontSize: '20px',
    fontWeight: 'bold',
    width: '50%',
    lineHeight: '50px'
  },
  left: {
    marginRight: '55px',
    textAlign: 'center'
  },
  right: {
    marginLeft: '55px',
    textAlign: 'center'
  },
  text: {
    textAlign: 'center',
    color: '#333',
    fontSize: '12px',
    margin: '10px'
  },
  info: {
    display: 'flex',
    justifyContent: 'space-around',
    fontSize: '20px',
    fontWeight: 'bold',
    marginTop: '20px',
    color: '#666'
  }
}

const PokeItem3 = props => {
  const { pokemon = {}, onClick = () => {}, empty = false } = props

  return (
    <div style={styles.container} onClick={onClick.bind(null, pokemon)}>
      <img style={styles.image} src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${pokemon.number}.png`} />
      <div style={{display: 'flex'}}>
        <div style={Object.assign({}, styles.decorative, styles.left)}>{pokemon.name}</div>
        <div style={Object.assign({}, styles.decorative, styles.right)}>{pokemon.category}</div>
      </div>
      <div style={styles.info}>
        { pokemon.level }
      </div>
      <div style={styles.text}>
        {
          pokemon.text
        }
      </div>
    </div>
  )
}

export default PokeItem3
