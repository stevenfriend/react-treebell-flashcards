import { useRef, useEffect } from 'react'

import MenuItem from './MenuItem'

function Menu({ items, moveItems, selectItems}) {
  
  const ref = useRef(null)

  const handleDragOver = (e) => {
    e.preventDefault()
    if([...e.target.parentElement.classList].includes('item') && ![...e.target.parentElement.classList].includes('dragging')) {
      const children = [...ref.current.children]
      const source = ref.current.querySelector('.dragging')
      const sourceIndex = children.indexOf(source)
      const targetIndex = children.indexOf(e.target.parentElement)
      moveItems(sourceIndex, targetIndex)
    }
  }

  const handleDragLeave = (e) => {
  }
  
  const handleDrop = (e) => {
  }

  useEffect(
    () => {
      const grid = ref.current;
      grid.addEventListener('dragover', handleDragOver)
      grid.addEventListener('dragleave', handleDragLeave)
      grid.addEventListener('drop', handleDrop)
      return () =>  {
        grid.removeEventListener('dragover', handleDragOver)
        grid.removeEventListener('dragleave', handleDragLeave)
        grid.removeEventListener('drop', handleDrop)
      }
    }
  )

  return (
    <div className='card-menu'　ref={ref}>
      {items.map((item, index) => 
        <MenuItem key={item.name} item={item} selectItems={selectItems} index={index} />
      )}
    </div>
  )
}

export default Menu
