import React, { useState, useRef, useEffect } from 'react'
import Card from './Card'

function ConcentrationCard({ card, style, frame, index, handleClick, flipped }) {
  
  const [textSize, setTextSize] = useState()
  const cardRef = useRef()
  const textRef = useRef()

  useEffect(() => {
    window.addEventListener('resize', resizeText)
    return () =>  {
      window.removeEventListener('resize', resizeText)
    }
  })

  const resizeText = () => {
    const cardWidth = cardRef.current.getBoundingClientRect().width
    setTextSize( prev => { 
      const textSize = {...prev}
        textSize.fontSize = cardWidth*.3 
      return textSize
    })
  }

  return (
    <div ref={cardRef} className={`concentration-card ${flipped ? "flipped" : ""}`} onLoad={() => resizeText()}>
      <div className='front'>
        <Card card={card} style={style} frame={frame} />
      </div>
      <div className='back' style={style.card} onClick={() => handleClick(card)}>
        <img className={'card-frame'} src={frame} alt='card front'/>
        <p ref={textRef} style={{...textSize}}>{index+1}</p>
      </div>
    </div>
  )
}

export default ConcentrationCard
