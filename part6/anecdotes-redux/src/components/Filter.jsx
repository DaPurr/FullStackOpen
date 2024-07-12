import { useDispatch, useSelector } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'

const Filter = () => {
  const dispatch = useDispatch()
  const filterText = useSelector(state => state.filter)

  const filter = event => {
    dispatch(setFilter(event.target.value))
  }

  const style = {
    marginBottom: 10,
  }

  return (
    <div style={style}>
      filter <input value={filterText} onChange={filter} />
    </div>
  )
}

export default Filter
