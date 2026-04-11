import { faqs } from "../../../../../../../lib/constants"
import { Accordion } from "../_components/accordion"

export const FAQs = () => {
    
    return (
        <main className="w-full py-[21px] px-[16px] rounded-[9px] border border-[#DCDEE1] ">
            <h2 className="text-2xl font-semibold mb-[22px] ">
                Frequently Asked Questions
            </h2>
            {
                faqs.map((faq, index) =>
                    <Accordion key={index} faq={faq} />
                )
            }
        </main>
    )
}