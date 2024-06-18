import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    makeVoteFor(state, action) {
      const anecdoteToUpdate = state.find(anecdote => anecdote.id === action.payload)
      const updatedAnecdote = {...anecdoteToUpdate, votes: anecdoteToUpdate.votes + 1}
      return state.map(anecdote => anecdote.id === action.payload ? updatedAnecdote : anecdote)
    },
    setAnecdotes(state, action) {
      return action.payload
    },
    appendAnecdote(state, action) {
      return state.concat(action.payload)
    }
  }
})

export const { makeVoteFor, setAnecdotes, appendAnecdote } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const startingAnecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(startingAnecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdoteObject = await anecdoteService.createAnecdote(content)
    dispatch(appendAnecdote(newAnecdoteObject))
  }
}

export default anecdoteSlice.reducer