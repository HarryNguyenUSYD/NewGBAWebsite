"use client";

import { useEffect, useRef, useState } from "react";
import SiteWrapper from "@/global/SiteWrapper/SiteWrapper";
import Image from "next/image";
import { Charm } from "next/font/google";
import { useLanguage } from "@/global/LanguageContext/LanguageContext";
import { FaArrowRightLong } from "react-icons/fa6";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import { useNavigationBar } from "@/global/NavigationBar/NavigationBarContext";
import Link from "next/link";
import { navFont } from "@/global/fonts/fonts";

const bannerFont = Charm({
    weight: ["700"],
    subsets: ["latin", "vietnamese"]
});

export default function Home() {
    return (
        <SiteWrapper topMargin={false}>
            <BannerSection />
            <BannerForeground />
            <AboutUsSection />
            <StatisticsSection />
            <ProjectsSection />
            <WhyUsSection />
            <ClientsSection />
        </SiteWrapper>
    );
}

const BannerSection = () => {
    return (
        <div className="fixed w-full h-screen -z-10">
            <div className="w-full h-full flex flex-col justify-center items-center">
                <Image
                    src={"/test/testbg.png"}
                    width={612}
                    height={344}
                    alt="Banner Background"
                    className="absolute w-full h-full object-cover brightness-50 -z-10"
                />
            </div>
        </div>
    )
}

const BannerForeground = () => {
    const languageContext = useLanguage();
    const navigationBarContext = useNavigationBar();

    const containerRef = useRef<HTMLDivElement>(null);

    const MAX = typeof window !== "undefined" ? window.innerHeight : 1000;  // 100vh
    const MIN = MAX * 0.4; // 50vh

    const { scrollY } = useScroll();

    const [height, setHeight] = useState(MAX);
    
    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        const onWheel = (e: WheelEvent) => {
            if (scrollY.get() > 0) {
                navigationBarContext?.setVisible(true);
                return;
            } else {
                navigationBarContext?.setVisible(false);
            }

            // If shrinking still available, use scroll to shrink instead of scroll page
            if (height > MIN && e.deltaY > 0) {
                e.preventDefault(); // STOP page scroll

                setHeight(prev => Math.max(prev - e.deltaY, MIN));
            }
            // When user scrolls up, expand back
            else if (height < MAX && e.deltaY < 0) {
                e.preventDefault();
                setHeight(prev => Math.min(prev - e.deltaY, MAX));
            }
            // If fully shrunk, allow page scroll normally
            // (do NOT preventDefault here)
        };

        // passive: false is required to allow preventDefault
        window.addEventListener("wheel", onWheel, { passive: false });

        return () => {
            window.removeEventListener("wheel", onWheel);
        };
    }, [height, MIN, MAX, scrollY, navigationBarContext]);

    return (
        <motion.div
            ref={containerRef}
            className="relative w-full flex flex-col justify-center items-center"
            animate={{ height: height }}
        >
            <div className={bannerFont.className + " flex flex-col justify-center items-start text-shadow-sm"}>
                <p>
                    <span className="text-[15rem] leading-none">20</span>
                    <span className="text-6xl">{languageContext?.language == "en" ? "years" : "năm"}</span>
                </p>
                <p>
                    <span className="text-6xl">{languageContext?.language == "en" ? "of vast experience" : "kinh nghiệm dồi dào"}</span>
                </p>
            </div>
        </motion.div>
    )
}

const AboutUsSection = () => {
    const languageContext = useLanguage();

    return (
        <div className="w-full h-[80vh] px-40 py-10 bg-white flex flex-row justify-between items-center">
            <div
                className={"relative w-[75%] mr-10 h-full flex flex-col justify-center items-start gap-10"}
            >
                <Image
                    src={"/test/diningbg.png"}
                    alt="Project Background"
                    width={4492}
                    height={2995}
                    className="absolute w-auto h-full object-cover brightness-30 shadow-lg/50"
                />
                <p className="w-full px-20 text-7xl text-white z-10">
                    { languageContext?.language == "en" ? "About us" : "Về chúng tôi" }
                </p>
                <p className="w-2/3 px-20 text-3xl text-white z-10">
                {
                    languageContext?.language == "en" ?
                    "Established in 2007, Global Brother Associates (GBA) is one of Vietnam's top design company focusing in Architecture, Interior Decoration, Construction, MEP works and Furniture Supply to Turnkey Projects."
                    :
                    "Established in 2007, Global Brother Associates (GBA) is one of Vietnam's top design company focusing in Architecture, Interior Decoration, Construction, MEP works and Furniture Supply to Turnkey Projects."
                }
                </p>
            </div>
            <div className="h-[80%] border-2 border-red-500"></div>
            <div className="w-[25%] ml-10 h-full flex flex-col justify-center items-center gap-10">
                <button
                    className="w-full h-auto p-10 bg-gray-700 text-white flex flex-col justify-center items-start gap-5
                    hover:bg-black duration-200 cursor-pointer shadow-lg/50"
                >
                    <p className="text-4xl text-left font-semibold">{languageContext?.language == "en" ? "Download our Company Profile" : "Hồ Sơ Năng Lực"}</p>
                    <FaArrowRightLong className="text-4xl" />
                </button>
                <button
                    className="w-full h-auto p-10 bg-red-500 text-white flex flex-col justify-center items-start gap-5
                    hover:bg-black duration-200 cursor-pointer shadow-lg/50"
                >
                    <p className="text-4xl text-left font-semibold">{languageContext?.language == "en" ? "See our ISO Certifications" : "Chứng chỉ ISO"}</p>
                    <FaArrowRightLong className="text-4xl" />
                </button>
            </div>
        </div>
    )
}

const StatisticsFactoid = ({ value, desc }: { value: string, desc: string }) => {
    return (
        <motion.div
            whileHover={"hover"}
            animate="initial"
            className="relative w-1/5 aspect-2 bg-[#000000] p-5 pl-12 flex flex-col
            justify-center items-start overflow-hidden shadow-lg/50"
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
        <div className="w-full h-auto px-40 py-10 bg-white flex flex-row justify-between items-center">
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
    const [reset, setReset] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex(v => (v + 1) % projects.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [projects.length, reset]);

    return (
        <div className="relative w-full h-[calc(100vh-var(--navbar-height))] bg-black">
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
                    {projects.slice(0, 3).map((project, i) => (
                        <button
                            className={`size-20 m-2 border-4 flex justify-center items-center
                            ${index == i ? "bg-red-500" : "bg-transparent"} border-red-500 text-white
                            hover:bg-red-500 duration-150 cursor-pointer`}
                            key={`project_top_${i}`}
                            onClick={() => {
                                setReset(!reset);
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
                                setReset(!reset);
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
                    href={"/"}
                    className="px-5 border-2 border-white bg-transparent
                    hover:bg-white hover:text-black duration-150 text-4xl"
                >
                    {languageContext?.language == "en" ? "View details" : "Xem chi tiết"}
                </Link>
            </div>
            {/* Bottom Left Information */}
            <div className="absolute w-auto h-auto bottom-0 left-0 mb-10 ml-10">
                <AnimatePresence mode="wait">
                    <motion.div
                        className="flex flex-col justify-start items-start"
                        key={`project_info_${index}`}
                        initial={{ x: -40, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -40, opacity: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <p className="text-8xl text-shadow-lg">{projects[index].name}</p>
                        <p className="text-5xl text-shadow-lg">{projects[index].type}</p>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    )
}

const WhyUsFactoid = ({ title, desc, bg }: {
    title: string,
    desc: string,
    bg: string
}) => {
    return (
        <motion.div
            // whileHover={"hover"}
            // animate="initial"
            className="relative w-1/5 h-full bg-[#000000] flex flex-col
            justify-center items-center overflow-hidden shadow-lg/50"
        >
            <Image
                src={bg}
                alt="Factoid Background"
                width={4492}
                height={2995}
                className="absolute w-full h-full object-cover brightness-30"
            />
            <p className="p-5 text-5xl z-10">{title}</p>
            <div className="w-[80%] border border-white opacity-80"></div>
            <p className="p-5 text-3xl z-10 text-center">{desc}</p>
        </motion.div>
    )
}

const WhyUsSection = () => {
    const languageContext = useLanguage();

    return (
        <div className="w-full h-[80vh] px-30 py-10 bg-white flex flex-row justify-around items-center">
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
        <div className="relative w-full h-[40vh] flex flex-row justify-between items-center overflow-hidden">
            <Image
                src={"/test/diningbg.png"}
                alt="Project Background"
                width={4492}
                height={2995}
                className="absolute w-full h-full object-cover brightness-30 shadow-lg/50"
            />
            <div className="relative w-full h-full flex flex-row justify-between items-center">
                <div className="w-[30%] h-full flex flex-col justify-center items-center gap-3">
                    <p className="text-7xl text-center">{languageContext?.language == "en" ? "Our clients" : "Khách hàng thân thiết"}</p>
                    <Link
                        className="text-3xl border-2 px-5 border-white hover:bg-white hover:text-black duration-150"
                        href="/"
                    >
                        {languageContext?.language == "en" ? "See more" : "Xem thêm"}
                    </Link>
                </div>
                <div className="h-[80%] border-2 border-white opacity-50"></div>
                <motion.div
                    className="w-full h-full flex flex-row justify-between items-center overflow-hidden"
                >
                    {[...clientList, ...clientList].map((client, i) => (
                        <motion.div
                            className="relative w-[33.3%] h-full flex justify-start items-center flex-none"
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