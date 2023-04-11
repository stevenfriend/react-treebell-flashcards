import React, { useContext, useRef, useEffect } from 'react'
import ItemContext from '../context/ItemContext'
import Card from './Card'

function CardMenu() {
  const { cards } = useContext(ItemContext)
  const container = useRef()

  const resizeCard = () => {
    const width = container.current.getBoundingClientRect().width
    console.log(`The menu has width ${width}`)
    // setTextStyle( prev => { 
    //   const style = {...prev}
    //   style.fontSize = width*.15 
    //   return style
    // })
  }

  useEffect(() => {
    resizeCard()
    window.addEventListener('load', resizeCard)
    return () =>  {
      window.removeEventListener('load', resizeCard)
    }
  })

  return (
    <div className='card-menu' ref={container}>
      {cards.map((card, index) => 
        <Card key={card.id} card={card} index={index} screen={'menu'}/>
      )}
    </div>
  )
}

export default CardMenu