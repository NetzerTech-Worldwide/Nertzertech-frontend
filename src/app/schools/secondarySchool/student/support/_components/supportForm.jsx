import { Input } from "./input"
import { FileInput } from "./fileInput"
import * as yup from "yup"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { Button } from "@/app/_components/cards/button"
import { useContext, useState } from "react"
import { examContext } from "../../../../../../../lib/context/examContext"
import { useMutation } from "@tanstack/react-query"
import { postSupportData } from "../../../../../../../lib/api.js/post"


const schema = yup.object().shape({
    category: yup.string().required(),
    subject: yup.string().required(),
    description: yup.string().required(),
})

export const SupportForm = () => {
    const [files, setFiles] = useState([])
    const { register, handleSubmit, formState: { errors } } = useForm({resolver: yupResolver(schema)})
    const { setSupportModal } = useContext(examContext)

    // Awaiting support end point
    // const url = `${process.env.BASE_URL}support/submit`
    // const mutation = useMutation({
    //     mutationFn: (data) => postSupportData(url, data)
    // })

    // const submitSupportForm = (data) => {
    //     const formData = new FormData()
    //     formData.append("category", data.category)
    //     formData.append("subject", data.subject)
    //     formData.append("description", data.description)
    //     if (files.length > 0) {
    //         for (let i = 0; i < files.length; i++) {
    //             formData.append("files", files[i])
    //         }
    //     }
    //     mutation.mutate(formData)
    // }

    const submitSupportForm = (data) => {
        if (files.length > 0) {
            data.files = files
        }
        console.log(data)
    }

    return (
        <form onSubmit={handleSubmit(submitSupportForm)}>
            <section className="w-full px-5">
                <Input register={register} error={errors.category?.message} name={"category"} label={"Issue Category"} placeholder={"Describe the category of your problem"} />
                <Input register={register} error={errors.subject?.message} name={"subject"} label={"Subject"} placeholder={"Brief summary of your issue"} />
                <Input register={register} error={errors.description?.message} name={"description"} label={"Description"} placeholder={"Provide detailed information about your issue..."} />
                <FileInput name={"files"} files={files} setFiles={setFiles} />
            </section>
            <section className="w-full h-[92px] flex justify-end items-center gap-x-[20px] px-[16px] mt-[120px] bg-[#EAF3F9]">
                <Button onClick={() => setSupportModal(false)}
                    buttonStyle={"w-[195px] h-[48px] flex justify-center items-center py-[12px] text-[#2A7EAF] border border-[#2A7EAF] hover:bg-[#2A7EAF] hover:text-white active:bg-white active:text-[#2A7EAF] rounded-[9px]"}>
                    Close
                </Button>
                <Button buttonStyle={"w-[195px] h-[48px] flex justify-center items-center py-[12px] text-white bg-[#2A7EAF] hover:bg-[#9FCAE2] active:bg-[#2A7EAF] rounded-[9px]"}
                    type={"submit"}
                >
                    Submit Request
                </Button>
            </section>
        </form>
    )
}