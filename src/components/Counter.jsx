import React, { useState } from 'react'

const Counter = ({ label, input, getValue }) => {
  
  const [value, setValue] = useState(() => {
    if(getValue) getValue(input.defaultValue)
    return input.defaultValue
  })

  const changeCounter = (n) => {
    setValue(prev => {
      getValue(parseInt(prev) + n)
      return parseInt(prev) + n
    })
  }

  return (
    <div className='counter'>
      <label htmlFor="pairs">{ label }</label>
      <div className='counter-container'>
        <button onClick={() => {
          if(value > input.min) changeCounter(-1)
        }}>-</button>
        <input type="number" 
          className='counter-input' 
          name={input.inputName}
          value={value}
          onChange={e => {
            getValue(parseInt(e.target.value))
            setValue(parseInt(e.target.value))
          }}
        />
        <button onClick={() => {
          if(value < input.max) changeCounter(1)
        }}>+</button>
      </div>
    </div>
  ) 
}

export default Counter