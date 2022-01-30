import { useEffect, useRef } from 'react'
import Card from './Card'
import SelectedIcon from './SelectedIcon'

function MenuItem({ item, alterItems, index }) {

  const ref = useRef(null)
  
  const menuItem = (
    <div ref={ref} style={{position: 'relative'}}>
      <Card image={item.image} />
      <SelectedIcon selected={item.selected} />
    </div>
  )

  const handleClick = () => {
    alterItems(index)
  }

  useEffect(
    () => {
      const node = ref.current;
      node.addEventListener('click', handleClick)
      return () =>  node.removeEventListener('click', handleClick)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []    
  )

  return (
    menuItem
  )
}

export default MenuItem
