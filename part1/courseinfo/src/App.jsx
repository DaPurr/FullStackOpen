const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const PartEntry = (props) => {
  return (
    <p>
      {props.part} {props.exercise}
    </p>
  )
}

const Total = (props) => {
  return (
    <p>Number of exercises {props.exercises.reduce((accum, x) => accum + x, 0)}</p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    'Fundamentals of React',
    'Using props to pass data',
    'State of a component'
  ]
  const exercises = [10, 7, 14]

  return (
    <div>
      <Header course={course} />
      {parts.map((part, index) => <PartEntry key={index} part={part} exercise={exercises[index]} />)}
      <Total exercises={exercises} />
    </div>
  )
}

export default App