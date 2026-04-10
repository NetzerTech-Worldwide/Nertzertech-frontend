"use client"

import { Lato } from "next/font/google"
import { SupportHeader } from "../support/_components/supportHeader"
import { Button } from "@/app/_components/cards/button"
import { SearchBar } from "../support/_components/searchBar"
import { QuickHelp } from "./_components/quickHelp"
import { FAQs } from "../support/_components/faqs"
import { SupportModal } from "../support/_components/supportModal"
import { useContext } from "react"
import { supportContext } from "../../../../../../lib/context/supportContext"


const lato = Lato({
    weight: ["100", "400", "700"],
    subsets: ["latin"]
})

const SupportPage = () => {
    const { supportModal, setSupportModal } = useContext(supportContext)

    return (
        <main className={`w-full ${lato.className}`}>
            <SupportHeader title={"Support Center"} description={"Need help? Submit a request or browse common solutions."}>
                <Button onClick={() => setSupportModal(true)}
                    buttonStyle={"w-fit h-[46px] flex items-center justify-center py-[10px] px-[15px] text-white bg-[#2A7EAF] hover:bg-[#9FCAE2] active:bg-[#216388] rounded-[7px] "}>
                    Submit A Ticket
                </Button>
            </SupportHeader>
            <section className="w-full h-100 pl-[39px] pr-[50px] text-black mt-[24px] ">
                <SearchBar />
                <div className="mt-[36px] ">
                    <QuickHelp />
                </div>
                <div className="mt-[41px] pb-20">
                    <FAQs />
                </div>
            </section>
            {supportModal && <SupportModal />}
        </main>
    )
}

export default SupportPage
