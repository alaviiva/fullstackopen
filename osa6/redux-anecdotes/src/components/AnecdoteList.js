import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'

const Anecdote = ({ anecdote, handleClick }) => {
  return(
    <div>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={() => handleClick(anecdote.id)}>vote</button>
      </div>
    </div>
  )
}

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.sort((a, b) => b.votes - a.votes))
  const dispatch = useDispatch()

  const handleVote = (id) => {
    console.log('vote', id)
    dispatch(vote(id))
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
