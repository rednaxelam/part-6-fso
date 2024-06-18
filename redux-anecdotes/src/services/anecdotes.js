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

const voteFor = async (id) => {
  const beforeAnecdoteRequest = await axios.get(`${baseURL}/${id}`)
  const beforeAnecdoteObject = beforeAnecdoteRequest.data
  const afterAnecdoteRequestObject = {...beforeAnecdoteObject, votes: beforeAnecdoteObject.votes + 1}
  const response = await axios.put(`${baseURL}/${id}`, afterAnecdoteRequestObject)
  return response.data
}

export default { getAll, createAnecdote, voteFor }