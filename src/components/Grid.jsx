import React, { useState, useContext, useEffect } from 'react'
import Card from './Card'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import ItemContext from '../context/ItemContext'

function Grid() {
  const { myCards, style } = useContext(ItemContext)
  const [page, setPage] = useState(0)
  let cols = 3
  let rows = 3
  let start = page * cols * rows
  let end = (page+1) * cols * rows
  if(end > myCards.length) end = myCards.length

  const left = () => {
    setPage( prev => {
      let page = prev
      page = page === 0 ? page = Math.floor(myCards.length/(cols*rows)) : page - 1
      getCards()
      return page
    })
  }

  const right = () => {
    setPage( prev => {
      let page = prev
      page = page >= Math.floor(myCards.length/(cols*rows)) ? page = 0 : page + 1
      getCards()
      return page
    })
  }

  const getCards = () => {
    start = page * cols * rows
    end = (page+1) * cols * rows
    if(end > myCards.length) end = myCards.length
  }

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') left()
    if (e.key === 'ArrowRight') right()
  }

  useEffect(
    () => {
      document.addEventListener('keydown', handleKeyDown)
      return () =>  {
        document.removeEventListener('keydown', handleKeyDown)
      }
    }
  )

  return (
    <div className="card-grid-container">
      <button className='chevron' onClick={left} ><FaChevronLeft /></button>
      <div className='card-grid'>
        {myCards.slice(start, end).map( (card) =>
          <Card key={card.id} card={card} style={style} />
        )}
      </div>
      <button className='chevron' onClick={right} ><FaChevronRight /></button>
    </div>
  )
}

export default Grid
