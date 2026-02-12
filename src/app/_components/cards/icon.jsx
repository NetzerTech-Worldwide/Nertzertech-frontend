import Image from "next/image"


export const Icon = ({ iconStyle, ImgSrc, ImgWidth, ImgHeight }) => {

    return (
        <Image 
            src={ImgSrc}
            alt="image"
            width={ImgWidth}
            height={ImgHeight}
            className={`${iconStyle}`}
        />
    )
}