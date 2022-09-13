import { useEffect, useRef } from 'react'
import Card from './Card'
import SelectedIcon from './SelectedIcon'

function MenuItem({ item, selectItems, index }) {

  const ref = useRef(null)

  const handleClick = () => {
    selectItems(index)
  }

  const handleDragStart = () => {
    ref.current.classList.add('dragging')
    console.log(`You started dragging ${item.name}`)
  }

  const handleDragEnd = (e) => {
    ref.current.classList.remove('dragging')
    console.log(`You stopped dragging ${item.name}`)
  }

  useEffect(
    () => {
      const element = ref.current;
      element.addEventListener('click', handleClick)
      element.addEventListener('dragstart', handleDragStart)
      element.addEventListener('dragend', handleDragEnd)
      return () =>  {
        element.removeEventListener('click', handleClick)
        element.removeEventListener('dragstart', handleDragStart)
        element.addEventListener('dragend', handleDragEnd)
      }
    } 
  )

  return (
    <div className='item' draggable='true' ref={ref} style={{position: 'relative'}} >
      <Card image={item.image} />
      <SelectedIcon selected={item.selected} />
    </div>
  )
}

export default MenuItem
