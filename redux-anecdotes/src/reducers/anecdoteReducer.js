import { createSlice } from "@reduxjs/toolkit"

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    makeVoteFor(state, action) {
      const anecdoteToUpdate = state.find(anecdote => anecdote.id === action.payload)
      const updatedAnecdote = {...anecdoteToUpdate, votes: anecdoteToUpdate.votes + 1}
      return state.map(anecdote => anecdote.id === action.payload ? updatedAnecdote : anecdote)
    },
    createAnecdote(state, action) {
      const newAnecdoteObject = asObject(action.payload)
      return state.concat(newAnecdoteObject)
    },
    initializeAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { makeVoteFor, createAnecdote, initializeAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer