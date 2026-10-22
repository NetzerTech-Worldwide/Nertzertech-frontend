import { SearchIcon } from "lucide-react"

export const SearchBar = () => {
    return (
        <div className="w-full flex items-center gap-x-[12px] py-[13px] px-[16px] border border-[#DCDEE1] bg-white rounded-[9px]  ">
            <SearchIcon color="#2A7EAF"/>
            <input 
                type="text"
                placeholder="Search for help articles, FAQs, or solutions..."
                className="w-full outline-none placeholder-[#000000B2]"
            />
        </div>
    )
}