export const Button = ({ children, buttonStyle }) => {

    return (
        <button className={`${buttonStyle}`} >
            {children}
        </button>
    )
}