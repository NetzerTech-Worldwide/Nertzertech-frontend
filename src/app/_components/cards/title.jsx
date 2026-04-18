export const Title = ({ children, titleStyle}) => {

    return (
        <span className={`${titleStyle}`}>
            {children}
        </span>
    )
}