export const Button = ({ children, buttonStyle }) => {

    return (
        <button className={`${buttonStyle} cursor-pointer`} >
            {children}
        </button>
    )
}