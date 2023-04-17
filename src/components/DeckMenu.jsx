import React, { useContext } from 'react'
import ItemContext from '../context/ItemContext'

function DeckMenu() {
  const { handleSelectDeck } = useContext(ItemContext)

  return (
    <div>
      <button onClick={() => handleSelectDeck('lets-begin-1')}>Let's Begin</button>
      <button onClick={() => handleSelectDeck('lets-go-2')}>Let's Go 2</button>
      <button onClick={() => handleSelectDeck('silly-willy')}>Silly Willy</button>
      <button onClick={() => handleSelectDeck('in-a-dark-dark-house')}>In a Dark Dark House</button>
    </div>
  )
}

export default DeckMenu