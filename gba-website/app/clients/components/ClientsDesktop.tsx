"use client";

import { navFont, titleFont } from "@/global/fonts/fonts";
import { useLanguage } from "@/global/LanguageContext/LanguageContext";
import SiteWrapper from "@/global/SiteWrapper/SiteWrapperDesktop";
import Image from "next/image";
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardDoubleArrowLeft, MdOutlineKeyboardArrowRight, MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import { IconType } from "react-icons";
import Link from "next/link";
import { motion } from "framer-motion";
import { TbCircleDotted } from "react-icons/tb";

export default function Clients() {
    return (
        <SiteWrapper topMargin={true}>
            <TitleSection />
            <PageSection currentValue={1} maxValue={10} />
            <ListSection />
            <PageSection currentValue={1} maxValue={10} />
        </SiteWrapper>
    );
}

const TitleSection = () => {
    const languageContext = useLanguage();

    return (
        <div className="relative w-full h-[60vh]">
            <Image
                src={"/test/diningbg.png"}
                alt="Title background"
                width={4992}
                height={2995}
                className="absolute w-full h-full object-cover brightness-30"
            />
            <div className="absolute w-auto h-auto bottom-0 right-0 m-20 flex flex-col justify-end items-end gap-10">
                <p className={`text-8xl ${titleFont.className}`}>
                    {languageContext?.language == "en" ? "Clients" : "Khách hàng"}
                </p>
                <p className="text-4xl">
                    {languageContext?.language == "en" ? "-- insert slogan here --" : "-- insert slogan here --"}
                </p>
            </div>
        </div>
    )
}

const PageButton = ({ isCurrent, value } : { isCurrent?: boolean, value: number }) => {
    return (
        <Link
            href={"/"}
            className={`size-12 rounded-full text-2xl flex justify-center items-center
                ${(isCurrent) ? "bg-red-500 text-white": "bg-gray-200 text-black hover:bg-red-500 hover:text-white"}
                duration-100 ${navFont.className}`}
        >
            {value}
        </Link>
    )
}

const MoveButton = ({ Icon, direction } : { Icon: IconType, direction: number }) => {
    return (
        <motion.a
            href="/"
            whileHover={"hover"}
            className="relative size-10 rounded-full overflow-hidden
                bg-gray-200 text-black hover:bg-red-500 hover:text-white duration-100"
        >
            <motion.div
                className="absolute w-full h-full flex justify-center items-center"
                animate={{ x: 0 }}
                variants={{
                    hover: {
                        x: ["0", direction < 0 ? "-0.5rem" : "0.5rem", "0"],
                        transition: { duration: 0.5, ease: "easeInOut", repeat: Infinity }
                    }
                }}
            >
                <Icon className="text-2xl" />
            </motion.div>
        </motion.a>
    )
}

const PageSection = ({ currentValue, maxValue }: { currentValue: number, maxValue: number }) => {
    return (
        <div className="w-full h-auto my-10 bg-white flex flex-row justify-center items-center gap-5">
            <MoveButton Icon={MdOutlineKeyboardDoubleArrowLeft} direction={-2} />
            <MoveButton Icon={MdOutlineKeyboardArrowLeft} direction={-1} />
            {currentValue - 3 >= 1 && <div className="text-2xl text-black">...</div>}
            {currentValue - 2 >= 1 && <PageButton value={currentValue - 2} />}
            {currentValue - 1 >= 1 && <PageButton value={currentValue - 1} />}
            <PageButton isCurrent value={currentValue} />
            {currentValue + 1 <= maxValue && <PageButton value={currentValue + 1} />}
            {currentValue + 2 <= maxValue && <PageButton value={currentValue + 2} />}
            {currentValue + 3 <= maxValue && <div className="text-2xl text-black">...</div>}
            <MoveButton Icon={MdOutlineKeyboardArrowRight} direction={1} />
            <MoveButton Icon={MdOutlineKeyboardDoubleArrowRight} direction={2} />
        </div>
    )
}

const ListSection = () => {
    const languageContext = useLanguage();

    return (
        <div className="w-full h-auto mb-10 flex flex-col justify-center items-center">
            <div className="w-[66vw] h-auto bg-white flex flex-col justify-start items-center gap-20">
                {Array.from({ length: 10 }, (_, i) => i + 1).map((_, i) => (
                    <div
                        key={`client_${i}`}
                        className="relative w-full h-[40vh] flex flex-row justify-center items-center gap-10"
                    >
                        {(i % 2 == 1) && <div className={`w-1/2 h-[80%] p-10 flex flex-col justify-start items-start gap-2
                            bg-gray-700`}>
                            <p className="w-full text-center text-3xl text-white">Client Name</p>
                            <p className="text-white text-2xl">
                                {languageContext?.language == "en" ? "Completed Projects:" : "Dự án hoàn thành:"}
                            </p>
                            {Array.from({ length: i % 3 + 1 }, (_, j) => j + 1).map((_, k) => (
                                <div
                                    className="w-full flex flex-row justify-start items-center gap-2 text-2xl group"
                                    key={`client_${i}_${k}`}
                                >
                                    <TbCircleDotted className="group-hover:scale-120 group-hover:rotate-45 duration-100" />
                                    <p>Project {k}</p>
                                </div>
                            ))}
                        </div>}
                        <div className="relative w-1/2 h-full bg-white flex flex-col justify-center items-center gap-2">
                            <Image
                                src={"/test/decor.png"}
                                className="w-full h-auto grayscale-100 scale-y-[-1]"
                                width={829}
                                height={71}
                                alt="Decorative Border"
                            />
                            <div className="w-full h-full p-10">
                                <Image
                                    src={"/GBA Logo.png"}
                                    width={2560}
                                    height={1040}
                                    alt="Client Logo"
                                    className="w-full h-full object-contain"
                                />
                            </div>
                            <Image
                                src={"/test/decor.png"}
                                className="w-full h-auto grayscale-100"
                                width={829}
                                height={71}
                                alt="Decorative Border"
                            />
                        </div>
                        {(i % 2 == 0) && <div className={`w-1/2 h-[80%] p-10 flex flex-col justify-start items-start gap-2
                            bg-red-500`}>
                            <p className="w-full text-center text-3xl text-white">Client Name</p>
                            <p className="text-white text-2xl">
                                {languageContext?.language == "en" ? "Completed Projects:" : "Dự án hoàn thành:"}
                            </p>
                            {Array.from({ length: i % 3 + 1 }, (_, j) => j + 1).map((_, k) => (
                                <div
                                    className="w-full flex flex-row justify-start items-center gap-2 text-2xl group"
                                    key={`client_${i}_${k}`}
                                >
                                    <TbCircleDotted className="group-hover:scale-120 group-hover:rotate-45 duration-100" />
                                    <p>Project {k}</p>
                                </div>
                            ))}
                        </div>}
                    </div>
                ))}
            </div>
        </div>
    )
}