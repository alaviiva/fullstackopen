import React from 'react'

const Header = (props) => {

  return (
    <>
      <h1>{props.course}</h1>
    </>
  )
}

const Part = (props) => {
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>
  )
}

const Content = ({parts}) => {
  console.log(parts)

  return (
    <div>
      {parts.map(part => <Part key={part.id} part={part} />)}
    </div>
  )
}

const Total = (props) => {
  const total = props.parts.reduce(
    (previousValue, currentValue) => previousValue + currentValue.exercises, 0
  )

  return (
    <div>
      <p>Number of exercises {total}</p>
    </div>
  )
}

const Course = ({course}) => {
  console.log(course)

  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  )
}

export default Course
