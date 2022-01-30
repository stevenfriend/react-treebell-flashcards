function Header({ selectMode }) {

  const handleClick = (mode) => {
    selectMode(mode)
  }

  return (
    <nav>
      <button onClick={() => handleClick('menu')}>menu</button>
      <button onClick={() => handleClick('grid')}>grid</button>
      <button onClick={() => handleClick('carousel')}>carousel</button>
    </nav>
  )

}

export default Header
