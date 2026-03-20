import { X } from "lucide-react"
import { SupportForm } from "../_components/supportForm"
import { useContext } from "react"
import { examContext } from "../../../../../../../lib/context/examContext"

export const SupportModal = () => {
    const { setSupportModal } = useContext(examContext)

    return (
        <main className="absolute max-w-screen min-h-screen flex justify-center inset-0 fixed bg-black/50">
            <section className="w-screen h-screen flex justify-center items-center">
                <div className="w-1/2 h-140 rounded-[9px] text-black bg-white overflow-y-scroll [&::-webkit-scrollbar]:hidden">
                    <div className="flex items-center justify-between py-6 px-5 mb-[43px] border-b border-[#DCDEE1] ">
                        <h2 className="text-[28px] font-bold ">
                            Submit a Support Request
                        </h2>
                        <X onClick={() => setSupportModal(false)} 
                            className="cursor-pointer hover:scale-120 duration-200"
                        />
                    </div>
                    <SupportForm />
                </div>
            </section>
        </main>
    )
}