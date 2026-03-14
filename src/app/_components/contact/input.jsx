export const Input = ({ name, label, type, placeholder, register, error }) => {
    const errorMessage = "Required*"

    return (
        <>
            {type !== "radio" ? 
                <div className="w-full mb-[24px]">
                    <label htmlFor={name} className="text-xl font-medium">
                        {label}
                    </label>
                    <input 
                        name={name}
                        type={type}
                        placeholder={placeholder}
                        className={`w-full h-auto p-[15px] text-xl rounded-[16px] mt-[16px] outline-none placeholder-[#00000073]
                            shadow-[0_4px_4px_0_#E3E0E036] ${error ? "border-[1.5px] border-[#E63B2E] " : "border-[1.5px] border-[#ACADAF] focus:border-[#2A7EAF]"} relative`}
                        {...register(name)}
                    />
                    <span className="text-[#E63B2E] flex justify-start absolute ">
                        {error && errorMessage}
                    </span> 
                </div> : 
                <div className="flex items-center gap-x-3 ">
                    <input 
                        name={name}
                        type={type} 
                        className="scale-[120%] cursor-pointer translate-y-[2px]"
                        {...register(name)}
                    />
                    <label htmlFor={name} className="text-xl text-[#2A7EAF] font-medium">
                        {label}
                    </label>
                    <span className="text-[#E63B2E] ">
                        {error && errorMessage}
                    </span>
                </div>
            }
        </>
    )
}