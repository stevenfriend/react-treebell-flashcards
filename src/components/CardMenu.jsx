import React, { useContext } from 'react'
import ItemContext from '../context/ItemContext'
import Card from './Card'

function CardMenu() {
  const { cards, style, frame } = useContext(ItemContext)

  return (
    <div className='card-menu' >
      {cards.map((card, index) => 
        <Card key={card.id} card={card} style={style} frame={frame} index={index} screen={'menu'}/>
      )}
    </div>
  )
}

export default CardMenu