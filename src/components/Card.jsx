import React, { useState, useContext, useRef, useEffect } from 'react'
import ItemContext from '../context/ItemContext'

function Card({ card, index, screen, options }) {

  const [hidden, setHidden] = useState(false)
  const [textStyle, setTextStyle] = useState({ fontSize: '1rem' })
  const { selectCard } = useContext(ItemContext)
  const { handleDragStart } = useContext(ItemContext)
  const { handleDragOver } = useContext(ItemContext)
  const cardRef = useRef()

  const resizeCardText = () => {
    const width = cardRef.current.getBoundingClientRect().width
    setTextStyle( prev => { 
      const style = {...prev}
      style.fontSize = width*.15 
      // Think of more elegant solution thatn this
      if(card.shrink) style.fontSize = width*.1
      return style
    })
  }

  useEffect(() => {
    resizeCardText()
    window.addEventListener('resize', resizeCardText)
    return () =>  {
      window.removeEventListener('resize', resizeCardText)
    }
  }, [cardRef])
  
  const handleClick = () => {
    if(screen === 'menu') {
      selectCard(card, index)
    } else if (screen === 'missing') {
      setHidden(prev => !prev)
    } 
  }

  return (
    <div ref={cardRef} className={`card ${hidden ? 'hidden' : ''} ${options.border ? 'border' : ''} ${options.hideText ? 'picture-card' : ''} ${options.hideImage ? 'text-card' : ''} ${screen === 'menu' && card.selected ? 'card-selected' : ''}`}
    draggable 
    onDragStart={ e => handleDragStart(e, card) }
    onDragOver={ e => handleDragOver(e, card) }
    onClick={handleClick}
    >
      <img className={'card-frame'} src={'/flashcards/images/lets-begin1/turquoise-frame.png'} alt='card front'/>
      <img className={'card-image'} src={card.image} alt='card front' onLoad={resizeCardText}/>
      <p className={'card-text'} style={textStyle}>{card.text}</p>
    </div>
  )
}

Card.defaultProps = {
  menu: false,
  options: {
    border: true,
    hideText: false,
    shuffleCards: false
  }
}

export default Card
