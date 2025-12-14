"use client";

import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import SiteWrapper from "@/global/SiteWrapper/SiteWrapperMobile";
import Image from "next/image";
import { useLanguage } from "@/global/LanguageContext/LanguageContext";
import { FaArrowRightLong } from "react-icons/fa6";
import { FaFacebook, FaLinkedin, FaMapMarkedAlt } from "react-icons/fa";
import { IoMdCheckboxOutline } from "react-icons/io";
import { PiMapPin } from "react-icons/pi";
import { FiPhone } from "react-icons/fi";
import { HiOutlineMail } from "react-icons/hi";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import { useNavigationBar } from "@/global/NavigationBar/NavigationBarContext";
import Link from "next/link";
import { experienceFont, navFont, titleFont, zilliaxFont } from "@/global/fonts/fonts";
import { fetchArticles, fetchImageOrFile } from "@/backend/fetchFunctions";
import type { ArticlesType } from "@/backend/tables";


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
        </>
    )
}

const BannerBackground = ({ index } : { index: number }) => {
    const bgList = [
        "/test/testbg.png",
        "/test/diningbg.png"
    ]

    const bannerList = [
        <ExperienceBanner key={"experience_banner"} />,
        <ZilliaxBanner key={"zilliax_banner"} />
    ]

    const [height, setHeight] = useState(-1);
    const [opacity, setOpacity] = useState(1);
    const { scrollY } = useScroll();
    const navigationBarContext = useNavigationBar();

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setHeight(window.innerHeight);
    }, []);

    useEffect(() => {
        const onScroll = () => {
            if (height < 0) {
                setHeight(window.innerHeight);
            }

            setHeight(Math.max(window.innerHeight - scrollY.get(), 0));

            if (height > window.innerHeight / 2) {
                navigationBarContext?.setVisible(false);
            } else {
                navigationBarContext?.setVisible(true);
            }

            setOpacity((height - window.innerHeight / 4) / (window.innerHeight / 2));

            console.log(navigationBarContext?.visible);
        }

        window.addEventListener("scroll", onScroll);

        return () => {
            window.removeEventListener("scroll", onScroll);
        }
    }, [height, navigationBarContext, scrollY]);

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
                    className="absolute w-full z-10 flex justify-center items-center"
                    animate={{ height: height, opacity: opacity }}
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

const ExperienceBanner = () => {
    const languageContext = useLanguage();

    return (
        <motion.div className="w-full h-full flex flex-col justify-center items-center gap-5">
            <motion.img
                key="experience_decor_1"  
                src={"/test/decor.png"}
                className="w-[80%] h-auto grayscale-100 brightness-200 scale-y-[-1] -mb-5"
                initial={{ opacity: 0, y: "20vh" }}
                animate={{ opacity: 1, y: "0%" }}
                exit={{ opacity: 0, y: "20vh" }}
                transition={{ duration: 0.75, type: "spring", delay: 0.75 }}
            />
            <div className={`${experienceFont.className} flex flex-col justify-center items-start text-shadow-sm`}>
                <p>
                    <motion.span
                        key={"experience_number"}
                        className="text-[8rem] leading-none whitespace-nowrap"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.75, type: "spring" }}
                    >
                        {new Date().getFullYear() - 2007}
                    </motion.span>
                    <motion.span
                        key={"experience_text_1"}
                        className="text-3xl leading-none whitespace-nowrap"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.75, type: "spring", delay: 0.25 }}
                    >
                        {languageContext?.language == "en" ? "years" : "năm"}
                    </motion.span>
                </p>
                <motion.p
                    key={"experience_text_2"}
                    className="text-3xl leading-none whitespace-nowrap"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.75, type: "spring", delay: 0.5 }}
                >
                        {languageContext?.language == "en" ? "of vast experience" : "kinh nghiệm dồi dào"}
                </motion.p>
            </div>
            <motion.img
                key="experience_decor_2"  
                src={"/test/decor.png"}
                className="w-[80%] h-auto grayscale-100 brightness-200"   
                initial={{ opacity: 0, y: "20vh" }}
                animate={{ opacity: 1, y: "0%" }}
                exit={{ opacity: 0, y: "20vh" }}
                transition={{ duration: 0.75, type: "spring", delay: 0.75 }}
            />
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
            <div className="absolute w-auto h-auto flex flex-col justify-center items-start gap-5">
                <div className="w-auto flex flex-row justify-start items-center gap-5">
                    <motion.div
                        key="zilliax_icon_1"
                        className="w-auto h-auto"
                        initial={{ opacity: 0, x: "-20vw" }}
                        animate={{ opacity: 1, x: "0%" }}
                        exit={{ opacity: 0, x: "-20vw" }}
                        transition={{ duration: 0.75, type: "spring" }}
                    >
                        <IoMdCheckboxOutline className="text-6xl" />
                    </motion.div>
                    <motion.p
                        key="zilliax_text_1"
                        className="text-[2rem] leading-none whitespace-nowrap"
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
                        <IoMdCheckboxOutline className="text-6xl" />
                    </motion.div>
                    <motion.p
                        key="zilliax_text_2"
                        className="text-[2rem] leading-none whitespace-nowrap"
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
                        <IoMdCheckboxOutline className="text-6xl" />
                    </motion.div>
                    <motion.p
                        key="zilliax_text_2"
                        className="text-[2rem] leading-none whitespace-nowrap"
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
                onClick={() => setIndex((index + 1) % 2)}
            ></div>
        </motion.div>
    )
}

const AboutUsSection = () => {
    const languageContext = useLanguage();

    return (
        <div
            id="about-us"
            className="relative w-full h-[120vh] px-5 py-10 bg-white flex flex-col justify-between items-center"
        >
            <div
                className={"relative w-full h-[60%] mb-10 flex flex-col justify-center items-start gap-5 text-center"}
            >
                <Image
                    src={"/test/diningbg.png"}
                    alt="Project Background"
                    width={4492}
                    height={2995}
                    className="absolute w-full h-full object-cover brightness-30 shadow-lg/50"
                />
                <p className={`w-full text-2xl px-5 text-white z-10 ${titleFont.className}`}>
                    { languageContext?.language == "en" ? "About us" : "Về chúng tôi" }
                </p>
                <p className="w-full text-xl px-5 text-white z-10">
                {
                    languageContext?.language == "en" ?
                    "Established in 2007, Global Brother Associates (GBA) is one of Vietnam's top design company focusing in Architecture, Interior Decoration, Construction, MEP works and Furniture Supply to Turnkey Projects."
                    :
                    "Established in 2007, Global Brother Associates (GBA) is one of Vietnam's top design company focusing in Architecture, Interior Decoration, Construction, MEP works and Furniture Supply to Turnkey Projects."
                }
                </p>
            </div>
            <div className="w-[80%] border-2 border-red-500"></div>
            <div className="w-full mt-10 h-auto flex flex-col justify-center items-center gap-5">
                <Link
                    className="w-full h-auto p-10 bg-gray-700 text-white flex flex-col justify-center items-center gap-2
                        hover:bg-black duration-200 cursor-pointer shadow-lg/50"
                    target="_blank"
                    href={fetchImageOrFile("gba-profile.pdf")}
                >
                    <p className="text-2xl text-left font-semibold">{languageContext?.language == "en" ? "Download our Company Profile" : "Hồ Sơ Năng Lực"}</p>
                    <FaArrowRightLong className="text-2xl" />
                </Link>
                <Link
                    className="w-full h-auto p-10 bg-red-500 text-white flex flex-col justify-center items-center gap-2
                        hover:bg-black duration-200 cursor-pointer shadow-lg/50"
                    target="_blank"
                    href={fetchImageOrFile("gba-profile.pdf")}
                >
                    <p className="text-2xl text-left font-semibold">{languageContext?.language == "en" ? "See our ISO Certifications" : "Chứng chỉ ISO"}</p>
                    <FaArrowRightLong className="text-2xl" />
                </Link>
            </div>
        </div>
    )
}

const StatisticsFactoid = ({ value, desc }: { value: string, desc: string }) => {
    return (
        <div
            className="relative w-full h-[25vh] bg-[#000000] p-5 pl-8 flex flex-col
                justify-center items-start overflow-hidden shadow-lg/50"
        >
            <div className="absolute left-0 top-0 w-3 h-full bg-red-500"></div>
            <p className="text-5xl z-10">{value}</p>
            <p className="text-2xl z-10">{desc}</p>
        </div>
    )
}

const StatisticsSection = () => {
    const languageContext = useLanguage();

    return (
        <div
            id={"statistics"}
            className="w-full h-auto px-10 py-10 bg-white grid grid-cols-2 gap-5"
        >
            <StatisticsFactoid value="18+" desc={languageContext?.language == "en" ? "years of experience" : "năm kinh nghiệm"} />
            <StatisticsFactoid value="999+" desc={languageContext?.language == "en" ? "projects" : "dự án"} />
            <StatisticsFactoid value="190+" desc={languageContext?.language == "en" ? "customers" : "khách hàng"} />
            <StatisticsFactoid value="100+" desc={languageContext?.language == "en" ? "employees" : "nhân viên"} />
        </div>
    )
}

const ProjectsSection = () => {
    const languageContext = useLanguage();

    const projects = [
        {
            name: "RMIT Academic B2",
            type: "Education",
            src: "/test/diningbg.png"
        },
        {
            name: "RMIT Academic B3",
            type: "Education",
            src: "/test/testbg.png"
        },
        {
            name: "RMIT Academic B4",
            type: "Education",
            src: "/test/diningbg.png"
        },
        {
            name: "RMIT Academic B5",
            type: "Education",
            src: "/test/testbg.png"
        },
        {
            name: "RMIT Academic B6",
            type: "Education",
            src: "/test/diningbg.png"
        },
    ]

    const [index, setIndex] = useState(0);
    const [timer, setTimer] = useState(0);
    const [timerWidth, setTimerWidth] = useState(0);
    const INTERVAL = 10000;
    const TIMER_INTERVAL = 50;
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
    }, [projects.length, timer]);

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
            <div className="absolute w-auto h-auto top-0 right-0 mt-5 mr-5 flex flex-col justify-start items-end">
                <div className="w-auto h-auto flex flex-row justify-start items-end">
                    {projects.slice(0, 3).map((_, i) => (
                        <button
                            className={`size-15 m-2 border-4 flex justify-center items-center
                            ${index == i ? "bg-red-500" : "bg-transparent"} border-red-500 text-white
                            hover:bg-red-500 duration-150 cursor-pointer`}
                            key={`project_top_${i}`}
                            onClick={() => {
                                setTimer(INTERVAL);
                                setIndex(i);
                            }}
                        >
                            <p className={`text-2xl ${navFont.className}`}>{`0${i + 1}`}</p>
                        </button>
                    ))}
                </div>
                <div className="w-auto h-auto flex flex-row justify-start items-end">
                    {projects.slice(3, projects.length).map((_, i) => (
                        <button
                            className={`size-15 m-2 border-4 flex justify-center items-center
                            ${index == i + 3 ? "bg-red-500" : "bg-transparent"} border-red-500 text-white
                            hover:bg-red-500 duration-150 cursor-pointer`}
                            key={`project_top_${i + 3}`}
                            onClick={() => {
                                setTimer(INTERVAL);
                                setIndex(i + 3);
                            }}
                        >
                            <p className={`text-2xl ${navFont.className}`}>{`0${i + 4}`}</p>
                        </button>
                    ))}
                </div>
            </div>
            {/* Bottom Right URL */}
            <div className="absolute w-auto h-auto bottom-0 right-0 mb-5 mr-5">
                <Link
                    href={"/projects"}
                    className="px-5 border-2 border-white bg-transparent
                        hover:bg-white hover:text-black duration-150 text-2xl"
                >
                    {languageContext?.language == "en" ? "See More" : "Xem thêm"}
                </Link>
            </div>
            {/* Bottom Left Information */}
            <div className="absolute w-auto h-auto bottom-0 left-0 mb-5 ml-5">
                <AnimatePresence mode="wait">
                    <motion.div
                        className="flex flex-col justify-start items-start"
                        key={`project_info_${index}`}
                        initial={{ x: -40, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -40, opacity: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <p className={`text-3xl text-shadow-lg ${titleFont.className}`}>{projects[index].name}</p>
                        <p className="text-2xl text-shadow-lg">{projects[index].type}</p>
                        <Link
                            href={"/"}
                            className="text-lg text-shadow-lg mb-0.5 underline underline-offset-4"
                        >
                            {languageContext?.language == "en" ? "View details" : "Xem chi tiết"}
                        </Link>
                    </motion.div>
                </AnimatePresence>
            </div>
            {/* Timer */}
            <div className="absolute bottom-0 h-1 w-full bg-black">
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
        <div
            className="relative w-full h-[25%] flex flex-col
            justify-center items-center text-center overflow-hidden shadow-lg/50"
        >
            <div className="absolute w-full h-full overflow-hidden">
                <Image
                    src={bg}
                    alt="Factoid Background"
                    width={4492}
                    height={2995}
                    className="absolute w-full h-full object-cover brightness-30 group-hover:scale-120 duration-150"
                />
            </div>
            <p className={`px-5 text-2xl z-10 ${titleFont.className}`}>{title}</p>
            <div className="w-[80%] border border-white opacity-80 my-2"></div>
            <p className="px-5 text-xl z-10 text-center">{desc}</p>
        </div>
    )
}

const WhyUsSection = () => {
    const languageContext = useLanguage();

    return (
        <div
            id="why-us"
            className="w-full h-[120vh] px-10 py-10 bg-white"
        >
            <div className="w-auto h-full flex flex-col justify-center items-center gap-10 group">
                <WhyUsFactoid
                    title={languageContext?.language == "en" ? "Services" : "Dịch Vụ"}
                    desc="One of Vietnam's premier companies in design and build."
                    bg="/test/diningbg.png"
                />
                <WhyUsFactoid
                    title={languageContext?.language == "en" ? "Prices" : "Giá Cả"}
                    desc="We offer the best price for the best services."
                    bg="/test/diningbg.png"
                />
                <WhyUsFactoid
                    title={languageContext?.language == "en" ? "Professional" : "Chuyên Nghiệp"}
                    desc="An experienced, creative, young and enthusiastic team ready to support."
                    bg="/test/diningbg.png"
                />
                <WhyUsFactoid
                    title={languageContext?.language == "en" ? "Factory" : "Sản Xuất"}
                    desc="Massive and customizable production for your designs."
                    bg="/test/diningbg.png"
                />
            </div>
        </div>
    )
}

const ClientsSection = () => {
    const languageContext = useLanguage();
    const clientList = [
        "/GBA Logo.png",
        "/test/rock.png",
        "/GBA Logo.png",
    ]

    return (
        <div 
            id="clients"
            className="relative w-full h-[60vh] flex flex-col justify-between items-center overflow-hidden"
        >
            <Image
                src={"/test/diningbg.png"}
                alt="Project Background"
                width={4492}
                height={2995}
                className="absolute w-full h-full object-cover brightness-30 shadow-lg/50"
            />
            <div className="relative w-full h-full flex flex-col justify-between items-center">
                <div className="w-full h-[30%] flex flex-col justify-around items-center my-5">
                    <p className={`text-4xl text-left ${titleFont.className}`}>
                        {languageContext?.language == "en" ? "Our clients" : "Khách hàng thân thiết"}
                    </p>
                    <Link
                        className="text-2xl border-2 px-5 border-white hover:bg-white hover:text-black duration-150"
                        href="/"
                    >
                        {languageContext?.language == "en" ? "See more" : "Xem thêm"}
                    </Link>
                </div>
                <div className="w-[80%] border-2 border-red-500"></div>
                <motion.div
                    className="w-full h-[70%] flex flex-row justify-between items-center overflow-hidden"
                >
                    {[...clientList, ...clientList].map((client, i) => (
                        <motion.div
                            className="relative w-full h-full flex justify-start items-center flex-none"
                            key={"client_" + i}
                            animate={{ x: ["0%", "-300%"] }}
                            transition={{
                                x: { repeat: Infinity, repeatType: "loop", duration: 15, ease: "linear" },
                            }}
                        >
                            <Image
                                src={client}
                                alt="Project Background"
                                width={4492}
                                height={2995}
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

    const [articles, setArticles] = useState<ArticlesType | null>(null);
    
    useEffect(() => {
        fetchArticles()
            .then(setArticles)
            .catch(console.error)
    }, []);

    return (
        <div
            id="bulletin"
            className="relative w-full h-[150vh] bg-white px-10 py-10 flex flex-col justify-between items-center"
        >
            {/* Newest Article */}
            <div className="w-full h-1/2 flex flex-col justify-between items-center">
                <div className="w-full h-auto flex flex-row justify-between items-end">
                    <p className={`text-3xl text-gray-800 ${titleFont.className}`}>
                        {languageContext?.language == "en" ? "Articles" : "Tin tức"}
                    </p>
                    <Link
                        className="text-xl border-2 px-5 text-gray-800 border-gray-800 whitespace-nowrap
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
            </div>
            <div className="relative w-full h-1/2 mt-10 flex flex-col justify-center items-center gap-5">
                {/* Newest Project */}
                <Link
                    href={articles?.newestProject.url ?? "/"}
                    target="_blank"
                    className="relative w-full h-1/2 group"
                >
                    <div className="absolute z-10 top-5 left-5 flex flex-row justify-start items-center gap-5">
                        <div className="h-8 border-4 border-red-500"></div>
                        <p className={`text-2xl ${titleFont.className}`}>
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
                    <p className="absolute bottom-3 left-5 z-10 text-2xl">{articles?.newestProject.title}</p>
                </Link>
                {/* Compliments */}
                <Link
                    href={articles?.newestAward.url ?? "/"}
                    target="_blank"
                    className="relative w-full h-1/4 bg-gray-700 shadow-lg/50 hover:bg-black duration-200 cursor-pointer group"
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
                    <div className="absolute top-3 left-5 flex flex-row justify-start items-center gap-3">
                        <div className="h-6 border-4 border-red-500"></div>
                        <p className={`text-2xl text-left font-semibold`}>
                            {languageContext?.language == "en" ? "Recognition" : "Khen thưởng"}
                        </p>
                    </div>
                    <p className="absolute bottom-3 left-5 text-2xl">{articles?.newestAward.title}</p>
                </Link>
                <Link
                    href={"/"}
                    className="relative w-full h-1/4 bg-red-500 shadow-lg/50 hover:bg-black duration-200 cursor-pointer group"
                >
                    <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
                        <Image
                            src={fetchImageOrFile("Blogs/newest-event.jpg")}
                            width={1080}
                            height={1080}
                            alt="Company Event"
                            className="w-full h-full object-cover brightness-30 shadow-lg/50
                                group-hover:scale-120 duration-150"
                        />
                    </div>
                    <div className="absolute top-3 left-5 flex flex-row justify-start items-center gap-3">
                        <div className="h-6 border-4 border-red-500"></div>
                        <p className={`text-2xl text-left font-semibold`}>
                            {languageContext?.language == "en" ? "Events" : "Sự kiện"}
                        </p>
                    </div>
                    <p className="absolute bottom-3 left-5 text-2xl">{articles?.newestEvent.title}</p>
                </Link>
            </div>
        </div>
    )
}

const ContactUsSection = () => {
    const languageContext = useLanguage();

    return (
        <div
            id="contact-us"
            className="relative w-full h-auto flex flex-col justify-between items-center overflow-hidden"
        >
            <Image
                src={"/test/diningbg.png"}
                alt="Project Background"
                width={4492}
                height={2995}
                className="absolute w-full h-full object-cover brightness-30 shadow-lg/50"
            />
            <div className="relative w-full h-full py-10 flex flex-col justify-center items-center gap-5">
                <p className={`text-3xl w-full text-center ${titleFont.className}`}>
                    {languageContext?.language == "en" ? "Get In Touch" : "Liên Hệ Chúng Tôi"}
                </p>
                <div className="w-[80%] border-2 border-red-500"></div>
                <div className="w-full h-auto px-10 flex flex-col justify-center items-start gap-3">
                    <p className="text-2xl">{languageContext?.language == "en" ? "Head Office" : "Văn phòng chính"}</p>
                    <div className="text-xl flex flex-row justify-start items-center gap-3">
                        <PiMapPin className="flex-none" />
                        <p>
                            {languageContext?.language == "en" ? "88 Thich Quang Duc, Ward 05, Phu Nhuan District, HCMC" :
                                "88 Thích Quảng Đức, Quận 5, Phường Phú Nhuận, Thành phố Hồ Chí Minh"}
                        </p>
                    </div>
                    <div className="text-xl flex flex-row justify-start items-center gap-3">
                        <HiOutlineMail className="flex-none" />
                        <p>
                            sales@gba.vn
                        </p>
                    </div>
                    <div className="text-xl flex flex-row justify-start items-center gap-3">
                        <FiPhone className="flex-none" />
                        <p>
                            +84 28 3535 5966 - +84 28 3535 5988
                        </p>
                    </div>
                </div>
                <div className="w-full h-full px-10 flex flex-row justify-center items-center gap-5">
                    <p className="text-2xl">{languageContext?.language == "en" ? "Follow us" : "Theo dõi chúng tôi"}</p>
                    <div className="w-auto h-auto flex flex-row justify-center items-center gap-5">
                        <Link
                            href="https://www.facebook.com/gbavn"
                            target="_blank"
                            className="text-2xl"
                        >
                            <FaFacebook />
                        </Link>
                        <Link
                            href="https://www.linkedin.com/in/global-brother-associates-co-ltd-design-and-build-435446339/"
                            target="_blank"
                            className="text-2xl"
                        >
                            <FaLinkedin />
                        </Link>
                        <Link
                            href="https://maps.app.goo.gl/WQ2P8WYXbQtsznZc6"
                            target="_blank"
                            className="text-2xl"
                        >
                            <FaMapMarkedAlt />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}