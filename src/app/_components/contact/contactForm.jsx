"use client"

import { Lato } from "next/font/google"
import { Input } from "./input"
import { Button } from "../cards/button"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { TextArea } from "./textArea"
import { options } from "../../../../lib/options"
import { submitForm } from "../../../../lib/submitForm"


export const lato = Lato({
    weight: ["100", "300", "400", "700"],
    subsets: ["latin"]
})

const schema = yup.object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().email().required(),
    phone: yup.number().required(),
    message: yup.string().required(),
    policy: yup.string().required()
})

export const ContactForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({resolver: yupResolver(schema)})
    
    const submitContactForm = (data) => {
        const url = `${process.env.NEXT_PUBLIC_BASE_URL}contact/submit`
        submitForm(url, options(data))
    }
    
    return (
        <form onSubmit={handleSubmit(submitContactForm)}
            className={`w-full h-auto px-[48px] py-[40px] bg-white rounded-[32px] ${lato.className} `}>
            <section className="w-full space-y-[16px] mb-[48px] ">
                <h3 className="text-4xl font-semibold">
                    Send us a message
                </h3>
                <p className="text-xl text-[#666668] ">
                    Fill in what you need and we'll respond promptly.
                </p>
            </section>
            <section className="flex flex-col ">
                <div className="flex gap gap-x-[16px] items-center">
                    <Input register={register} error={errors.firstName?.message} name={"firstName"} type={"text"} label={"First Name"} placeholder={"Enter first name"}/>
                    <Input register={register} error={errors.lastName?.message} name={"lastName"} type={"text"} label={"Last Name"} placeholder={"Enter last name"}/>
                </div>
                <Input register={register} error={errors.email?.message} name={"email"} type={"email"} label={"Email Address"} placeholder={"Enter email address"}/>
                <Input register={register} error={errors.phone?.message} name={"phone"} type={"number"} label={"Phone Number"} placeholder={"Enter phone number"}/>
                <TextArea register={register} error={errors.message?.message} name={"message"} label={"Message"} placeholder={"Write message"}/>
                <Input register={register} error={errors.policy?.message} name={"policy"} type={"radio"} label={"I agree to the privacy policy"}/>
                <Button 
                    buttonStyle={"w-[170px] h-auto px-[24px] py-[16px] text-white font-medium bg-[#216388] rounded-[20px] self-end duration-300 hover:bg-[#9FCAE2] active:bg-[#2A7EAF] mt-5 md:mt-0"} 
                    type={"submit"}>
                    Send message
                </Button>
            </section>
        </form>
    )
} 