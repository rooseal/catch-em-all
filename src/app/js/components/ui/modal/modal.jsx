import React from 'react'
import ReactDom from 'react-dom'

export default props => {
  const { children, onClose, className } = props

  return (
    ReactDom.createPortal(
      <div className="modal-wrapper">
        <div className="modal-container cf">
          <div className="modal-inner-wrapper">
            <div className={className}>
              <div className="close-button" onClick={onClose}>close</div>
              { children }
            </div>
          </div>
        </div>
      </div>,
      document.getElementById('modal-portal')
    )
  )
}
