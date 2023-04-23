import React, { useState, useContext, useRef, useEffect } from 'react'
import ItemContext from '../context/ItemContext'

function Card({ card, style, frame, index, screen, options }) {

  const [hidden, setHidden] = useState(false)
  const [textSize, setTextSize] = useState()
  const [textPosition, setTextPosition] = useState()
  const { selectCard } = useContext(ItemContext)
  const { handleDragStart } = useContext(ItemContext)
  const { handleDragOver } = useContext(ItemContext)
  const [loaded, setLoaded] = useState(false)
  const cardRef = useRef()
  const textRef = useRef()

  useEffect(() => {
    window.addEventListener('resize', resizeText)
    return () =>  {
      window.removeEventListener('resize', resizeText)
    }
  })

  const handleClick = () => {
    if(screen === 'menu') {
      selectCard(card, index)
    } else if (screen === 'missing') {
      setHidden(prev => !prev)
    } 
  }

  const resizeText = () => {
    const cardWidth = cardRef.current.getBoundingClientRect().width
    setTextSize( prev => { 
      const textSize = {...prev}
      if(card.text.length < 11) {
        textSize.fontSize = cardWidth*.13 
      } else {
        textSize.fontSize = cardWidth*.11
      }
      return textSize
    })
  }
  
  const positionText = () => {
    const cardWidth = cardRef.current.getBoundingClientRect().width
    const textHeight = textRef.current.getBoundingClientRect().height
    const textPosition = { transform: `translate(0, ${(cardWidth/textHeight*style.textPositionFactor)-50}%)` }
    setTextPosition(textPosition)
  }

  const styleCard = () => {
    if(screen === "gallery") {
      const aspectRatio = style.card.aspectRatio
      const result1 = aspectRatio.match(/\d+(?= \/)/)
      const result2 = aspectRatio.match(/(?<=\/ )\d+/)
      if(result1 !== null && result2 !== null) {
        if(parseInt(result1[0]) / parseInt(result2[0]) >= 16/9) {
          return {...style.card, width: '100%'}
        } else {
          return {...style.card, height: '100%'}
        }
      }
    }
    return style.card
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
    const newStyle = {...style.text, ...textSize}
    if(options.textCard && !options.showAnswer) {
      newStyle.transform = "translate(0, -50%)"
      return { ...newStyle }
    } else if(options.imageCard && !options.showAnswer) {
      newStyle.opacity = "0"
      newStyle.transform = "translate(0, 70%)"
      return { ...newStyle }
    }
    return { ...newStyle, ...textPosition }
  }

  return (
    <div ref={cardRef}
      draggable 
      className={`card${hidden ? ' hidden' : ''}${options.border ? ' border' : ''}${screen === 'menu' && card.selected ? ' card-selected' : ''}`}
      style={styleCard()}
      onDragStart={ e => handleDragStart(e, card) }
      onDragOver={ e => handleDragOver(e, card) }
      onClick={handleClick}
      onLoad={() => {
        resizeText()  
        positionText()
        // Cheesed it
        setTimeout(() => {
          setLoaded(true)
        }, "100")
      }}
    >
      <img className={'card-frame'} src={frame} alt='card front'/>
      <img className={'card-image'} style={styleImage()} src={card.image} alt='card front'/>
      <p ref={textRef} className={`card-text ${loaded ? '' : 'no-transition'}`} style={styleText()}>{card.text}</p>
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
