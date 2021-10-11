import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { handleVote } from "../reducers/anecdoteReducer"
import { handleNotification } from "../reducers/notificationReducer"


const AnecdoteList = () => {
    const filter = useSelector(state => state.filter)
    const anecdotesNoFilter = useSelector(state => state.anecdotes)
    const anecdotes = anecdotesNoFilter.filter( a => a.content.toLowerCase().includes(filter.toLowerCase()))
    const dispatch = useDispatch()

    const vote = (anecdote) => {
        dispatch(handleVote(anecdote))
        dispatch(handleNotification(`Voted for: '${anecdote.content}'`, 5))
        
      }


    return (
        <div>
        {anecdotes
            .sort( (a,b) => b.votes - a.votes)
            .map(anecdote =>
              <div key={anecdote.id}>
                <div>
                  {anecdote.content}
                </div>
                <div>
                  has {anecdote.votes}
                  <button onClick={() => vote(anecdote)}>vote</button>
                </div>
              </div>
            )}
        </div>
    )
}

export default AnecdoteList