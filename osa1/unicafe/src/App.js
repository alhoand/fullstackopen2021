import React, { useState } from 'react'


const Button = ({ handleClick, text }) =>
    <button onClick={handleClick}>{text}</button>

const Header = ({ text }) => <h1>{text}</h1>

const StatisticLine = ({ text, value, symbol }) => {
  return(
    <tr>
      <td>{text}</td>
      <td>{value} {symbol ? symbol : ""}</td>
    </tr>
  )

}

const Statistics = (props) => {
  console.log(props)

  if (props.all) {
    return (
      <div>
        <table>
          <tbody>
          <StatisticLine text="good" value={props.good} />
          <StatisticLine text="neutral" value={props.neutral} />
          <StatisticLine text="bad" value={props.bad} />
          <StatisticLine text="all" value={props.all} />
          <StatisticLine text="average" value={props.average} />
          <StatisticLine text="positive" value={props.positive} symbol='%' />   
          </tbody>
        </table>
        
      </div>
    )
  }
  return (
    <div>
      <p>No feedback given</p>
    </div>
  )

}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const all = () => good + neutral + bad

  const avg = () => all() ? (good - bad) / all() : 0.0

  const positive = () =>
    all() ? (good / all(good, neutral, bad)) * 100 : 0
  
  return (
    <div>
      <Header text="give feedback" />
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <Header text="statistics" />
      <Statistics good={good}
                  neutral={neutral} 
                  bad={bad} 
                  all={all()} 
                  average={avg()} 
                  positive={positive()}/>
    </div>
  );
}

export default App;
