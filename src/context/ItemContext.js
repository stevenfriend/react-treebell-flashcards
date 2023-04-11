import { createContext, useState, useEffect } from 'react'
import ItemData from '../data/data.json'

const ItemContext = createContext()

export const ItemProvider = ({ children }) => {
  const [deck, setDeck] = useState()
  const [cards, setCards] = useState()
  const [myCards, setMyCards] = useState()
  const [loaded, setLoaded] = useState(false)
  const [source, setSource] = useState()

  useEffect(() => {
    if(deck) {
      setCards(ItemData[`${deck}`].cards)
      setMyCards(cards.filter((card) => card.selected))
    }
  }, [deck])
  
  // Select deck
  const handleSelectDeck = (deck) => {
    setDeck(deck)
    setCards(ItemData[`${deck}`].cards)
    setMyCards(ItemData[`${deck}`].cards.filter((card) => card.selected))
  }

  // Select cards
  const selectCard = (card, index) => {
    setCards( prev => {
      const copy = [...prev]
      const newCard = { ...copy[index] }
      newCard.selected = newCard.selected ? false : true
      copy.splice(index, 1, newCard)
      setMyCards(copy.filter((card) => card.selected))
      return copy
    })
  }

  // Drag start
  const handleDragStart = (e, card) => {
    e.dataTransfer.effectAllowed = 'move'
    setSource(card)
  }

  // Drag over
  const handleDragOver = (e, target) => {
    e.preventDefault()
    if( target !== source ) moveCards(target)
  }


  // Move cards
  const moveCards = (target) => {
    const sourceIndex = cards.indexOf(source)
    const targetIndex = cards.indexOf(target)
    const copy = [...cards]
    copy.splice(sourceIndex, 1)
    copy.splice(targetIndex, 0, source)
    setCards(copy)
    setMyCards(() => {
      return copy.filter((card) => card.selected)
    })
  }

  // Shuffle deck
  const shuffleDeck = (arg) => {
    if(arg) {
      const newDeck = []
      const tempDeck = [...myCards]
      while (tempDeck.length > 0) {
        const index = Math.floor(Math.random() * tempDeck.length)
        const card = tempDeck.splice(index, 1)[0]
        newDeck.push(card)
      }
      setMyCards(newDeck)
    } else {
      setMyCards(cards.filter((card) => card.selected))
    }
  }

  return (
    <ItemContext.Provider value={{ deck, cards, myCards, loaded, handleSelectDeck, selectCard, handleDragStart, handleDragOver, shuffleDeck, setLoaded }}>
      {children}
    </ItemContext.Provider>
  )
}

export default ItemContext
