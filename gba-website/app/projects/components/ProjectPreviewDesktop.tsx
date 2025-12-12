import { Project } from "@/backend/tables"
import { projectFont } from "@/global/fonts/fonts"
import { useLanguage } from "@/global/LanguageContext/LanguageContext"
import { motion } from "framer-motion"
import Image from "next/image"

export const ProjectPreview = ({ project, isEven }: { project: Project | null, isEven: boolean }) => {
    const languageContext = useLanguage();

    return (
        <motion.a
            href={"/projects/project"}
            className="relative w-[70vw] h-[60vh] group mt-25 flex flex-row justify-between items-center"
            animate="initial"
            whileHover="hover"
        >
            {!isEven && (
                <motion.div
                    className={`relative w-[25vw] h-[80%] p-5 overflow-hidden
                        bg-gray-700 text-white flex flex-col justify-center items-start z-20 ${projectFont.className}`}
                >
                    <p className={`text-2xl mb-3 font-bold`}>
                        Project Title Number 1
                    </p>
                    <p className="text-lg">
                        <span className="font-bold">{languageContext?.language == "en" ? "Type: " : "Loại dự án: "}</span>
                        <span>Education</span>
                    </p>
                    <p className="text-lg">
                        <span className="font-bold">{languageContext?.language == "en" ? "Address: " : "Địa chỉ: "}</span>
                        <span>Project Title Number 1</span>
                    </p>
                    <p className="text-lg">
                        <span className="font-bold">{languageContext?.language == "en" ? "Completion Date: " : "Ngày hoàn thành: "}</span>
                        <span>01/01/2000</span>
                    </p>
                    <motion.div
                        className="absolute inset-0 bg-black -z-10"
                        variants={{
                            initial: { x: "-100%" },   // start off-screen
                            hover: { x: "0%" }      // slide fully in
                        }}
                        transition={{ duration: 0.2 }}
                    ></motion.div>
                </motion.div>
            )}
            <div className="relative w-[40vw] h-full">
                <motion.div className="absolute w-full h-full border-4 p-3 border-black bg-white
                    group-hover:border-red-500 duration-150 z-3">
                    <Image
                        src="/test/diningbg.png"
                        width={4492}
                        height={2995}
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
                <motion.div
                    className={`relative w-[25vw] h-[80%] p-5 overflow-hidden
                        bg-red-500 text-white flex flex-col justify-center items-start z-20 ${projectFont.className}`}
                >
                    <p className={`text-2xl mb-3 font-bold`}>
                        Project Title Number 1
                    </p>
                    <p className="text-lg">
                        <span className="font-bold">{languageContext?.language == "en" ? "Type: " : "Loại dự án: "}</span>
                        <span>Education</span>
                    </p>
                    <p className="text-lg">
                        <span className="font-bold">{languageContext?.language == "en" ? "Address: " : "Tên dự án: "}</span>
                        <span>Project Title Number 1</span>
                    </p>
                    <p className="text-lg">
                        <span className="font-bold">{languageContext?.language == "en" ? "Completion Date: " : "Ngày hoàn thành: "}</span>
                        <span>01/01/2000</span>
                    </p>
                    <motion.div
                        className="absolute inset-0 bg-black -z-10"
                        variants={{
                            initial: { x: "100%" },   // start off-screen
                            hover: { x: "0%" }      // slide fully in
                        }}
                        transition={{ duration: 0.2 }}
                    ></motion.div>
                </motion.div>
            )}
        </motion.a>
    )
}