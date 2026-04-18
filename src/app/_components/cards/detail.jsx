export const Detail = ({ children, detailStyle }) => {

    return (
        <span className={`${detailStyle}`}>
                 {children}   
        </span>
    )
}