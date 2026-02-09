export const Time = ({ children, timeStyle }) => {

    return (
        <span className={`${timeStyle}`}>
            {children}
        </span>
    )
}