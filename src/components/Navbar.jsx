import React, { useState } from 'react'
import DropdownItem from './DropdownItem'
import DropdownMenu from './DropdownMenu'
import NavItem from './NavItem'

function Navbar() {
  const [open, setOpen] = useState({menu: false, views: false, games: false})
  const [active, setActive] = useState({menu: false, views: false, games: false})

  const handleOpen = (button) => {
    if(button === 'Menu') {
      setOpen({menu: false, views: false, games: false})
    } else if((button === 'Views')) {
      setOpen(prev => {return {menu: false, views: !prev.views, games: false}})
    } else if((button === 'Games')) {
      setOpen(prev => {return {menu: false, views: false, games: !prev.games}})
    }
  }

  const handleActive = (button) => {
    console.log(button)
    if(button === 'Menu') {
      setActive({menu: false, views: false, games: false})
    } else if((button === 'Views')) {
      setActive(prev => {return {menu: false, views: true, games: false}})
    } else if((button === 'Games')) {
      setActive(prev => {return {menu: false, views: false, games: true}})
    }
  }

  return (
    <nav className="navbar">
      <ul className="navbar-nav">
        <NavItem text={"Menu"} link={"/flashcards"} handleOpen={handleOpen} handleActive={handleActive}></NavItem>
        <NavItem text={"Views"} open={open.views} active={active.views} handleOpen={handleOpen}>
          <DropdownMenu>
            <DropdownItem link={"/flashcards/gallery"} handleActive={handleActive} text={"Views"}>Gallery View</DropdownItem>
            <DropdownItem link={"/flashcards/grid"} handleActive={handleActive} text={"Views"}>Grid View</DropdownItem>
          </DropdownMenu>
        </NavItem>
        <NavItem text={"Games"} open={open.games} active={active.games} handleOpen={handleOpen}>
         <DropdownMenu>
            <DropdownItem link={"/flashcards/whats-missing"} handleActive={handleActive} text={"Games"}>What's Missing?</DropdownItem>
            <DropdownItem link={"/flashcards/concentration"} handleActive={handleActive} text={"Games"}>Concentration</DropdownItem>
          </DropdownMenu>
        </NavItem>
      </ul>
    </nav>
  )
}

export default Navbar
