import React, { useState } from 'react'

const Header = ({ text }) => 
  <h2>{text}</h2>

const Button = ({ handleClick, text}) =>
  <button onClick={handleClick}>{text}</button>

const Anecdote = ( { anecdote, votes }) => {
  return (
    <div>
      {anecdote}
      <br></br>
      has {votes} votes
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]

  const [selected, setSelected] = useState(0)

  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))
  
  const randomGenerator = (maxIndex) => {
    const rand = Math.random() * 10
    const floor = Math.floor(rand)
    const randomIndex = floor % (maxIndex)
    return randomIndex
  }
  
  const updateText = () => {
    const temp = randomGenerator(anecdotes.length)
    setSelected(temp)
  }
  const vote = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }

  const indexOfLargest = () => {
    const max = votes.reduce((a, b) => Math.max(a, b) )
    return votes.indexOf(max)
  }

  return (
    <div>
      <Header text="Anecdote of the day" />
      <Anecdote anecdote={anecdotes[selected]} votes={votes[selected]} />
      <Button handleClick={vote} text="vote" />
      <Button handleClick={updateText} text="next anecdote" />
      <Header text="Anecdote with most votes" />
      <Anecdote anecdote={anecdotes[indexOfLargest()]} votes={votes[indexOfLargest()]} />
    </div>
  )
}

export default App