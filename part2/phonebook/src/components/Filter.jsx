export const Filter = ({ query, onChange }) => {
    return (
        <div>
            filter shown with
            <input value={query} onChange={onChange} />
        </div>
    )
}
