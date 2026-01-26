"use client";

import { navFont, titleFont } from "@/global/fonts/fonts";
import { useLanguage } from "@/global/LanguageContext/LanguageContext";
import SiteWrapper from "@/global/SiteWrapper/SiteWrapperDesktop";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { boardOfDirectorsImages, factoryImages, holidayImages } from "./consts";

export default function Resources() {

    return (
        <SiteWrapper topMargin={true}>
            <TitleSection />
            <FactorySection />
            <ManagementSection />
            <HolidaySection />
        </SiteWrapper>
    );
}

const TitleSection = () => {
    const languageContext = useLanguage();

    return (
        <div className="relative w-full h-[60vh]">
            <Image
                src={"/backgrounds/bg-10.jpg"}
                alt="Title background"
                width={1620}
                height={1080}
                className="absolute w-full h-full object-cover brightness-30"
            />
            <div className="absolute w-[60%] h-auto bottom-0 right-0 m-20 flex flex-col justify-end items-end gap-10 text-right">
                <p className={`text-8xl ${titleFont.className}`}>
                    {languageContext?.language == "en" ? "Resources" : "Nguồn lực"}
                </p>
                <p className="text-4xl">
                    {languageContext?.language == "en" ? "The strength to realise your vision" : "Sức mạnh để hiện thực hoá tầm nhìn của bạn"}
                </p>
            </div>
        </div>
    )
}

const FactorySection = () => {
    const languageContext = useLanguage();
    
    const INTERVAL = 10000;
    const TIMER_INTERVAL = 50;

    const [index, setIndex] = useState(0);
    const [timer, setTimer] = useState(INTERVAL);
    const [timerWidth, setTimerWidth] = useState(0);
    const ref = useRef(null);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimer((prev) => ((prev + TIMER_INTERVAL) % INTERVAL));
            setTimerWidth((timer / INTERVAL) * (window.innerWidth - 240))
            if (timer == 0) {
                setIndex(v => (v + 1) % factoryImages.length);
            }
        }, TIMER_INTERVAL);

        return () => clearInterval(interval);
    }, [timer]);

    return (
        <div className="flex justify-center items-center p-30">
            <motion.div
                ref={ref}
                id="projects"
                className={`relative w-full h-[calc(100vh-var(--navbar-height))] bg-black`}
            >
                <motion.img
                    src={factoryImages[index].src}
                    alt="Factoid Background"
                    width={612}
                    height={344}
                    key={`project_image_${index}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 2 }}
                    className="w-full h-full object-cover brightness-80"
                />
                {/* Top Right Corner Navigator */}
                <div className="absolute w-auto h-auto top-0 right-0 mt-10 mr-10 flex flex-col justify-start items-end">
                    <div className="w-auto h-auto flex flex-row justify-start items-end">
                        {factoryImages.slice(0, 3).map((_, i) => (
                            <button
                                className={`size-20 m-2 border-4 flex justify-center items-center
                                ${index == i ? "bg-red-500" : "bg-transparent"} border-red-500 text-white
                                hover:bg-red-500 duration-150 cursor-pointer`}
                                key={`project_top_${i}`}
                                onClick={() => {
                                    setTimer(INTERVAL);
                                    setIndex(i);
                                }}
                            >
                                <p className={`text-4xl ${navFont.className}`}>{`0${i + 1}`}</p>
                            </button>
                        ))}
                    </div>
                    <div className="w-auto h-auto flex flex-row justify-start items-end">
                        {factoryImages.slice(3, factoryImages.length).map((_, i) => (
                            <button
                                className={`size-20 m-2 border-4 flex justify-center items-center
                                ${index == i + 3 ? "bg-red-500" : "bg-transparent"} border-red-500 text-white
                                hover:bg-red-500 duration-150 cursor-pointer`}
                                key={`project_top_${i + 3}`}
                                onClick={() => {
                                    setTimer(INTERVAL);
                                    setIndex(i + 3);
                                }}
                            >
                                <p className={`text-4xl ${navFont.className}`}>{`0${i + 4}`}</p>
                            </button>
                        ))}
                    </div>
                </div>
                {/* Bottom Left Information */}
                <div className="absolute w-auto h-auto bottom-0 left-0 mb-10 ml-10">
                    <AnimatePresence mode="wait">
                        <motion.div
                            className="flex flex-col justify-start items-start gap-5"
                            key={`project_info_${index}`}
                            initial={{ x: -40, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -40, opacity: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <p className={`w-[33vw] text-6xl text-shadow-lg`}>
                                {languageContext?.language == "en" ? factoryImages[index].textEn : factoryImages[index].textVi}
                            </p>
                        </motion.div>
                    </AnimatePresence>
                </div>
                {/* Timer */}
                <div className="absolute bottom-0 h-2 w-full bg-black">
                    <motion.div
                        className="h-full flex-none bg-red-500"
                        animate={{ width: timerWidth }}
                    ></motion.div>
                </div>
            </motion.div>
        </div>
    )
}

const ManagementSection = () => {
    const INTERVAL = 5000;
    const TIMER_INTERVAL = 50;

    const languageContext = useLanguage();
    const [index, setIndex] = useState(0);
    const [timer, setTimer] = useState(INTERVAL);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimer((prev) => ((prev + TIMER_INTERVAL) % INTERVAL));
            if (timer == 0) {
                setIndex(v => (v + 1) % boardOfDirectorsImages.length);
            }
        }, TIMER_INTERVAL);

        return () => clearInterval(interval);
    }, [timer]);

    return (
        <div className="w-full h-auto flex flex-col justify-center items-center gap-10 mt-10 mb-20">
            <p className={`${titleFont.className} text-6xl text-black`}>
                {languageContext?.language == "en" ? "Our Management Team" : "Đội Ngũ Quản Lý"}
            </p>
            <div className="w-full h-auto overflow-hidden">
                <motion.div
                    className="w-auto h-[25vw] flex flex-row justify-start items-center gap-[10vw]"
                    style={{ x: `${50 - 10.5}vw` }}
                    animate={{ translateX: `-${index * (15 + 10)}vw` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                >
                    {boardOfDirectorsImages.map((director, i) => (
                        <motion.button
                            key={`director_${i}`}
                            className="group flex-none cursor-pointer drop-shadow-lg/50 duration-100 hover:drop-shadow-xl/100"
                            onClick={() => {
                                setIndex(i);
                                setTimer(INTERVAL);
                            }}
                            animate={{ width: (i === index) ? "20vw" : "15vw" }}
                            transition={{ duration: 0.5, ease: "backInOut" }}
                        >
                            <motion.img
                                src={director.src}
                                width={500}
                                height={500}
                                alt={`${director.name}'s Photograph`}
                                className="w-full h-full object-cover rounded-full border-red-500 border-8 duration-100"
                            />
                        </motion.button>
                    ))}
                </motion.div>
            </div>
            <AnimatePresence mode="wait">
                <motion.div
                    className="w-auto flex flex-col justify-center items-center gap-2"
                    key={`director_info_${index}`}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 20, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <p className="text-5xl text-gray-700 font-bold">
                        {boardOfDirectorsImages[index].name}
                    </p>
                    <p className="text-3xl text-gray-500">
                        {boardOfDirectorsImages[index].position}
                    </p>
                </motion.div>
            </AnimatePresence>
        </div>
    )
}

const HolidaySection = () => {
    const languageContext = useLanguage();

    return (
        <div className="w-full h-auto flex flex-col justify-center items-center gap-20 my-10">
            <p className={`${titleFont.className} text-6xl text-black`}>
                {languageContext?.language == "en" ? "Holiday with GBA" : "Vui chơi cùng GBA"}
            </p>
            <div className="w-full h-auto flex flex-col justify-start items-center gap-20">
                {holidayImages.map((image, i) => (
                    <div
                        key={`holiday_image_${i}`}
                        className="w-[50vw] h-auto p-10 border-4 border-black bg-white flex flex-col
                            justify-center items-center gap-5 rotate-3 drop-shadow-xl/50"
                    >
                        <Image
                            src={image.src}
                            width={1920}
                            height={1080}
                            alt="Project Image"
                            className="w-full h-auto object-fill border-2 border-black"
                        />
                        <p className="text-4xl italic text-black">
                            {languageContext?.language == "en" ? image.labelEn : image.labelVn}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}