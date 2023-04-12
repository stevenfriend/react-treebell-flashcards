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
  const slider = useRef(null)

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') left()
    if (e.key === 'ArrowRight') right()
  }

  const handleInput = () => {
    select(slider.current.value)
  }

  const left = (arg) => {
    setCounter((prev) => {
      let newCounter = typeof arg === 'undefined' ? prev : arg
      newCounter = newCounter === 0 ? myCards.length - 1 : newCounter - 1
      return newCounter
    })
  }

  const right = (arg) => {
    setCounter((prev) => {
      let newCounter = typeof arg === 'undefined' ? prev : arg
      newCounter = newCounter >= myCards.length - 1 ? 0 : newCounter + 1
      return newCounter
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

  useEffect(
    () => {
      document.addEventListener('keydown', handleKeyDown)
      slider.current.value = counter
      slider.current.addEventListener('input', handleInput)
      return () =>  {
        document.removeEventListener('keydown', handleKeyDown)
      }
    }
  )

  return (
      <div className='card-carousel'>
        <button className='chevron' onClick={() => {
          left()
          slider.current.value = counter
        }} ><FaChevronLeft /></button>
        <div className="screenshare">
          <Card key={myCards[counter].id} card={myCards[counter]} options={options} />
        </div>
        <button className='chevron' onClick={() => {
          right()
          slider.current.value = counter
        }} ><FaChevronRight /></button>
        <input className='slider' type="range" id="carousel-slider" name="slider" min="0" max={myCards.length-1} ref={slider}></input>
        <nav className='display-options'>
          <button className={`display-button${options.shuffleCards ? ' toggle' : ''}`} onClick={handleShuffle}><BiShuffle /></button>
          <button className={`display-button${options.hideImage ? ' toggle' : ''}`} onClick={toggleImage}><BiImage /></button>
          <button className={`display-button${options.hideText ? ' toggle' : ''}`} onClick={toggleText}><IoText /></button>
        </nav>
      </div>
  )
}

export default Gallery
