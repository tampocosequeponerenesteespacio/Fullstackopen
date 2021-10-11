import React, { useEffect } from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecodteList'
import Notification from './components/Notification'
import Filter from './components/Filter'
import anecdotesServices from './services/anecdotes'
import { useDispatch } from 'react-redux'
import { initAnecdotes } from './reducers/anecdoteReducer'


const App = () => {
  const dispatch = useDispatch()

  useEffect( () => {
    dispatch(initAnecdotes())    
  },[dispatch])  

  return (
    <div>
      <Notification />
      <h2>Anecdotes</h2>
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App