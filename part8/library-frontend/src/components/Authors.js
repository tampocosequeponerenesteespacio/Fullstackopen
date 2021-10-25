  
import { useMutation, useQuery } from '@apollo/client'
import React, { useState } from 'react'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'

const Authors = (props) => {
  const [author, setAuthor] = useState('')
  const [born, setBorn] = useState('')

  const result = useQuery(ALL_AUTHORS)

  const [changeBorn] = useMutation(EDIT_AUTHOR, {refetchQueries: 
    [ {query: ALL_AUTHORS} ]
  })

  const submit = async (event) => {
    event.preventDefault()

    changeBorn({variables: {name: author, setBornTo: parseInt(born)}})

    setAuthor('')
    setBorn('')
  }

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <h2>Loading...</h2>
  }


  const authors = result.data.allAuthors
  

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <h2>Set birthyears</h2>
     
      {/*AUTHOR BORNYEAR FORM*/}
      <form onSubmit={submit}>
        <div>
          name
          <select value={author} onChange={ (event) => setAuthor(event.target.value)} >
            {
            authors.map( a => <option key={a.name} value={a.name}>{a.name}</option>)
            }
          </select>
          
        </div>
        <div>
          born
          <input
            type='number'
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          /> 
        </div>
        <button type='submit'>update author</button>
      </form>

    </div>
  )
}

export default Authors
