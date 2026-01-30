import { ExaminationsFooter } from "../../_components/examinations/examinationsFooter"
import { ExaminationsNavigation } from "../../_components/examinations/examinationsNavigation"
import { PracticeTestsCard } from "../../_components/examinations/practiceTestsCard"

const testStyles = `mt-[56px] mb-[0px] mx-[57px]`
const PracticeTests = () => {

    return (
        <main className={`w-auto h-auto bg-white ${testStyles} `}>
            <ExaminationsNavigation />
            <section className="grid grid-cols-3 mt-[48px] gap-x-[44px] gap-y-[29px] ">
                <PracticeTestsCard />
                <PracticeTestsCard />
                <PracticeTestsCard />
                <PracticeTestsCard />
                <PracticeTestsCard />
            </section>
            <section className="mt-50">
                <ExaminationsFooter />
            </section>
        </main>
    )
}

export default PracticeTests