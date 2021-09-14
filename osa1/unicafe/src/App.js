import React, { useState } from 'react'


const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>{text}</button>
)

const Feedback = ({scores}) => {

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => scores.setGood(scores.good+1)} text='good' />
      <Button handleClick={() => scores.setNeutral(scores.neutral+1)} text='neutral' />
      <Button handleClick={() => scores.setBad(scores.bad+1)} text='bad' />
    </div>
  )
}

const Score = ({name, value}) => (
  <div>
    {name} {value}
  </div>
)

const Stats = ({scores}) => {
  const total = scores.good + scores.neutral + scores.bad
  const average = (scores.good + scores.bad * -1) / total
  const positive = scores.good / total * 100
  return (
    <div>
      <h1>statistics</h1>
      <Score name='good' value={scores.good} />
      <Score name='neutral' value={scores.neutral} />
      <Score name='bad' value={scores.bad} />
      <Score name='all' value={total} />
      <Score name='average' value={average} />
      <Score name='positive' value={positive + ' %'} />
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const scores = {good: good, neutral: neutral, bad: bad, setGood: setGood, setNeutral: setNeutral, setBad: setBad}

  return (
    <>
      <Feedback scores={scores} />
      <Stats scores={scores} />
    </>
  )
}

export default App
