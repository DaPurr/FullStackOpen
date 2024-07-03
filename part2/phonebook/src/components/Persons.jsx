import { Person } from "./Person"

export const Persons = ({ persons, filter }) => {
    return (
        <table>
            <tbody>
                {persons
                    .filter(person => filter(person))
                    .map(person =>
                        <Person
                            key={person.name}
                            name={person.name}
                            number={person.number}
                        />)}
            </tbody>
        </table>
    )
}
