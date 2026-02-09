export const Status = ({ children, statusStyle }) => {

    return (
        <span className={`${statusStyle}`}>
                 {children}   
        </span>
    )
}