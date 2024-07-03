export const Notification = ({ message, isError }) => {
    return message && (
        <div className={isError ? 'error' : 'notification'}>
            {message}
        </div>
    )
}
