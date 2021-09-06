import React, { useState } from 'react'

const Button = ({onClick, text}) => {
  return <button onClick={onClick}>{text}</button>
}

const RandInt = (arr) => { 
  let x = Math.floor(Math.random() * arr.length )
  console.log('randInt: '+x)
  return x  
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]    
  const [selected, setSelected] = useState(RandInt(anecdotes))
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))
  console.log(votes)

  const HandleVote = (index) => {
    const copy = [...votes]
    copy[index] += 1
    setVotes(copy)
  }

  const mostVote = () => {
    let max = 0
    let imax = 0
    for ( let i = 0 ; i < votes.length ; i++) {
      if (votes[i] > max) {
        max = votes[i]
        imax = i
      }
    }
    return imax
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <div>
        
        <Button onClick={ () => HandleVote(selected) } text='vote' />
        <Button onClick={ () => setSelected(RandInt(anecdotes)) } text='next anecdote' />
      </div>
      <h1>Anecdote with most votes</h1>
      {anecdotes[mostVote()]}
    </div>
  )
}

export default App