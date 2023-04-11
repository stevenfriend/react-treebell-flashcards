import React, { useContext } from 'react'
import ItemContext from '../context/ItemContext'
import DeckMenu from './DeckMenu'
import CardMenu from './CardMenu'

function Menu() {  
  const { deck } = useContext(ItemContext)

  return (
    <>
      {console.log(deck)}
      {deck ? <CardMenu /> : <DeckMenu />}
    </>
  )
}

export default Menu