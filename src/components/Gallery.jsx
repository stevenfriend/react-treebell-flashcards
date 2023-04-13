import React, { useState, useContext, useRef, useEffect } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { BiShuffle, BiImage } from 'react-icons/bi'
import { IoText } from "react-icons/io5"
import Card from './Card'
import ItemContext from '../context/ItemContext'

function Gallery() {
  const [options, setOptions] = useState({
    border: true,
    hideText: false,
    shuffleCards: false,
  })
  const { myCards, shuffleDeck } = useContext(ItemContext)
  const [counter, setCounter] = useState(0)
  const [holdingKey, setHoldingKey] = useState(false)
  const slider = useRef(null)
  
useEffect(
  () => {
      document.addEventListener('keydown', handleKeyDown)
      document.addEventListener('keyup', handleKeyUp)
      slider.current.value = counter
      slider.current.addEventListener('input', handleInput)
      return () =>  {
        document.removeEventListener('keydown', handleKeyDown)
        document.removeEventListener('keyup', handleKeyUp)
      }
    }
  )
  
  const handleKeyDown = e => {
    if (e.key === 'ArrowLeft') left()
    if (e.key === 'ArrowRight') right()
    if ((e.key === ' ' || e.key === 'ArrowUp' || e.key === 'ArrowDown') && !holdingKey) {
      setHoldingKey(true) 
      setAnswer()
    }
    e.preventDefault();
  }
  
  const handleKeyUp = e => {
    if (e.key === ' ' || e.key === 'ArrowUp' || e.key === 'ArrowDown') setHoldingKey(false) 
  } 
  
  const handleInput = () => {
    select(slider.current.value)
  }

  const left = (arg) => {
    setAnswer(false)
    setCounter((prev) => {
      let newCounter = typeof arg === 'undefined' ? prev : arg
      newCounter = newCounter === 0 ? myCards.length - 1 : newCounter - 1
      return newCounter
    })
  }

  const right = (arg) => {
    setAnswer(false)
    setCounter((prev) => {
      let newCounter = typeof arg === 'undefined' ? prev : arg
      newCounter = newCounter >= myCards.length - 1 ? 0 : newCounter + 1
      return newCounter
    })
  }

  const setAnswer = (bool) => {
    setOptions(prev => {
      const options = {...prev}
      if(bool === undefined) options.showAnswer = !options.showAnswer
      else options.showAnswer = bool
      return options
    })
  }

  const select = (arg) => {
    setCounter(() => {
      return parseInt(arg)
    })
  }

  const handleShuffle = () => {
    shuffleDeck(!options.shuffleCards)
    setOptions(prev => {
      const options = {...prev}
      options.shuffleCards = !options.shuffleCards
      return options
    })
  }
  
  const toggleImage = () => {
    setOptions(prev => {
      const options = {...prev}
      options.hideText = !prev.hideImage && false
      options.hideImage = prev.hideImage ? false : true
      return options
    })
  }

  const toggleText = () => {
    setOptions(prev => {
      const options = {...prev}
      options.hideImage = !prev.hideText && false
      options.hideText = prev.hideText ? false : true
      return options
    })
  }

  return (
      <div className='card-carousel'>
        <button className='chevron' onClick={(e) => {
          e.currentTarget.blur()
          left()
          slider.current.value = counter
        }} ><FaChevronLeft /></button>
        <div className="screenshare">
          <Card key={myCards[counter].id} card={myCards[counter]} options={options} />
        </div>
        <button className='chevron' onClick={(e) => {
          e.currentTarget.blur()
          right()
          slider.current.value = counter
        }} ><FaChevronRight /></button>
        <input className='slider' type="range" id="carousel-slider" name="slider" min="0" max={myCards.length-1} ref={slider}></input>
        <nav className='display-options'>
          <button className={`display-button${options.shuffleCards ? ' toggle' : ''}`} onClick={(e) => {
            e.currentTarget.blur()
            handleShuffle()
            }}><BiShuffle /></button>
          <button className={`display-button${options.hideImage ? ' toggle' : ''}`} onClick={(e) => {
            e.currentTarget.blur()
            toggleImage()
          }}><BiImage /></button>
          <button className={`display-button${options.hideText ? ' toggle' : ''}`} onClick={(e) => {
            e.currentTarget.blur()
            toggleText()
          }}><IoText /></button>
        </nav>
      </div>
  )
}

export default Gallery
