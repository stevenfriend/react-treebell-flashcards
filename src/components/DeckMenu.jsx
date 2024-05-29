import React, { useContext } from 'react'
import ItemContext from '../context/ItemContext'

function DeckMenu() {
  const { handleSelectDeck } = useContext(ItemContext)

  return (
    <div>
      <button onClick={() => handleSelectDeck('lets-begin-1')}>Let's Begin</button>
      <button onClick={() => handleSelectDeck('lets-go-2')}>Let's Go 2</button>
    </div>
  )
}

export default DeckMenu