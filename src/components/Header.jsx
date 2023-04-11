import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <nav>
      <Link to='/silly-willy/'><button>menu</button></Link>
      <Link to='/silly-willy/carousel'><button>carousel</button></Link>
      <Link to='/silly-willy/grid'><button>grid</button></Link>
      <Link to='/silly-willy/memory-game'><button>Memory Game</button></Link>
      <Link to='/silly-willy/missing-game'><button>Missing Game</button></Link>
    </nav>
  )
}

export default Header
