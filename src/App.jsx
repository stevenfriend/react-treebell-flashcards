import React from 'react'
import { ItemProvider } from './context/ItemContext'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Menu from './components/Menu'
import Gallery from './components/Gallery'
import Grid from './components/Grid'
import WhatsMissing from './components/WhatsMissing'
import Concentration from './components/Concentration'

function App() {
  return (
    <div className="container">
        <Navbar />
        <ItemProvider>
          <Routes>
            <Route exact path="/react-treebell-flashcards/" element={<Menu />}></Route>
            <Route path="/react-treebell-flashcards/gallery" element={<Gallery />}></Route>
            <Route path="/react-treebell-flashcards/grid" element={<Grid />}></Route>
            <Route path="/react-treebell-flashcards/whats-missing" element={<WhatsMissing />}></Route>
            <Route path="/react-treebell-flashcards/concentration" element={<Concentration />}></Route>
          </Routes>
        </ItemProvider>
      </div>
  )
}

export default App
