export const Input = ({ register, error, name, label, placeholder }) => {

    return (
        <div className="w-full mb-[24px] relative">
            <label htmlFor={label} className="text-xl font-medium ">{label}</label>
            <input 
                name={name}
                type="text"
                placeholder={placeholder}
                className={`w-full h-[52px] py-[10px] px-[16px] bg-[#F3F3F5] placeholder-[#ACADAF] ${error ? "border-[1.5px] border-[#E63B2E]" : "focus:border-[#2A7EAF]"}
                     mt-[10px] rounded-[7px] focus:border  outline-none`}
                {...register(name)}
            />
            <span className="flex justify-start text-sm text-[#E63B2E] absolute">
                {error && `Required*`}
            </span>
        </div>
    )
}