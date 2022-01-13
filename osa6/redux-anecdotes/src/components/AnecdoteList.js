import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleClick }) => {
  return(
    <div>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={() => handleClick(anecdote)}>vote</button>
      </div>
    </div>
  )
}

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes.sort(
    (a, b) => b.votes - a.votes)
  )
  const dispatch = useDispatch()

  const handleVote = (anecdote) => {
    console.log('vote', anecdote.id)
    dispatch(vote(anecdote.id))
    dispatch(setNotification(`you voted '${anecdote.content}'`))
    setTimeout(() => {
      dispatch(setNotification(''))
    }, 5000)
  }

  return(
    <>
    {anecdotes.map(anecdote =>
      <Anecdote key={anecdote.id} anecdote={anecdote} handleClick={handleVote} />
    )}
    </>
  )
}

export default AnecdoteList
