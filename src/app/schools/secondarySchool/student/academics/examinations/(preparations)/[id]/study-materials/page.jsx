import { studyMaterial } from "../../../../../../../../../../lib/constants"
import { StudyMaterial } from "../../../_components/studyMaterial"

const StudyMaterials = () => {

    return (
        <main className="w-full p-[38px] text-black space-y-[16px] bg-white">
            <h2 className="text-2xl font-semibold">
                Study Materials
            </h2>
            <p className="text-[#666668] ">
                Download and review these resources for exam preparation
            </p>
            <section className="mt-[38px] ">
                {
                    studyMaterial.map((data) =>
                        <StudyMaterial key={data.id} data={data}/>
                    )
                }
            </section>
        </main>
    )
}

export default StudyMaterials