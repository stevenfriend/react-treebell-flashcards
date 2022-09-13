import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import Menu from './components/Menu'
import Grid from './components/Grid'
import ItemData from './data/ItemData'

function App() {
  const [items, setItems] = useState(ItemData)
  const [mode, setMode] = useState('menu')

  // Move items
  const moveItems = (sourceIndex, targetIndex) => {
    setItems( prev => {
      const items = [...prev]
      const source = prev[sourceIndex]
      items.splice(sourceIndex, 1)
      items.splice(targetIndex, 0, source)
      return items
    })
  }

  // Select items
  const selectItems = (index) => {
    setItems( prev => {
      const items = [...prev]
      const targetItem = {...items[index]}
      targetItem.selected = targetItem.selected ? false : true
      items.splice(index, 1, targetItem)
      return items
    })
  }

  // Select mode
  const selectMode = (mode) => {
    setMode(mode)
  }

  return (
    <>
      <Header selectMode={selectMode} />
      { mode === 'menu' && <Menu items={items} moveItems={moveItems} selectItems={selectItems} /> }
      { mode === 'grid' && <Grid items={items} moveItems={moveItems}/> }
    </>
  );
}

export default App;
