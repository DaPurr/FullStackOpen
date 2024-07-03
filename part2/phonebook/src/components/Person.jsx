export const PersonEntry = ({ id, name, number, deletePerson }) => {
    return (
        <tr>
            <td>{name}</td>
            <td>{number}</td>
            <td><button onClick={() => deletePerson(id)}>delete</button></td>
        </tr>
    )
}
