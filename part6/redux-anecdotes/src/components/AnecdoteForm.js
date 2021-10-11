import React from "react"
import { handleCreate } from "../reducers/anecdoteReducer"
import { handleNotification } from "../reducers/notificationReducer"
import { useDispatch } from "react-redux"
import anecdotesServices from "../services/anecdotes"



const AnecdoteForm = () => {

const dispatch = useDispatch()

const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(handleCreate(content))
    dispatch(handleNotification(`New anecdote creadted: '${content}'`))
    setTimeout( () => dispatch(handleNotification(null)), 5000)
    
  }


    return (
        <div>
          <h2>create new</h2>
          <form onSubmit={addAnecdote}>
            <div><input name='anecdote'/></div>
            <button type='submit'>create</button>
          </form>
        </div>
    )    
}



export default AnecdoteForm