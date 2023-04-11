import React from 'react'
import { NavLink } from 'react-router-dom'

function DropdownItem(props) {
  return (
    <NavLink to={props.link} className="menu-item" onClick={() => {props.handleActive(props.text)}}>
      {props.children}
    </NavLink>
  )
}

export default DropdownItem