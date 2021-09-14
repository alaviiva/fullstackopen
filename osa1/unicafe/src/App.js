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

const StatisticLine = ({name, value}) => (
  <tr>
    <td>{name}</td>
    <td>{value}</td>
  </tr>
)

const Statistics = ({scores}) => {
  const total = scores.good + scores.neutral + scores.bad
  if (total === 0)
    return (
      <div>
        <h1>statistics</h1>
        <div>No feedback given</div>
      </div>
    )
  const average = (scores.good + scores.bad * -1) / total
  const positive = scores.good / total * 100
  return (
    <div>
      <h1>statistics</h1>
      <table>
        <tbody>
          <StatisticLine name='good' value={scores.good} />
          <StatisticLine name='neutral' value={scores.neutral} />
          <StatisticLine name='bad' value={scores.bad} />
          <StatisticLine name='all' value={total} />
          <StatisticLine name='average' value={average} />
          <StatisticLine name='positive' value={positive + ' %'} />
        </tbody>
      </table>
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
      <Statistics scores={scores} />
    </>
  )
}

export default App
