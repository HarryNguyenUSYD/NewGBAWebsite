"use client";

import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import SiteWrapper from "@/global/SiteWrapper/SiteWrapperDesktop";
import Image from "next/image";
import { useLanguage } from "@/global/LanguageContext/LanguageContext";
import { FaArrowRightLong } from "react-icons/fa6";
import { FaFacebook, FaLinkedin, FaMapMarkedAlt, FaArrowDown } from "react-icons/fa";
import { IoMdCheckboxOutline } from "react-icons/io";
import { PiMapPin } from "react-icons/pi";
import { FiPhone } from "react-icons/fi";
import { HiOutlineMail } from "react-icons/hi";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import { useNavigationBar } from "@/global/NavigationBar/NavigationBarContext";
import Link from "next/link";
import { experienceFont, navFont, sloganFont, titleFont, zilliaxFont } from "@/global/fonts/fonts";
import { fetchArticles, fetchImageOrFile } from "@/backend/fetchFunctions";
import type { ArticlesTableType } from "@/backend/tables";
import { projects } from "./consts";


export default function Home() {
    return (
        <SiteWrapper topMargin={false} isHomepage={true}>
            <BannerSection />
            <AboutUsSection />
            <StatisticsSection />
            <ProjectsSection />
            <WhyUsSection />
            <ClientsSection />
            <BulletinSection />
            <ContactUsSection />
        </SiteWrapper>
    );
}

const BannerSection = () => {
    const [index, setIndex] = useState(0);

    return (
        <>
            <BannerBackground index={index} />
            <BannerForeground index={index} setIndex={setIndex} />
            <BannerScroll />
        </>
    )
}

const BannerScroll = () => {
    const languageContext = useLanguage();

    return (
        <div className="absolute bottom-0 mb-10 w-full h-auto flex justify-center items-center">
            <AnimatePresence mode="wait">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ translateY: ["0", "2vh", "0"], opacity: 0.75 }}
                    transition={{
                        translateY: { repeat: Infinity, repeatType: "loop", ease: "easeInOut", duration: 1 },
                        opacity: { duration: 2, ease: "linear", delay: 5 }
                    }}
                    className="flex flex-col justify-center items-center gap-2"
                >
                    <p className="text-4xl">
                        {languageContext?.language == "en" ? "Scroll down to see more" : "Lướt xuống để xem thêm"}
                    </p>
                    <div className="flex flex-row justify-center items-center gap-3 text-2xl">
                        <FaArrowDown />
                        <FaArrowDown />
                        <FaArrowDown />
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    )
}

const BannerBackground = ({ index } : { index: number }) => {
    const bgList = [
        "/backgrounds/bg-1.jpg",
        "/backgrounds/bg-2.jpg",
        "/backgrounds/bg-10.jpg",
    ]

    const bannerList = [
        <SloganBanner key={"slogan_banner"} />,
        <ExperienceBanner key={"experience_banner"} />,
        <ZilliaxBanner key={"zilliax_banner"} />
    ]

    const [opacity, setOpacity] = useState(1);
    const { scrollY } = useScroll();
    const navigationBarContext = useNavigationBar();

    useEffect(() => {
        navigationBarContext?.setVisible(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    scrollY.on("change", (newVal) => {
        if (newVal < window.innerHeight / 2) {
            navigationBarContext?.setVisible(false);
        } else {
            navigationBarContext?.setVisible(true);
        }

        setOpacity((window.innerHeight / 2 - newVal) / (window.innerHeight / 2));
    });

    return (
        <div className="fixed w-full h-screen -z-20 bg-black">
            <div className="w-full h-full flex flex-col justify-start items-center">
                <AnimatePresence mode="wait">
                    <motion.img
                        key={bgList[index]}               // change when index changes
                        src={bgList[index]}
                        alt="Banner Background"
                        className="w-full h-full object-cover brightness-50"
                        initial={{ opacity: 0 }}          // when it appears
                        animate={{ opacity: 1 }}          // visible
                        exit={{ opacity: 0 }}             // fade to black (bg)
                        transition={{ duration: 0.5 }}
                    />
                </AnimatePresence>
                <motion.div
                    className="fixed w-full h-full z-10 flex justify-center items-center"
                    animate={{ opacity: opacity }}
                    transition={{ type: false }}
                >
                    <AnimatePresence mode="wait">
                        {bannerList[index]}
                    </AnimatePresence>
                </motion.div>
            </div>
        </div>
    )
}

const SloganBanner = () => {
    const languageContext = useLanguage();

    return (
        <motion.div className="w-full h-full flex flex-col justify-center items-center gap-10">
            <motion.div
                key={"slogan_logo"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.75, type: "spring" }}
            >
                <Image
                    src="/GBA Logo.png"
                    width={2560}
                    height={1040}
                    alt="Company Logo"
                    className="w-auto h-20 drop-shadow-lg/75"
                />
            </motion.div>
            <div className={`${sloganFont.className} flex flex-col justify-center items-center text-shadow-sm gap-5`}>
                <motion.span
                    key={"slogan_1"}
                    className="text-[8rem] leading-none whitespace-nowrap drop-shadow-xl/50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.75, type: "spring", delay: 0.25 }}
                >
                    {languageContext?.language == "en" ? "Together" : "Cùng nhau"}
                </motion.span>
                <motion.span
                    key={"slogan_2"}
                    className="text-[5rem] leading-none whitespace-nowrap drop-shadow-xl/50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.75, type: "spring", delay: 0.5 }}
                >
                    {languageContext?.language == "en" ? "we build" : "xây dựng"}
                </motion.span>
                <motion.span
                    key={"slogan_3"}
                    className="text-[8rem] leading-none whitespace-nowrap drop-shadow-xl/50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.75, type: "spring", delay: 0.75 }}
                >
                    {languageContext?.language == "en" ? "The Best" : "đỉnh cao"}
                </motion.span>
            </div>
        </motion.div>
    )
}

const ExperienceBanner = () => {
    const languageContext = useLanguage();

    return (
        <motion.div className="w-full h-full flex flex-col justify-center items-center gap-5">
            <div className={`${experienceFont.className} flex flex-col justify-center items-center text-shadow-sm`}>
                <p>
                    <motion.span
                        key={"experience_number"}
                        className="text-[15rem] leading-none whitespace-nowrap drop-shadow-xl/50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.75, type: "spring" }}
                    >
                        {new Date().getFullYear() - 2007}
                    </motion.span>
                    <motion.span
                        key={"experience_text_1"}
                        className="text-7xl leading-none whitespace-nowrap drop-shadow-xl/50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.75, type: "spring", delay: 0.25 }}
                    >
                        {languageContext?.language == "en" ? "years of" : "năm"}
                    </motion.span>
                </p>
                <motion.p
                    key={"experience_text_2"}
                    className="text-7xl leading-none whitespace-nowrap drop-shadow-xl/50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.75, type: "spring", delay: 0.5 }}
                >
                    {languageContext?.language == "en" ? "interior design and build" : "thiết kế và thi công nội thất"}
                </motion.p>
            </div>
        </motion.div>
    )
}

const ZilliaxBanner = () => {
    const languageContext = useLanguage();

    return (
        <motion.div
            className={`${zilliaxFont.className} w-full h-full flex justify-center items-center text-shadow-sm`}
            variants={{
                enter: {
                    transition: {
                        when: "beforeChildren"
                    }
                },
                exit: {
                    transition: {
                        when: "afterChildren"
                    }
                }
            }}
        >
            <div className="absolute w-auto h-auto flex flex-col justify-center items-start gap-10">
                <div className="w-auto flex flex-row justify-start items-center gap-5">
                    <motion.div
                        key="zilliax_icon_1"
                        className="w-auto h-auto"
                        initial={{ opacity: 0, x: "-20vw" }}
                        animate={{ opacity: 1, x: "0%" }}
                        exit={{ opacity: 0, x: "-20vw" }}
                        transition={{ duration: 0.75, type: "spring" }}
                    >
                        <IoMdCheckboxOutline className="text-8xl" />
                    </motion.div>
                    <motion.p
                        key="zilliax_text_1"
                        className="text-[5rem] leading-none whitespace-nowrap"
                        initial={{ opacity: 0, x: "20vw" }}
                        animate={{ opacity: 1, x: "0%" }}
                        exit={{ opacity: 0, x: "20vw" }}
                        transition={{ duration: 0.75, type: "spring" }}
                    >
                        {languageContext?.language == "en" ? "Unity" : "Hợp Tác"}
                    </motion.p>
                </div>
                <div className="w-auto flex flex-row justify-start items-center gap-5">
                    <motion.div
                        key="zilliax_icon_2"
                        className="w-auto h-auto"
                        initial={{ opacity: 0, x: "-20vw" }}
                        animate={{ opacity: 1, x: "0%" }}
                        exit={{ opacity: 0, x: "-20vw" }}
                        transition={{ duration: 0.75, type: "spring", delay: 0.25 }}
                    >
                        <IoMdCheckboxOutline className="text-8xl" />
                    </motion.div>
                    <motion.p
                        key="zilliax_text_2"
                        className="text-[5rem] leading-none whitespace-nowrap"
                        initial={{ opacity: 0, x: "20vw" }}
                        animate={{ opacity: 1, x: "0%" }}
                        exit={{ opacity: 0, x: "20vw" }}
                        transition={{ duration: 0.75, type: "spring", delay: 0.25 }}
                    >
                        {languageContext?.language == "en" ? "Precision" : "Chính Xác"}
                    </motion.p>
                </div>
                <div className="w-auto flex flex-row justify-start items-center gap-5">
                    <motion.div
                        key="zilliax_icon_3"
                        className="w-auto h-auto"
                        initial={{ opacity: 0, x: "-20vw" }}
                        animate={{ opacity: 1, x: "0%" }}
                        exit={{ opacity: 0, x: "-20vw" }}
                        transition={{ duration: 0.75, type: "spring", delay: 0.5 }}
                    >
                        <IoMdCheckboxOutline className="text-8xl" />
                    </motion.div>
                    <motion.p
                        key="zilliax_text_2"
                        className="text-[5rem] leading-none whitespace-nowrap"
                        initial={{ opacity: 0, x: "20vw" }}
                        animate={{ opacity: 1, x: "0%" }}
                        exit={{ opacity: 0, x: "20vw" }}
                        transition={{ duration: 0.75, type: "spring", delay: 0.5 }}
                    >
                        {languageContext?.language == "en" ? "Perfection" : "Hoàn Hảo"}
                    </motion.p>
                </div>
            </div>
        </motion.div>
    )
}

const BannerForeground = ({ index, setIndex } : { index: number, setIndex: Dispatch<SetStateAction<number>> }) => {
    return (
        <motion.div
            className="relative w-full h-screen"
        >
            <div
                className="absolute w-full h-full bg-transparent cursor-pointer"
                onClick={() => setIndex((index + 1) % 3)}
            ></div>
        </motion.div>
    )
}

const AboutUsSection = () => {
    const languageContext = useLanguage();

    return (
        <motion.div
            id="about-us"
            className="w-full h-[80vh] px-40 py-10 bg-white flex flex-row justify-between items-center"
            initial="initial"
            whileInView="inView"
            viewport={{ amount: 0.25 }}
        >
            <motion.div
                className={"relative w-[75%] mr-10 h-full flex flex-col justify-center items-start gap-10 group overflow-hidden"}
                variants={{
                    initial: { translateX: "-20rem", opacity: 0 },
                    inView: { translateX: "0", opacity: 1 }
                }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
            >
                <Image
                    src={"/backgrounds/bg-3.jpg"}
                    alt="Project Background"
                    width={1920}
                    height={1080}
                    className="absolute w-auto h-full object-cover brightness-30 shadow-lg/50 group-hover:scale-120 duration-200"
                />
                <p className={`w-full px-20 text-5xl text-white z-10 ${titleFont.className}`}>
                    { languageContext?.language == "en" ? "About us" : "Về chúng tôi" }
                </p>
                <p className="w-full px-20 text-4xl text-white z-10">
                {
                    languageContext?.language == "en" ?
                    "Established in 2007, Global Brother Associates (GBA) is one of Vietnam's top design company focusing in Architecture, Interior Decoration, Construction, MEP works and Furniture Supply to Turnkey Projects."
                    :
                    "Thành lập năm 2007, Global Brother Associates (GBA) là một trong những công ty thiết kế hàng đầu tại Việt Nam, chuyên về kiến trúc, trang trí nội thất, xây dựng, hệ thống cơ điện (MEP) và cung cấp nội thất cho các dự án trọn gói."
                }
                </p>
            </motion.div>
            <div className="h-[80%] border-2 border-red-500"></div>
            <motion.div
                className="w-[25%] ml-10 h-full flex flex-col justify-center items-center gap-10"
                variants={{
                    initial: { translateX: "20rem", opacity: 0 },
                    inView: { translateX: "0", opacity: 1 }
                }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
            >
                <Link
                    className="w-full h-auto p-10 bg-gray-700 text-white flex flex-col justify-center items-start gap-5
                        hover:bg-black duration-200 cursor-pointer shadow-lg/50"
                    target="_blank"
                    href={fetchImageOrFile("gba-profile.pdf")}
                >
                    <p className="text-4xl text-left font-semibold">{languageContext?.language == "en" ? "View our Company Profile" : "Hồ Sơ Năng Lực"}</p>
                    <FaArrowRightLong className="text-4xl" />
                </Link>
                <Link
                    className="w-full h-auto p-10 bg-red-500 text-white flex flex-col justify-center items-start gap-5
                        hover:bg-black duration-200 cursor-pointer shadow-lg/50"
                    target="_blank"
                    href={fetchImageOrFile("iso.pdf")}
                >
                    <p className="text-4xl text-left font-semibold">{languageContext?.language == "en" ? "See our ISO Certifications" : "Chứng chỉ ISO"}</p>
                    <FaArrowRightLong className="text-4xl" />
                </Link>
            </motion.div>
        </motion.div>
    )
}

const StatisticsFactoid = ({ value, desc, delay }: { value: string, desc: string, delay: number }) => {
    return (
        <motion.div
            initial="initial"
            whileHover="hover"
            variants={{
                initial: { translateY: "10rem", opacity: 0, transition: { delay: 0 } }
            }}
            whileInView={{ translateY: "0", opacity: 1 }}
            className="relative w-1/5 aspect-2 bg-gray-700 p-5 pl-12 flex flex-col
                justify-center items-start overflow-hidden shadow-lg/50"
            viewport={{ amount: 0.25 }}
            transition={{ duration: 0.5, ease: "easeInOut", delay: delay }}
        >
            <motion.div
                className="absolute inset-0 bg-red-500"
                variants={{
                    initial: { x: "calc(-100% + 1rem)" },   // start off-screen
                    hover: { x: "0%" }      // slide fully in
                }}
                transition={{ duration: 0.2 }}
            >
            </motion.div>
            <p className="text-7xl z-10">{value}</p>
            <p className="text-3xl z-10">{desc}</p>
        </motion.div>
    )
}

const StatisticsSection = () => {
    const languageContext = useLanguage();

    return (
        <div
            id={"statistics"}
            className="w-full h-auto px-40 py-10 bg-white flex flex-row justify-between items-center"
        >
            <StatisticsFactoid
                value={`${new Date().getFullYear() - 2007}+`}
                desc={languageContext?.language == "en" ? "years of experience" : "năm kinh nghiệm"}
                delay={0}
            />
            <StatisticsFactoid
                value="999+"
                desc={languageContext?.language == "en" ? "projects" : "dự án"}
                delay={0.2}
            />
            <StatisticsFactoid
                value="190+"
                desc={languageContext?.language == "en" ? "customers" : "khách hàng"}
                delay={0.4}
            />
            <StatisticsFactoid
                value="100+"
                desc={languageContext?.language == "en" ? "employees" : "nhân viên"}
                delay={0.6}
            />
        </div>
    )
}

const ProjectsSection = () => {
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
            setTimerWidth((timer / INTERVAL) * window.innerWidth)
            if (timer == 0) {
                setIndex(v => (v + 1) % projects.length);
            }
        }, TIMER_INTERVAL);

        return () => clearInterval(interval);
    }, [timer]);

    return (
        <motion.div
            ref={ref}
            id="projects"
            className={`relative w-full h-[calc(100vh-var(--navbar-height))] bg-black`}
        >
            <motion.img
                src={projects[index].src}
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
                    {projects.slice(0, 3).map((_, i) => (
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
                    {projects.slice(3, projects.length).map((_, i) => (
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
            {/* Bottom Right URL */}
            <div className="absolute w-auto h-auto bottom-0 right-0 mb-10 mr-10">
                <Link
                    href={"/projects"}
                    className="px-5 border-2 border-white bg-transparent
                    hover:bg-white hover:text-black duration-150 text-4xl"
                >
                    {languageContext?.language == "en" ? "See More" : "Xem thêm"}
                </Link>
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
                        <p className={`text-6xl text-shadow-lg ${titleFont.className}`}>{projects[index].name}</p>
                        <div className="w-auto flex flex-row justify-start items-end gap-20">
                            <p className="text-5xl text-shadow-lg">
                                {languageContext?.language == "en" ? projects[index].typeEn : projects[index].typeVi}
                            </p>
                            <Link
                                href={projects[index].url}
                                className="text-2xl text-shadow-lg mb-0.5 underline underline-offset-4"
                            >
                                {languageContext?.language == "en" ? "View details" : "Xem chi tiết"}
                            </Link>
                        </div>
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
    )
}

const WhyUsFactoid = ({ title, desc, bg }: {
    title: string,
    desc: string,
    bg: string
}) => {
    return (
        <motion.div
            className="relative w-[25%] h-full bg-[#000000] flex flex-col
            justify-center items-center text-center overflow-hidden shadow-lg/50
            group group-hover:opacity-30 hover:w-[50%] hover:opacity-100! duration-150"
        >
            <div className="absolute w-full h-full overflow-hidden">
                <Image
                    src={bg}
                    alt="Factoid Background"
                    width={1920}
                    height={1080}
                    className="absolute w-full h-full object-cover brightness-30 group-hover:scale-120 duration-150"
                />
            </div>
            <p className={`p-5 text-4xl z-10 ${titleFont.className}`}>{title}</p>
            <div className="w-[80%] border border-white opacity-80"></div>
            <p className="p-5 text-3xl z-10 text-center">{desc}</p>
        </motion.div>
    )
}

const WhyUsSection = () => {
    const languageContext = useLanguage();

    return (
        <div
            id="why-us"
            className="w-full h-[80vh] px-30 py-10 bg-white"
        >
            <div className="w-auto h-full flex flex-row justify-center items-center gap-10 group">
                <WhyUsFactoid
                    title={languageContext?.language == "en" ? "Services" : "Dịch Vụ"}
                    desc={languageContext?.language == "en" ?
                        "One of Vietnam's leading companies in interior design and build." :
                        "Một trong những công ty thiết kế và thi công nội thất hàng đầu tại Việt Nam."
                    }
                    bg="/backgrounds/bg-4.jpg"
                />
                <WhyUsFactoid
                    title={languageContext?.language == "en" ? "Prices" : "Giá Cả"}
                    desc={languageContext?.language == "en" ?
                        "We offer a reasonable price for the best services." :
                        "Giá cả phải chăng cho dịch vụ tốt nhất."
                    }
                    bg="/backgrounds/bg-5.jpg"
                />
                <WhyUsFactoid
                    title={languageContext?.language == "en" ? "Professional" : "Chuyên Nghiệp"}
                    desc={languageContext?.language == "en" ?
                        "An experienced, creative, and enthusiastic team ready to support." :
                        "Đội ngũ giàu kinh nghiệm, sáng tạo và đam mê luôn sẵn sàng hỗ trợ."
                    }
                    bg="/backgrounds/bg-6.jpg"
                />
                <WhyUsFactoid
                    title={languageContext?.language == "en" ? "Factory" : "Sản Xuất"}
                    desc={languageContext?.language == "en" ?
                        "Massive and customizable production for your designs." :
                        "Nhà máy quy mô lớn có thể tuỳ chỉnh cho mọi thiết kế của bạn."
                    }
                    bg="/backgrounds/bg-7.jpg"
                />
            </div>
        </div>
    )
}

const ClientsSection = () => {
    const languageContext = useLanguage();
    const clientList = [
        "/backgrounds/client-1.png",
        "/backgrounds/client-2.png",
        "/backgrounds/client-3.png",
        "/backgrounds/client-4.png",
        "/backgrounds/client-5.jpg",
        "/backgrounds/client-6.png",
        "/backgrounds/client-7.png",
        "/backgrounds/client-8.png",
        "/backgrounds/client-9.png",
    ]

    return (
        <div 
            id="clients"
            className="relative w-full h-[40vh] flex flex-row justify-between items-center overflow-hidden"
        >
            <Image
                src={"/backgrounds/bg-8.jpg"}
                alt="Project Background"
                width={1920}
                height={1080}
                className="absolute w-full h-full object-cover brightness-30 shadow-lg/50"
            />
            <div className="relative w-full h-full flex flex-row justify-between items-center">
                <div className="w-[30%] h-full flex flex-col justify-center items-center gap-10">
                    <p className={`text-5xl text-center ${titleFont.className}`}>{languageContext?.language == "en" ? "Our clients" : "Khách hàng thân thiết"}</p>
                    <Link
                        className="text-3xl border-2 px-5 border-white hover:bg-white hover:text-black duration-150"
                        href="/"
                    >
                        {languageContext?.language == "en" ? "See more" : "Xem thêm"}
                    </Link>
                </div>
                <div className="h-[80%] border-2 border-red-500"></div>
                <motion.div
                    className="w-full h-full flex flex-row justify-between items-center overflow-hidden"
                >
                    {[...clientList, ...clientList].map((client, i) => (
                        <motion.div
                            className="relative w-[33.3%] h-full flex justify-start items-center flex-none"
                            key={"client_" + i}
                            animate={{ x: ["0%", "-900%"] }}
                            transition={{
                                x: { repeat: Infinity, repeatType: "loop", duration: 25, ease: "linear" },
                            }}
                        >
                            <Image
                                src={client}
                                alt="Project Background"
                                width={1920}
                                height={1080}
                                className="absolute w-full h-full object-contain p-10"
                            />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    )
}

const BulletinSection = () => {
    const languageContext = useLanguage();

    const [articles, setArticles] = useState<ArticlesTableType | null>(null);

    useEffect(() => {
        fetchArticles()
            .then(setArticles)
            .catch(console.error)
    }, []);

    return (
        <motion.div
            id="bulletin"
            className="relative w-full h-screen bg-white px-40 py-10 flex flex-row justify-between items-center"
            initial="initial"
            whileInView="inView"
            viewport={{ amount: 0.25 }}
        >
            {/* Newest Article */}
            <motion.div
                className="w-[50%] h-full mr-10 flex flex-col justify-between items-center"
                variants={{
                    initial: { translateX: "-20rem", opacity: 0 },
                    inView: { translateX: "0", opacity: 1 }
                }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
            >
                <div className="w-full h-auto flex flex-row justify-between items-end">
                    <p className={`text-5xl text-gray-800 ${titleFont.className}`}>
                        {languageContext?.language == "en" ? "Bulletin" : "Bảng tin"}
                    </p>
                    <Link
                        className="text-3xl border-2 px-5 text-gray-800 border-gray-800 whitespace-nowrap
                        hover:bg-gray-800 hover:text-white duration-150"
                        href="/articles"                    
                    >
                        {languageContext?.language == "en" ? "See more" : "Xem thêm"}
                    </Link>
                </div>
                <div className="w-full border-2 my-5 border-red-500"></div>
                <div className="w-full h-full flex flex-row justify-around items-center">
                    <div className="w-full h-full">
                        <iframe
                            src={articles?.iframes[0].src}
                            width={articles?.iframes[0].width}
                            height={articles?.iframes[0].height}
                            title="LinkedIn Post"
                            className="w-full h-full"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            </motion.div>
            <motion.div
                className="relative w-[50%] h-full ml-10 flex flex-col justify-between items-center"
                variants={{
                    initial: { translateX: "20rem", opacity: 0 },
                    inView: { translateX: "0", opacity: 1 }
                }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
            >
                {/* Newest Project */}
                <div className="relative w-full h-[55%]">
                    <Link
                        href={articles?.newestProject.url ?? "/"}
                        target="_blank"
                        className="w-full h-full group"
                    >
                        <div className="absolute z-10 top-5 left-5 flex flex-row justify-start items-center gap-5">
                            <div className="h-10 border-4 border-red-500"></div>
                            <p className={`text-4xl ${titleFont.className}`}>
                                {languageContext?.language == "en" ? "Newest Project" : "Dự án mới nhất"}
                            </p>
                        </div>
                        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
                            <Image
                                src={fetchImageOrFile("Blogs/newest-project.jpg")}
                                width={1080}
                                height={1080}
                                className="w-full h-full object-cover brightness-30 shadow-lg/50
                                    group-hover:scale-120 duration-150"
                                alt="Newest Project Background"
                            />
                        </div>
                        <p className="absolute bottom-5 left-5 z-10 text-4xl">{articles?.newestProject.title}</p>
                    </Link>
                </div>
                {/* Compliments */}
                <div className="relative w-full h-[35%] flex flex-row justify-between items-center">
                    <Link
                        href={articles?.newestAward.url ?? "/"}
                        target="_blank"
                        className="relative w-[45%] h-full bg-gray-700 shadow-lg/50 hover:bg-black duration-200 cursor-pointer group"
                    >
                        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
                            <Image
                                src={fetchImageOrFile("Blogs/newest-award.jpg")}
                                width={1080}
                                height={1080}
                                alt="Company Award"
                                className="w-full h-full object-cover brightness-30 shadow-lg/50
                                    group-hover:scale-120 duration-150"
                            />
                        </div>
                        <div className="absolute top-5 left-5 flex flex-row justify-start items-center gap-3">
                            <div className="h-8 border-4 border-red-500"></div>
                            <p className={`text-4xl text-left font-semibold`}>
                                {languageContext?.language == "en" ? "Recognition" : "Khen thưởng"}
                            </p>
                        </div>
                        <p className="absolute bottom-5 left-5 text-4xl">{articles?.newestAward.title}</p>
                    </Link>
                    <Link
                        href={articles?.newestEvent.url ?? "/"}
                        target="_blank"
                        className="relative w-[45%] h-full bg-red-500 shadow-lg/50 hover:bg-black duration-200 cursor-pointer group"
                    >
                        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
                            <Image
                                src={fetchImageOrFile("Blogs/newest-event.jpg")}
                                width={1080}
                                height={1080}
                                alt="company Event"
                                className="w-full h-full object-cover brightness-30 shadow-lg/50
                                    group-hover:scale-120 duration-150"
                            />
                        </div>
                        <div className="absolute top-5 left-5 flex flex-row justify-start items-center gap-3">
                            <div className="h-8 border-4 border-red-500"></div>
                            <p className={`text-4xl text-left font-semibold`}>
                                {languageContext?.language == "en" ? "Events" : "Sự kiện"}
                            </p>
                        </div>
                        <p className="absolute bottom-5 left-5 text-4xl">{articles?.newestEvent.title}</p>
                    </Link>
                </div>
            </motion.div>
        </motion.div>
    )
}

const ContactUsSection = () => {
    const languageContext = useLanguage();

    return (
        <div
            id="contact-us"
            className="relative w-full h-[40vh] flex flex-row justify-between items-center overflow-hidden"
        >
            <Image
                src={"/backgrounds/bg-9.jpg"}
                alt="Project Background"
                width={1920}
                height={1080}
                className="absolute w-full h-full object-cover brightness-30 shadow-lg/50"
            />
            <div className="relative w-full h-full flex flex-row justify-between items-center">
                <p className={`text-5xl w-[20%] text-center leading-15 ${titleFont.className}`}>
                    {languageContext?.language == "en" ? "Get In Touch" : "Liên Hệ Chúng Tôi"}
                </p>
                <div className="w-0 h-[80%] mx-10 border-2 border-red-500"></div>
                <div className="w-[50%] h-full flex flex-col justify-center items-start gap-5">
                    <p className="text-5xl">{languageContext?.language == "en" ? "Head Office" : "Văn phòng chính"}</p>
                    <div className="text-3xl flex flex-row justify-start items-center gap-3">
                        <PiMapPin className="flex-none" />
                        <p>
                            {languageContext?.language == "en" ? "88 Thich Quang Duc, Duc Nhuan Ward, HCMC" :
                                "88 Thích Quảng Đức, Phường Đức Nhuận, Thành phố Hồ Chí Minh"}
                        </p>
                    </div>
                    <div className="text-3xl flex flex-row justify-start items-center gap-3">
                        <HiOutlineMail className="flex-none" />
                        <p>
                            sales@gba.vn
                        </p>
                    </div>
                    <div className="text-3xl flex flex-row justify-start items-center gap-3">
                        <FiPhone className="flex-none" />
                        <p>
                            +84 28 3535 5966 - +84 28 3535 5988
                        </p>
                    </div>
                </div>
                <div className="w-[25%] h-full flex flex-col justify-center items-center gap-5">
                    <p className="text-5xl">{languageContext?.language == "en" ? "Follow us" : "Theo dõi chúng tôi"}</p>
                    <div className="w-full h-auto flex flex-row justify-center items-center gap-5">
                        <Link
                            href="https://www.facebook.com/gbavn"
                            target="_blank"
                            className="text-4xl hover:text-red-500 duration-150"
                        >
                            <FaFacebook />
                        </Link>
                        <Link
                            href="https://www.linkedin.com/in/global-brother-associates-co-ltd-design-and-build-435446339/"
                            target="_blank"
                            className="text-4xl hover:text-red-500 duration-150"
                        >
                            <FaLinkedin />
                        </Link>
                        <Link
                            href="https://maps.app.goo.gl/WQ2P8WYXbQtsznZc6"
                            target="_blank"
                            className="text-4xl hover:text-red-500 duration-150"
                        >
                            <FaMapMarkedAlt />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}