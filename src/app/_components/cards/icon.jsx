import Image from "next/image"


export const Icon = ({ iconStyle, ImgSrc, ImgWidth, ImgHeight, type }) => {

    return (
        <Image 
            src={ImgSrc}
            alt="image"
            width={ImgWidth}
            height={ImgHeight}
            className={`${type === "background" ? "object-cover rounded-[inherit] " : iconStyle}`}
            fill={type === "background" && true}
        />
    )
}