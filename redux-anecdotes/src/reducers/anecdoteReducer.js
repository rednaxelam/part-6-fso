import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdotes'

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
    setAnecdotes(state, action) {
      return action.payload
    },
    appendAnecdote(state, action) {
      return state.concat(action.payload)
    }
  }
})

export const { makeVoteFor, createAnecdote, setAnecdotes, appendAnecdote } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const startingAnecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(startingAnecdotes))
  }
}

export default anecdoteSlice.reducer