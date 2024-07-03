import { PersonEntry } from "./Person"

export const Persons = ({ persons, filter, deletePerson }) => {
    return (
        <table>
            <tbody>
                {persons
                    .filter(person => filter(person))
                    .map(person =>
                        <PersonEntry
                            id={person.id}
                            key={person.name}
                            name={person.name}
                            number={person.number}
                            deletePerson={deletePerson}
                        />)}
            </tbody>
        </table>
    )
}
