import React from 'react'

function DropdownMenu(props) {
  return (
    <div className='dropdown'>
      {props.children}
    </div>
  )
}

export default DropdownMenu