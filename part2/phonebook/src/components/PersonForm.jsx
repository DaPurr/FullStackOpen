export const PersonForm = ({ newPersonNumber, newPersonName, onSubmit, onChangeName, onChangeNumber }) => {
    return (
        <form onSubmit={onSubmit}>
            <table>
                <tbody>
                    <tr>
                        <td>name:</td>
                        <td><input value={newPersonName} onChange={onChangeName} /></td>
                    </tr>
                    <tr>
                        <td>number:</td>
                        <td><input value={newPersonNumber} onChange={onChangeNumber} /></td>
                    </tr>
                </tbody>
            </table>
            <div>
                <button type="submit">add</button>
            </div>
        </form>

    )
}