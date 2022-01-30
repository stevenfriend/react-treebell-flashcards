import MenuItem from './MenuItem'

function Menu({ items, alterItems }) {
  return (
    <div className='card-menu'>
      {items.map((item, index) => 
        <MenuItem item={item} alterItems={alterItems} index={index} />
      )}
    </div>
  )
}

export default Menu
