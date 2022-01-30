import Card from './Card'

function Grid({ items }) {
  let cols = 3
  let rows = 3
  let page = 0
  const selected = items.filter((card) => card.selected)
  let start = page * cols * rows
  let end = (page+1) * cols * rows

  return (
    <div className='card-grid'>
      {selected.slice(start, end).map((card) => 
        <Card image={card.image} />
      )}
    </div>
  )
}

export default Grid
