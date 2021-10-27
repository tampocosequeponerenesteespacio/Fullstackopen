
import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import { useApolloClient } from '@apollo/client'

//NOTIFICATION COMPONENT
const ErrorNotification = ({errorMsg}) => {
  if ( !errorMsg ) { return null }
  return <h2 style={{backgroundColor:'lightgray', padding:'10px'}}>{errorMsg}</h2>
}

//APP
const App = () => {
  const [page, setPage] = useState('authors')
  const [errorMsg, setErrorMsg] = useState(null)
  const [token, setToken] = useState(localStorage.getItem("libraryapp-user-token"))
  const client = useApolloClient()

  const handleError = (msg) => {
    setErrorMsg(msg)
    setTimeout( () => {setErrorMsg(null)},5000)
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  if (!token) {
    return(
      <div>
        <ErrorNotification errorMsg={errorMsg} />
        <LoginForm setToken={setToken} setError={handleError} />
      </div>

    )
  }
  
  

  
  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button style={{marginLeft: "20px"}} onClick={() => logout()}>logout</button>
      </div>
      
      <ErrorNotification errorMsg={errorMsg} />      

      <Authors
        show={page === 'authors'}        
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
        handleError={handleError}
      />

    </div>
  )
}

export default App