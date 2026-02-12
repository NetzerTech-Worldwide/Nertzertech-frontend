export const Info = ({ children, infoStyle }) => {

    return (
        <h4 className={`${infoStyle}`}>
            {children}
        </h4>
    )
}