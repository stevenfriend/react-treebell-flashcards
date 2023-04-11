import React, { useContext } from 'react'
import ItemContext from '../context/ItemContext'
import Card from './Card'

function CardMenu() {
  const { cards } = useContext(ItemContext)

  return (
    <div className='card-menu'>
      {cards.map((card, index) => 
        <Card key={card.id} card={card} index={index} screen={'menu'}/>
      )}
    </div>
  )
}

export default CardMenu