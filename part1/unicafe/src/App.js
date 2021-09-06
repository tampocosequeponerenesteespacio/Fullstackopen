import React, { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.onClick}>
      {props.text}
    </button>
  )
}

const StaticsLine = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )

}

const Statics = ({stats}) => {
  const [good, neutral, bad] = stats
  const all = good+neutral+bad
  const average = (good-bad) / all
  const positive = good/all * 100 + ' %'

  if (all === 0) {
    return (
      <div>
        <h1>Statics</h1>  
        <p>No feedback given</p>
      </div>
      )
    }

  return (
    <div>
      <h1>Statics</h1>
      <table>
        <tbody>          
          <StaticsLine text='Good' value={good} />
          <StaticsLine text='Neutral' value={neutral} />
          <StaticsLine text='Bad' value={bad} />
          <StaticsLine text='All' value={all} />
          <StaticsLine text='Average' value={average} />
          <StaticsLine text='Positive' value={positive} />
        </tbody>
      </table>      
    </div>
  )
}

const App = () => {
  
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const stats = [good, neutral, bad]

  return (
    <div>
      <h1>Give Feedback</h1> 
      <Button onClick={() => setGood(good+1)} text='good' />
      <Button onClick={() => setNeutral(neutral+1)} text='neutral' />
      <Button onClick={() => setBad(bad+1)} text='bad' />
      <Statics stats={stats}/>
    </div>
  )
}

export default App