import React, { useState, useContext, useRef, useEffect } from 'react'
import ItemContext from '../context/ItemContext'

function Card({ card, style, frame, index, screen, options }) {

  const [hidden, setHidden] = useState(false)
  const [textSize, setTextSize] = useState({ fontSize: '1rem' })
  const { selectCard } = useContext(ItemContext)
  const { handleDragStart } = useContext(ItemContext)
  const { handleDragOver } = useContext(ItemContext)
  const cardRef = useRef()

  useEffect(() => {
    resizeCardText()
    window.addEventListener('resize', resizeCardText)
    return () =>  {
      window.removeEventListener('resize', resizeCardText)
    }
  }, [])
  
  const resizeCardText = () => {
    const width = cardRef.current.getBoundingClientRect().width
    setTextSize( prev => { 
      const textSize = {...prev}
      textSize.fontSize = width*.15 
      // Think of more elegant solution than this
      if(card.shrink) textSize.fontSize = width*.1
      return textSize
    })
  }
  
  const handleClick = () => {
    if(screen === 'menu') {
      selectCard(card, index)
    } else if (screen === 'missing') {
      setHidden(prev => !prev)
    } 
  }

  const styleImage = () => {
    if(options.imageCard && !options.showAnswer) {
      const newStyle = {...style.image}
      newStyle.transform = "translate(-50%, -50%)"
      return newStyle
    } else if(options.textCard && !options.showAnswer) {
      const newStyle = {...style.image}
      newStyle.opacity = "0"
      newStyle.transform = "translate(-50%, -100%)"
      return newStyle
    }
    return style.image
  } 

  const styleText = () => {
    if(options.textCard && !options.showAnswer) {
      const newStyle = {...style.text}
      newStyle.transform = "translate(0, -50%)"
      return { ...newStyle, ...textSize }
    } else if(options.imageCard && !options.showAnswer) {
      const newStyle = {...style.text}
      newStyle.opacity = "0"
      newStyle.transform = "translate(0, 60%)"
      return { ...newStyle, ...textSize }
    }
    return { ...style.text, ...textSize }
  }

  return (
    <div ref={cardRef} 
      draggable 
      className={`card${hidden ? ' hidden' : ''}${options.border ? ' border' : ''}${screen === 'menu' && card.selected ? ' card-selected' : ''}`}
      style={style.card}
      onDragStart={ e => handleDragStart(e, card) }
      onDragOver={ e => handleDragOver(e, card) }
      onClick={handleClick}
    >
      <img className={'card-frame'} src={frame} alt='card front'/>
      <img className={'card-image'} style={styleImage()} src={card.image} alt='card front' onLoad={resizeCardText}/>
      <p className={'card-text'} style={styleText()}>{card.text}</p>
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
