import { ProjectType } from "@/backend/tables"
import { projectFont } from "@/global/fonts/fonts"
import { useLanguage } from "@/global/LanguageContext/LanguageContext"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

export const ProjectPreview = ({ project, isEven }: { project: ProjectType | null, isEven: boolean }) => {
    const languageContext = useLanguage();

    return (
        <Link
            href={"/"}
            className="relative w-[80vw] h-[60vh] group mt-10 flex flex-col justify-between items-center"
        >
            <div className="relative w-full h-[60%] mr-5">
                <div className="absolute w-full h-full border-4 p-2 border-black bg-white
                    group-hover:border-red-500 duration-150 z-3">
                    <Image
                        src="/test/diningbg.png"
                        width={4492}
                        height={2995}
                        alt="Project Cover Image"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div
                    className="absolute bottom-3 left-3 w-full h-full border-4 p-2 border-black bg-white
                        group-hover:border-red-500 z-2 opacity-75"
                >
                    <div className="w-full h-full bg-gray-500"></div>
                </div>
                <div
                    className="absolute bottom-6 left-6 w-full h-full border-4 p-2 border-black bg-white
                        group-hover:border-red-500 z-1 opacity-50"
                >
                    <div className="w-full h-full bg-gray-500"></div>
                </div>
                <div
                    className="absolute bottom-9 left-9 w-full h-full border-4 p-2 border-black bg-white
                        group-hover:border-red-500 duration-150 z-0 opacity-25"
                >
                    <div className="w-full h-full bg-gray-500"></div>
                </div>
            </div>
            <div
                className={`relative w-full h-[35%] p-5 overflow-hidden
                    ${isEven ? "bg-red-500" : "bg-gray-700"} text-white flex flex-col
                    justify-center items-start z-20 ${projectFont.className}`}
            >
                <p className={`text-lg mb-3 font-bold`}>
                    Project Title Number 1
                </p>
                <p className="text-sm">
                    <span className="font-bold">{languageContext?.language == "en" ? "Type: " : "Loại dự án: "}</span>
                    <span>Education</span>
                </p>
                <p className="text-sm">
                    <span className="font-bold">{languageContext?.language == "en" ? "Address: " : "Địa chỉ: "}</span>
                    <span>Project Title Number 1</span>
                </p>
                <p className="text-sm">
                    <span className="font-bold">{languageContext?.language == "en" ? "Completion Date: " : "Ngày hoàn thành: "}</span>
                    <span>01/01/2000</span>
                </p>
            </div>
        </Link>
    )
}