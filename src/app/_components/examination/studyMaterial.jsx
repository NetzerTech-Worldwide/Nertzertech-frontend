import { Card } from "../cards/card"
import fileIcon from "../../../../public/_assets/file-icon.svg"
import pdfIcon from "../../../../public/_assets/pdf-icon.svg"
import downloadIcon from "../../../../public/_assets/download-icon.svg"
import { Button } from "../cards/button"

export const StudyMaterial = ({ data }) => {

    return (
        <Card cardStyle={"flex justify-between items-center p-[24px] mb-[24px] border border-[#DCDEE1] hover:border-[#216388] rounded-[24px] cursor-pointer"}>
            <section className="flex items-center gap-x-[16px] ">
                <Card.Icon ImgSrc={fileIcon} ImgWidth={32} ImgHeight={32}></Card.Icon>
                <div className="space-y-[16px] ">
                    <h3 className="font-semibold capitalize">
                        {data.topic}
                    </h3>
                    <div className="flex gap-x-[4px] ">
                        <Card.Icon ImgSrc={pdfIcon} ImgWidth={13} ImgHeight={13}></Card.Icon>
                        <span className="text-[#5D5C5C] ">PDF-{data.size} MB</span>
                    </div>
                </div>
            </section>
            <section className="">
                <Button buttonStyle={"w-[160px] h-[46px] flex items-center gap-x-[10px] py-[16px] px-[24px] text-[#216388] font-medium border border-[#216388] rounded-[10px] "}>
                    <Card.Icon ImgSrc={downloadIcon} ImgWidth={14} ImgHeight={12}></Card.Icon>
                    <span>Download</span>
                </Button>
            </section>
        </Card>
    )
}