export const Course = ({ course }) => {
    return (
        <div>
            <Header name={course.name} />
            <Content parts={course.parts} />
            <Total exercises={course.parts.map(part => part.exercises)} />
        </div>
    )
}

export const Header = ({ name }) => {
    return (
        <h1>{name}</h1>
    )
}

export const Content = ({ parts }) => {
    return (
        parts.map((part, index) =>
            <Part key={index} part={part} />)
    )
}

export const Total = ({ exercises }) => {
    const totalExercises = exercises.reduce((accum, x) => accum + x, 0);
    return (
        <p><b>total of {totalExercises} exercises</b></p>
    )
}

export const Part = ({ part }) => {
    return (
        <p>
            {part.name} {part.exercises}
        </p>
    )
}

export default Course