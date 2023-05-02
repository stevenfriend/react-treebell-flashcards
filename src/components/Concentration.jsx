import React, { useState, useContext, useEffect } from 'react'
import ConcentrationCard from './ConcentrationCard'
import Counter from './Counter'
import ItemContext from '../context/ItemContext'

function Concentration() {
  const { myCards, style, frame } = useContext(ItemContext)
  const [gameState, setGameState] = useState({ start: false, cardTypes: 'card-card' })
  const [gameDeck, setGameDeck] = useState([])
  const [pick1, setPick1] = useState(null)
  const [pick2, setPick2] = useState(null)

  useEffect(() => {
    document.addEventListener('click', windowClick)
    return () =>  {
      document.removeEventListener('click', windowClick)      
    }
  })
  
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
    const gameDeck = pickCards(deck1, deck2)
    return shuffleDeck(gameDeck)
  }

  const pickCards = (deck1, deck2) => {
    const pickedCards = []
    while (pickedCards.length < gameState.pairs * 2) {
      const index = Math.floor(Math.random() * deck1.length)
      pickedCards.push(deck1.splice(index, 1)[0])
      pickedCards.push(deck2.splice(index, 1)[0])
    }
    return pickedCards
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
      getPairsValue()
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

  const getPairsValue = (pairs) => {
    setGameState(prev => {
      const gameState = {...prev}
      gameState.pairs = pairs 
      return gameState
    })
  }

  const handleCardTypesChange = e => {
    setGameState(prev => {
      const gameState = {...prev}
      gameState.cardTypes  = e.target.value 
      return gameState
    })
  }

  const menu = (
    <div className='concentration-menu'>
      <Counter label={'Number of pairs:'} input={{ inputName: "pairs", defaultValue: 8, min: 2, max: myCards.length }} getValue={getPairsValue}/>
      <fieldset onChange={e => handleCardTypesChange(e)}>
        <legend>Which type of cards you would like to match?:</legend>
          <label htmlFor="card-card">normal cards</label>
          <input type="radio" id="card-card" name="cardTypes" value="card-card" checked={gameState.cardTypes === 'card-card'}/>
          <label htmlFor="image-text">picture cards and text cards</label>
          <input type="radio" id="image-text" name="cardTypes" value="image-text" />
          <label htmlFor="image-image">pictures cards</label>
          <input type="radio" id="image-image" name="cardTypes" value="image-image" />
          <label htmlFor="text-text">text cards</label>
          <input type="radio" id="text-text" name="cardTypes" value="text-text" />
      </fieldset>
      <button className='start-button' onClick={startGame}>start</button>
    </div>
  )

  const getOptions = (card) => {
    switch (gameState.cardTypes) {
      case 'image-text':
        return card.id[0] === '1' ? { imageCard: true } : { textCard: true }
      case 'image-image':
        return card.id[0] === '1' ? { imageCard: true } : { imageCard: true }
      case 'text-text':
        return card.id[0] === '1' ? { textCard: true } : { textCard: true }
      default:
        return
    }
  }

  const concentration = (
    <div className='concentration-grid'>
      {gameDeck.map((card, index) => 
        <ConcentrationCard 
          key={card.id} card={card} style={style} frame={frame} options={getOptions(card)} index={index} handleClick={handleClick}
          flipped={card === pick1 || card === pick2 || card.matched}
        />
      )}
    </div>
  )

  return (
    <>
      { gameState.start ? concentration : menu }
    </>
  )
}

export default Concentration