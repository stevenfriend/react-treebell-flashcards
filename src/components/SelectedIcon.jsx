import { FaCheck, FaTimes } from 'react-icons/fa'

function SelectedIcon({ selected }) {
  return (
    <>
      { selected ? <FaCheck className='selected-icon check' /> : <FaTimes className='selected-icon times' />}
    </>
  )
}

export default SelectedIcon
