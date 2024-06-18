import { createSlice } from "@reduxjs/toolkit"

const filterReducer = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    filterFor(state, action) {
      return action.payload
    }
  }
})

export const { filterFor } = filterReducer.actions
export default filterReducer.reducer