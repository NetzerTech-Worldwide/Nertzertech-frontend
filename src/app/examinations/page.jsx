import { UpcomingExamsCard } from "../_components/examinations/upcomingExamsCard"
import { ExaminationsNavigation } from "../_components/examinations/examinationsNavigation"


const examStyles = `border-1 border-black/10 bg-white py-[57px] px-[34px] mt-[54px] mx-[57px] rounded-2xl`
// const testStyles = `mt-[56px] mb-[48px] mx-[53px]`

const Examinations = () => {

    return (
            <main className={`w-auto h-auto bg-white ${examStyles} `}>
                <ExaminationsNavigation />
                <section className="w-full mt-[54px] space-y-[20px] ">
                    <UpcomingExamsCard />
                    <UpcomingExamsCard />
                    <UpcomingExamsCard />
                    <UpcomingExamsCard />
                    <UpcomingExamsCard />
                </section>
            </main>
    )
}

export default Examinations