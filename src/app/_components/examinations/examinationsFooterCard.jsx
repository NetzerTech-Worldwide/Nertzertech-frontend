import Image from "next/image"
import Link from "next/link"

export const ExaminationsFooterCard = ({ content }) => {
    const baseURL = "http://localhost:3000"

    return (
        <Link href={`${baseURL}/${content.link}`}
            className="w-auto h-[195px] flex justify-center items-center border border-black/10 shadow-[0_4px_3px_0_#000000]/6 rounded-[10px] ">
            <div key={content.title} className="flex flex-col gap-y-[23px] items-center w-[118px]  ">
                <Image 
                    src={content.icon}
                    alt="class icon"
                    width={30}
                    height={24}
                />
                <h4 className="font-medium text-black ">
                    {content.title}
                </h4>
            </div>
        </Link>
    )
}