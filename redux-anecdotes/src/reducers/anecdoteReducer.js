import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    setAnecdotes(state, action) {
      return action.payload
    },
    appendAnecdote(state, action) {
      return state.concat(action.payload)
    },
    replaceAnecdote(state, action) {
      return state.map(anecdote => 
        anecdote.id === action.payload.id 
        ? action.payload.newAnecdoteObject 
        : anecdote
      )
    }
  }
})

export const { setAnecdotes, appendAnecdote, replaceAnecdote } = anecdoteSlice.actions

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

export const makeVoteFor = id => {
  return async dispatch => {
    const newAnecdoteObject = await anecdoteService.voteFor(id)
    dispatch(replaceAnecdote({newAnecdoteObject, id}))
  }
}

export default anecdoteSlice.reducer