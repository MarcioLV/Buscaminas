import React from 'react'
import ReactDOM from 'react-dom'

import './style/Winner.css'

const winner = (props) => {
  if(!props.isOpened){
    return null
  }
  return ReactDOM.createPortal(
    <div className="winner">
      <div className="winner-container">
        <h1>¡Has Ganado!</h1>
        <button onClick={props.onClose}>Cerrar</button>
      </div>
    </div>,
    document.getElementById('modal')
  )
}

export default winner