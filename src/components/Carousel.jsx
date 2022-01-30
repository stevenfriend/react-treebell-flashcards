import { FaChevronLeft, FaChevronRight, FaCircle } from 'react-icons/fa'
import Card from './Card'

function Carousel({ items, haveItems, counter, decreaseCounter, increaseCounter }) {
  return (
    <div className='card-carousel'>
      <button onClick={() => decreaseCounter()}><FaChevronLeft /></button>
      { haveItems ? <Card image={items[counter].image} /> : <h1>No Cards</h1> }
      <button onClick={() => increaseCounter()}><FaChevronRight /></button>
      {/* <div className='carousel-indicator'><FaCircle /> <FaCircle /> <FaCircle /> <FaCircle /><FaCircle /> <FaCircle /> <FaCircle /> <FaCircle /><FaCircle /> <FaCircle /> <FaCircle /> <FaCircle /><FaCircle /> <FaCircle /> <FaCircle /> <FaCircle /></div> */}
    </div>
  )
}

export default Carousel
