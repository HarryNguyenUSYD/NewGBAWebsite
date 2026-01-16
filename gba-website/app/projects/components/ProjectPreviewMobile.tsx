import { fetchProjectImage } from "@/backend/fetchFunctions"
import { ProjectTableType } from "@/backend/tables"
import { projectFont } from "@/global/fonts/fonts"
import { useLanguage } from "@/global/LanguageContext/LanguageContext"
import Image from "next/image"
import Link from "next/link"
import { typesOption } from "./consts"

export const ProjectPreview = ({ project }: { project: ProjectTableType | null }) => {
    const languageContext = useLanguage();

    return (
        <Link
            href={`/projects/${project?.id}`}
            className={`relative w-[80vw] h-[70vh] group mt-10 flex flex-col justify-between items-center bg-gray-700`}
        >
            <div className="relative w-full h-[60%] mr-5">
                <div className="absolute w-full h-full border-4 p-2 border-black bg-white z-3">
                    <Image
                        src={fetchProjectImage(`${project?.folderName}${project?.coverImage}`)}
                        width={4492}
                        height={2995}
                        alt="Project Cover Image"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div
                    className="absolute bottom-3 left-3 w-full h-full border-4 p-2 border-black bg-white z-2 opacity-75"
                >
                    <div className="w-full h-full bg-gray-500"></div>
                </div>
                <div
                    className="absolute bottom-6 left-6 w-full h-full border-4 p-2 border-black bg-white z-1 opacity-50"
                >
                    <div className="w-full h-full bg-gray-500"></div>
                </div>
                <div
                    className="absolute bottom-9 left-9 w-full h-full border-4 p-2 border-black bg-white z-0 opacity-25"
                >
                    <div className="w-full h-full bg-gray-500"></div>
                </div>
            </div>
            <div
                className={`relative w-full h-[35%] p-5 pb-10 overflow-hidden text-white flex flex-col
                    justify-center items-start z-20 ${projectFont.className}`}
            >
                <p className={`text-lg mb-3 font-bold`}>
                    {project?.name}
                </p>
                <p className="text-sm">
                    <span className="font-bold">{languageContext?.language == "en" ? "Type: " : "Loại dự án: "}</span>
                    <span>
                        {
                            languageContext?.language == "en" ?
                            typesOption.find((p) => project?.projectType === p.value)?.labelEn :
                            typesOption.find((p) => project?.projectType === p.value)?.labelVi
                        }
                    </span>
                </p>
                <p className="text-sm">
                    <span className="font-bold">{languageContext?.language == "en" ? "Address: " : "Địa chỉ: "}</span>
                    <span>{project?.siteAddress}</span>
                </p>
                <p className="text-sm">
                    <span className="font-bold">{languageContext?.language == "en" ? "Completion Date: " : "Ngày hoàn thành: "}</span>
                    <span>{project?.endDate}</span>
                </p>
            </div>
        </Link>
    )
}