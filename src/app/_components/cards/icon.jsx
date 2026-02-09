import Image from "next/image"


export const Icon = ({ iconStyle, ImgSrc }) => {

    return (
        <Image 
            src={ImgSrc}
            alt="image"
            width={30}
            height={24}
            className={`${iconStyle}`}
        />
    )
}