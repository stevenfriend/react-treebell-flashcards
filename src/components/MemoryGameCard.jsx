import React from 'react'
import Card from './Card'

function MemoryGameCard({ card, options, index, handleClick, flipped }) {

  return (
    <div className={`memory-game-card ${flipped ? "flipped" : ""}`} >
      <div className='front'>
        <Card card={card} options={options}/>
      </div>
      <div className='back' onClick={() => handleClick(card)}>{index+1}</div>
    </div>
  )
}

export default MemoryGameCard
