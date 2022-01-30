import { useState, useEffect } from 'react'
import './App.css'
import Header from './components/Header'
import Menu from './components/Menu'
import Grid from './components/Grid'
import Carousel from './components/Carousel'
import ItemData from './data/ItemData'

function App() {
  const [items, setItems] = useState(ItemData)
  const [haveItems, setHaveItems] = useState(false)
  const [mode, setMode] = useState('menu')
  const [counter, setCounter] = useState(0)

  // Alter items
  const alterItems = (index) => {
    setItems( prevItems => {
      const tempItems = [...prevItems]
      const alteredItem = {...prevItems[index]}
      alteredItem.selected = alteredItem.selected ? false : true
      tempItems.splice(index, 1, alteredItem)
      return tempItems
    })
  }

  // Select mode
  const selectMode = (mode) => {
    setMode(mode)
  }

  // Check if there are items
  const checkItems = () => {
    let bool = false
    items.forEach(element => { if(element.selected) bool = true })
    return bool
  } 

  // Update the carousel counter
  useEffect(() => {
    if(checkItems()) {
      setHaveItems(true)
      if(!items[counter].selected) increaseCounter()
    } else {
      setHaveItems(false)
    }
  }, [items])

  // Decrease the carousel counter
  const decreaseCounter = (arg) => {
    if(checkItems()) {
      setCounter( prev => {
        let newCounter = typeof arg === "undefined" ? prev : arg
        newCounter = newCounter === 0 ? items.length - 1 : newCounter - 1
        return items[newCounter].selected ? newCounter: decreaseCounter(newCounter)
      })
    }
  }

  // Increase the carousel counter
  const increaseCounter = (arg) => {
    if(checkItems()) {
      setCounter( prev => {
        let newCounter = typeof arg === "undefined" ? prev : arg
        newCounter = newCounter >= items.length - 1 ? 0 : newCounter + 1
        return items[newCounter].selected ? newCounter : increaseCounter(newCounter)
      })
    }
  }

  return (
    <>
      <Header selectMode={selectMode} />
      { mode === 'menu' && <Menu items={items} alterItems={alterItems} /> }
      { mode === 'grid' && <Grid items={items} /> }
      { mode === 'carousel' && <Carousel items={items} haveItems={haveItems} counter={counter} decreaseCounter={decreaseCounter} increaseCounter={increaseCounter} /> }
    </>
  );
}

export default App;
