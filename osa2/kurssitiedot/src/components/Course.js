import React from 'react'


const Course = ({ course }) => {
    console.log( course )
    return (
      <div>
        <Header text={course.name} />
        <Content parts={course.parts} />
      </div>
    )
}

const Part = (props) => {
    return (
      <p>
        {props.name} {props.exercises}
      </p>
    )
  }

const Header = (props) => <h2>{props.text}</h2>

const Content = (props) => {
return (
    <div>
      {props.parts.map(part => <Part key={part.name} name={part.name} exercises={part.exercises} />)}
      <Total parts={props.parts} />
    </div>
);
}

const Total = ({ parts }) => {
    let initialValue = 0
    const total = parts.reduce(
      (accumulator, currentValue) => accumulator + currentValue.exercises
        , initialValue
    )
    return (
      <p><b>Total of {total} exercises</b></p>
    )
  }

export default Course;
