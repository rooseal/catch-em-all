import React from 'react'
import ReactDom from 'react-dom'

class ContextMenu extends React.Component {
  state = {
    show: false
  }

  componentDidMount () {
    this.setState({
      show: true
    })
  }

  render () {
    const { children, onClose, className } = this.props

    if (this.state.show) {
      return (
        ReactDom.createPortal(
          <React.Fragment>
            { children }
          </React.Fragment>,
          document.getElementById('context-menu')
        )
      )
    }

    return null
  }
}

export default ContextMenu
