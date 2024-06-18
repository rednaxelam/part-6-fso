import { createSlice } from "@reduxjs/toolkit"

const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    filterFor(state, action) {
      return action.payload
    }
  }
})

export const { filterFor } = filterSlice.actions
export default filterSlice.reducer