import React from "react"
import { handleCreate } from "../reducers/anecdoteReducer"
import { handleNotification } from "../reducers/notificationReducer"

import { connect } from "react-redux"



const AnecdoteForm = ({handleCreate, handleNotification}) => {



const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    handleCreate(content)
    handleNotification(`New anecdote creadted: '${content}'`, 5)
    
    
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



export default connect(null, {handleCreate, handleNotification})(AnecdoteForm)