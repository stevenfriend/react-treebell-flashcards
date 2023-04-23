import React, { useState, useContext, useEffect } from 'react'
import ConcentrationCard from './ConcentrationCard'
import ItemContext from '../context/ItemContext'

function Concentration() {
  const { myCards, style, frame } = useContext(ItemContext)
  const [gameState, setGameState] = useState({ start: false })
  const [gameDeck, setGameDeck] = useState([])
  const [pick1, setPick1] = useState(null)
  const [pick2, setPick2] = useState(null)

  useEffect(
    () => {
      document.addEventListener('click', windowClick)
      return () =>  {
        document.removeEventListener('click', windowClick)      
      }
    }
  )
  
  const windowClick = () => {
    if(pick1 && pick2) resetPicks()
  }

  const getDeck = () => {
    myCards.map(card => { 
      card.matched = false 
      return card
    })
    const deck1 = JSON.parse(JSON.stringify(myCards));
    const deck2 = JSON.parse(JSON.stringify(myCards));
    deck1.forEach(card => {
      card.id = `1${card.id}`
    })
    deck2.forEach(card => {
      card.id = `2${card.id}`
    })
    const gameDeck = [...deck1, ...deck2]
    return shuffleDeck(gameDeck)
  }

  const shuffleDeck = (gameDeck) => {
    const shuffledDeck = []
    const tempDeck = [...gameDeck]
    while (tempDeck.length > 0) {
      const index = Math.floor(Math.random() * tempDeck.length)
      const card = tempDeck.splice(index, 1)[0]
      shuffledDeck.push(card)
    }
    return shuffledDeck
  }

  const startGame = () => {
    if(!gameState.start) {
      setGameState(prev => {
        const gameState = {...prev}
        gameState.start = true
        return gameState
      })
      setGameDeck(getDeck())
    }
  }

  const handleClick = (card) => {
    pick1 && pick2 && resetPicks()
    pick1 ? setPick2(card) : setPick1(card)
  }

  useEffect(() => {
    if(pick1 && pick2) {
      if(pick1.id.slice(1) === pick2.id.slice(1) && pick1.id !== pick2.id) {
        setGameDeck(prev => {
          return prev.map(card => {
            if(card.id === pick1.id || card.id === pick2.id) {
              return {...card, matched: true}
            } else {
              return card
            }
          })
        })
        resetPicks() 
      }
    }
  }, [pick1, pick2])
  
  const resetPicks = () => {
    setPick1(null)
    setPick2(null)
  }

  return (
    <>
      <button onClick={startGame}>start</button>
      { gameState && (
        <div className='concentration-grid'>
          {gameDeck.map((card, index) => 
              <ConcentrationCard 
                key={card.id} card={card} style={style} frame={frame} index={index}
                handleClick={handleClick}
                flipped={card === pick1 || card === pick2 || card.matched}
              />
          )}
        </div>
      )}
    </>
  )
}

export default Concentration