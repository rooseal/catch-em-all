import React from 'react'
import { Link } from 'react-router-dom'

export default ({side = 'left', width = '200px', open = false, ...props}) => {
  const dynamicStyles = {
    [side.toLowerCase()]: open ? '0' : `-${width}`,
    width
  }

  return (
    <div className="side-menu" style={dynamicStyles}>
      {props.children}
    </div>
  )
}
