import React from 'react'

const Part = (props) => {
  console.log(props.name)
  console.log(props.exercises)

  return (
    <p>
      {props.name} {props.exercises}
    </p>
  )
}

const Header = (props) => {
  console.log(props)
  return (
    <h1>{props.course.name}</h1>
  )
}

const Content = (props) => {
  console.log(props.parts[0].name)
  console.log(props.parts[0].exercises)
  console.log(props.parts[1].name)
  console.log(props.parts[1].exercises)
  console.log(props.parts[2].name)
  console.log(props.parts[2].exercises)


  return (
    <div>
    <Part name={props.parts[0].name} exercises={props.parts[0].exercises} />
    <Part name={props.parts[1].name} exercises={props.parts[1].exercises} />
    <Part name={props.parts[2].name} exercises={props.parts[2].exercises} />
    </div>
  )
}

const Total = (props) => {
  console.log(props.parts)
  return (
    <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
  )
}


const App = () => {
  const course = {
    name: 'Half Stack application developmpent',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name:'State of a component',
        exercises: 14
      }
    ]
  }


  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}


export default App;
