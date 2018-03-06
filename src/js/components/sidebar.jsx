import React from 'react'
import { Link } from 'react-router-dom'

const styles = {
  container: {
    top: '0',
    bottom: '0',
    width: '200px',
    position: 'fixed',
    backgroundColor: 'lavender',
    boxShadow: '2px 2px 10px rgba(0, 0, 0, 0.4)'
  }
}

export default props => {
  const dynamicStyles = {
    [props.side]: '0',
    width: props.width || '200px'
  }

  const container = Object.assign({}, styles.container, dynamicStyles)

  return (
    <div style={container}>
      {props.children}
    </div>
  )
}
