import React, { useState, useEffect } from 'react'

function ColorPicker() {
  const [overlayColor, setOverlayColor] = useState('red')
  const [coverCards, setCoverCards] = useState(false)
  const [peek, setPeek] = useState(false)
  const colors = ['red', 'green', 'blue', 'yellow', 'orange', 'purple', 'pink', 'brown', 'black', 'white']

  useEffect(
    () => {
      document.addEventListener('keydown', handleKeyDown)
      document.addEventListener('keyup', handleKeyUp)
      document.addEventListener('click', handleClick)
      return () =>  {
        document.removeEventListener('keydown', handleKeyDown)
        document.removeEventListener('keyup', handleKeyUp)
        document.removeEventListener('click', handleClick)
      }
    }
  )

  const handleKeyDown = e => {
    if (e.code === 'Space') {
      setPeek(true)
    }
  } 

  const handleKeyUp = e => {
    if (e.code === 'Space') {
      setPeek(false)
    }
  }
  
  const handleClick = e => {
    if(e.target.classList.contains('container')) {
      setCoverCards(prev => !prev)
    }
  } 

  return (
    <>
      <div className="color-picker">
        {colors.map(color => 
          <button className={`color-picker-button ${color === overlayColor ? 'color-selected' : ''}`} style={{ background: color }} onClick={e => {
            e.target.blur()
            if(!coverCards || (coverCards && color === overlayColor)) {
              setCoverCards(prev => !prev)
            }
            setOverlayColor(color)
          }}></button>
        )}
      </div>
      <div className={`color-picker-overlay ${coverCards ? 'cover' : ''} ${peek ? 'peek' : ''}`} style={{ background: overlayColor }} onClick={() => setCoverCards(false)}></div>
    </>
  )
}

export default ColorPicker