import { Card } from "../cards/card"
import profilePhoto from "../../../../public/_assets/profile-photo.png"

export const Profile = () => {

    return (
        <main className="w-full h-auto text-white">
            <Card cardStyle={"h-auto py-[47px] px-[39px] bg-gradient-to-b from-[#5ABEF6] to-[#216388] rounded-[24px] "}>
                <section className="w-full flex gap-x-[31px] items-center">
                    <div className="w-[204px] aspect-square relative border-3 border-[#F2F2F2] rounded-full ">
                        <Card.Icon ImgSrc={profilePhoto} type={"background"}>
                        </Card.Icon>
                    </div>
                    <div className="w-full">
                        <Card.Title titleStyle={"text-5xl font-bold"}>Samuel James</Card.Title>
                        <div className="w-full flex items-center justify-between mt-[16px]">
                            <div className="">
                                <p className="text-xl font-medium mb-[16px]">
                                    School: <span className="font-semibold">Purple Heaven College</span>
                                </p>
                                <p className="text-xl font-medium">
                                    Mother: <span className="font-semibold">Samuel Esther Rita</span>
                                </p>
                            </div>
                            <div className="">
                                <p className="text-xl font-medium mb-[16px]">
                                    Age: <span className="font-semibold">15 Years</span>
                                </p>
                                <p className="text-xl font-medium">
                                    Father: <span className="font-semibold">Samuel Mike Daniels</span>
                                </p>
                            </div>
                            <div className="">
                                <p className="text-xl font-medium mb-[16px]">
                                    Class Teacher: <span className="font-semibold">Mercy Grace</span>
                                </p>
                                <p className="text-xl font-medium">
                                    Student ID: <span className="font-semibold">STU0023</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </Card>
        </main>
    )
}