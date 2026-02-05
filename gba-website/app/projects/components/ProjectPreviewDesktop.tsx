import { fetchProjectImage } from "@/backend/fetchFunctions"
import { ProjectTableType } from "@/backend/tables"
import { projectFont } from "@/global/fonts/fonts"
import { useLanguage } from "@/global/LanguageContext/LanguageContext"
import { motion } from "framer-motion"
import Image from "next/image"
import { typesOption } from "./consts"

export const ProjectPreview = ({ project, isEven }: { project: ProjectTableType | null, isEven: boolean }) => {
    const languageContext = useLanguage();

    return (
        <motion.a
            href={`/projects/${project?.id}`}
            className={`relative w-[70vw] h-[60vh] group mt-25 flex flex-row
                justify-between items-center`}
            animate="initial"
            whileHover="hover"
        >
            {!isEven && (
                <>
                    <div className="absolute w-full h-full flex justify-center items-center">
                        <div className="relative w-full h-[80%] bg-gray-700 overflow-hidden">
                            <motion.div
                                className="absolute inset-0 bg-black"
                                variants={{
                                    initial: { x: "-100%" },   // start off-screen
                                    hover: { x: "0%" }      // slide fully in
                                }}
                                transition={{ duration: 0.4, ease: "easeInOut" }}
                            ></motion.div>
                        </div>
                    </div>
                    <div
                        className={`relative w-[25vw] h-[80%] p-10 overflow-hidden
                            text-white flex flex-col justify-center items-start z-20 ${projectFont.className}`}
                    >
                        <p className={`text-2xl mb-3 font-bold`}>
                            {project?.name}
                        </p>
                        <p className="text-lg">
                            <span className="font-bold">{languageContext?.language == "en" ? "Type: " : "Loại dự án: "}</span>
                            <span>{project?.projectType}</span>
                        </p>
                        <p className="text-lg">
                            <span className="font-bold">{languageContext?.language == "en" ? "Address: " : "Địa chỉ: "}</span>
                            <span>{project?.siteAddress}</span>
                        </p>
                        <p className="text-lg">
                            <span className="font-bold">{languageContext?.language == "en" ? "Completion Date: " : "Ngày hoàn thành: "}</span>
                            <span>{project?.endDate}</span>
                        </p>
                    </div>
                </>
            )}
            <div className="relative w-[40vw] h-full z-10">
                <motion.div className="absolute w-full h-full border-4 p-3 border-black bg-white
                    group-hover:border-red-500 duration-150 z-3">
                    <Image
                        src={fetchProjectImage(`${project?.folderName}${project?.coverImage}`)}
                        width={1920}
                        height={1080}
                        alt="Project Cover Image"
                        className="w-full h-full object-cover"
                    />
                </motion.div>
                <motion.div
                    className="absolute w-full h-full border-4 p-3 border-black bg-white
                        group-hover:border-red-500 z-2 opacity-75"
                    initial={{
                        rotate: 0,
                        bottom: "0.75rem",
                        left: "0.75rem"
                    }}
                    variants={{
                        hover: {
                            rotate: 3,
                            bottom: "1.25rem",
                            left: "1.25rem"
                        }
                    }}
                    transition={{ duration: 0.5, type: "spring" }}
                >
                    <div className="w-full h-full bg-gray-500"></div>
                </motion.div>
                <motion.div
                    className="absolute w-full h-full border-4 p-3 border-black bg-white
                        group-hover:border-red-500 z-1 opacity-50"
                    initial={{
                        rotate: 0,
                        bottom: "1.5rem",
                        left: "1.5rem"
                    }}
                    variants={{
                        hover: {
                            rotate: 6,
                            bottom: "2rem",
                            left: "2rem"
                        }
                    }}
                    transition={{ duration: 0.5, type: "spring" }}
                >
                    <div className="w-full h-full bg-gray-500"></div>
                </motion.div>
                <motion.div
                    className="absolute w-full h-full border-4 p-3 border-black bg-white
                        group-hover:border-red-500 duration-150 z-0 opacity-25"
                    initial={{
                        rotate: 0,
                        bottom: "2.25rem",
                        left: "2.25rem"
                    }}
                    variants={{
                        hover: {
                            rotate: 9,
                            bottom: "2.75rem",
                            left: "2.75rem"
                        }
                    }}
                    transition={{ duration: 0.5, type: "spring" }}
                >
                    <div className="w-full h-full bg-gray-500"></div>
                </motion.div>
            </div>
            {isEven && (
                <>
                    <div className="absolute w-full h-full flex justify-center items-center">
                        <div className="relative w-full h-[80%] bg-gray-700 overflow-hidden">
                            <motion.div
                                className="absolute inset-0 bg-black"
                                variants={{
                                    initial: { x: "100%" },   // start off-screen
                                    hover: { x: "0%" }      // slide fully in
                                }}
                                transition={{ duration: 0.4, ease: "easeInOut" }}
                            ></motion.div>
                        </div>
                    </div>
                    <div
                        className={`relative w-[25vw] h-[80%] p-10 overflow-hidden
                            text-white flex flex-col justify-center items-start z-20 ${projectFont.className}`}
                    >
                        <p className={`text-2xl mb-3 font-bold`}>
                            {project?.name}
                        </p>
                        <p className="text-lg">
                            <span className="font-bold">{languageContext?.language == "en" ? "Type: " : "Loại dự án: "}</span>
                            <span>
                                {
                                    languageContext?.language == "en" ?
                                    typesOption.find((p) => project?.projectType === p.value)?.labelEn :
                                    typesOption.find((p) => project?.projectType === p.value)?.labelVi
                                }
                            </span>
                        </p>
                        <p className="text-lg">
                            <span className="font-bold">{languageContext?.language == "en" ? "Address: " : "Địa chỉ: "}</span>
                            <span>{project?.siteAddress}</span>
                        </p>
                        <p className="text-lg">
                            <span className="font-bold">{languageContext?.language == "en" ? "Completion Date: " : "Ngày hoàn thành: "}</span>
                            <span>{project?.endDate}</span>
                        </p>
                    </div>
                </>
            )}
        </motion.a>
    )
}