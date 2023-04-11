import React from 'react'
import { NavLink } from 'react-router-dom'

function NavItem(props) {

  return (
    <li className={`nav-item`} onClick={() => {props.handleOpen(props.text)}}>
      {props.link ? <NavLink to={props.link} end onClick={() => props.handleActive(props.text)}>
        { props.text }</NavLink> :
      <p className={`nav-button ${props.active && "active"}`}>{ props.text }</p>}
      {props.open && props.children}
    </li>
  )
}

export default NavItem