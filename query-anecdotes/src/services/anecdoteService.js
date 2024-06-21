import axios from 'axios'

const baseURL = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseURL)
  return response.data
}

const createAnecdote = async (content) => {
  const newAnecdoteObject = {content, votes: 0}
  const response = await axios.post(baseURL, newAnecdoteObject)
  return response.data
}

const voteForAnecdote = async (anecdote) => {
  const response = await axios.put(`${baseURL}/${anecdote.id}`, {...anecdote, votes: anecdote.votes + 1})
  return response.data
}

export default { getAll, createAnecdote, voteForAnecdote}
