export const TextArea = ({ register, error, name, label, placeholder }) => {
    const errorMessage = "Required*"

    return (
        <div className="relative mb-5">
            <label htmlFor={name} className="text-xl font-medium">
                Message
            </label>
            <textarea 
                {...register(name)}
                name={name}
                placeholder={placeholder}
                className={`w-full h-[230px] px-[15px] py-[20px] text-xl rounded-[16px] mt-[16px] outline-none placeholder-[#00000073] resize-none mb-[16px] 
                    shadow-[0_4px_4px_0_#E3E0E036] ${error ? "border-[1.5px] border-[#E63B2E] " : "border-[1.5px] border-[#ACADAF] focus:border-[#2A7EAF]"}`}
                >
            </textarea>
            <span className="text-[#E63B2E] absolute bottom-[-5px] flex justify-start">
                {error && errorMessage}
            </span>
        </div>
    )
}