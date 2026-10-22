"use client"

import { useState } from "react"
import { ChevronDown, ChevronRight } from "lucide-react"
import { Button } from "@/app/_components/cards/button"

export const Accordion = ({ faq }) => {
    const [showContent, setShowContent] = useState(false)

    return (
        <section className="border-b border-[#DCDEE1] ">
            <Button onClick={() => setShowContent((prev) => !prev)} 
                buttonStyle={"w-full flex items-center justify-between text-lg cursor-pointer"}>
                <h4 className="font-medium py-6">
                    {faq.title}
                </h4>
                {showContent ? <ChevronDown /> : <ChevronRight />}
            </Button>
            <div className={`grid overflow-hidden ${showContent ? "grid-rows-[1fr] opacity-100 pb-4" : "grid-rows-[0fr] opacity-0 pb-0"} transition-all ease-in-out duration-200`}>
                <span className={`overflow-hidden w-[90%]`}>
                    {faq.content}
                </span>
            </div>
        </section>
    )
}