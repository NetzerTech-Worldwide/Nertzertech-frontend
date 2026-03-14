export const Button = ({ children, buttonStyle, type, onClick, disable }) => {    

    return (
        <button 
            onClick={onClick}
            className={`${buttonStyle} cursor-pointer`}
            type={type}
            disabled={disable} 
        >
            {children}
        </button>
    )
}