
import anecdotesServices from "../services/anecdotes"

/*const getId = () => (100000 * Math.random()).toFixed(0)

const initialState = anecdotesAtStart.map(asObject)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}*/

const Anecdotereducer = (state = [], action) => {
  

  switch (action.type) {
    case 'INIT':
      return action.data
    case 'VOTE':
      const id = action.data.id
      const anecdoteToChange = state.find ( (a) => a.id === id )
      const changedAnecdote = {
        ...anecdoteToChange, 
        votes: anecdoteToChange.votes + 1 }
      return state.map( a => a.id === id ? changedAnecdote : a)
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    default:
      return state
  }  
}

export const initAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdotesServices.getAll()
    dispatch({
      type: 'INIT',
      data: anecdotes,
    })
  }
}

export const handleVote = (anecdote) => {
  return async dispatch => {
    await anecdotesServices.vote({...anecdote, votes: anecdote.votes + 1})
    dispatch({
      type: 'VOTE',
      data: anecdote
    })
  }
}



export const handleCreate = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdotesServices.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    })
  }
}

export default Anecdotereducer