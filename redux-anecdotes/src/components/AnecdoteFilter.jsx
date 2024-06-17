import { filterFor } from "../reducers/filterReducer"
import { useDispatch } from "react-redux"

const AnecdoteFilter = () => {
  const dispatch = useDispatch()
  
  const handleInput = (e) => {
    dispatch(filterFor(e.target.value))
  }

  return <div>
    <label htmlFor="filter">filter:</label>
    <input type="text" onInput={handleInput} name="filter" id="filter" />
  </div>
}

export default AnecdoteFilter