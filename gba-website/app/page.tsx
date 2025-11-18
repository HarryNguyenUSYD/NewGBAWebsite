"use client";

import { useEffect, useRef, useState } from "react";
import SiteWrapper from "@/global/SiteWrapper/SiteWrapper";
import Image from "next/image";
import { Charm } from "next/font/google";
import { useLanguage } from "@/global/LanguageContext/LanguageContext";
import { FaArrowRightLong } from "react-icons/fa6";
import { motion, useScroll, useTransform } from "framer-motion";
import { useNavigationBar } from "@/global/NavigationBar/NavigationBarContext";

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
            className="relative w-full flex flex-col justify-center items-center inset-shadow-sm"
            animate={{ height: height }}
        >
            <div className={bannerFont.className + " flex flex-col justify-center items-start text-shadow-sm"}>
                <p className="-my-15">
                    <span className="text-[15rem]">20</span>
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
                    src={"/test/dinningbg.png"}
                    alt="Project Background"
                    width={4492}
                    height={2995}
                    className="absolute w-auto h-full object-cover brightness-30 shadow-lg/50"
                />
                <p className="w-full px-20 text-7xl text-white z-10">
                    { languageContext?.language == "en" ? "About us" : "Về chúng tôi" }
                </p>
                <p className="w-full px-20 text-3xl text-white z-10">
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
                    hover:bg-black duration-150 cursor-pointer shadow-lg/50"
                >
                    <p className="text-4xl text-left font-semibold">{languageContext?.language == "en" ? "Download our Company Profile" : "Hồ Sơ Năng Lực"}</p>
                    <FaArrowRightLong className="text-4xl" />
                </button>
                <button
                    className="w-full h-auto p-10 bg-red-500 text-white flex flex-col justify-center items-start gap-5
                    hover:bg-black duration-150 cursor-pointer shadow-lg/50"
                >
                    <p className="text-4xl text-left font-semibold">{languageContext?.language == "en" ? "See our ISO Certifications" : "Chứng chỉ ISO"}</p>
                    <FaArrowRightLong className="text-4xl" />
                </button>
            </div>
        </div>
    )
}

const Factoid = ({ value, desc }: { value: string, desc: string }) => {
    return (
        <motion.div
            whileHover={"hover"}
            animate="initial"
            className="relative w-1/5 aspect-2 bg-[#000000] p-5 flex flex-col
            justify-center items-start overflow-hidden shadow-lg/50"
        >
            <motion.div
                className="absolute inset-0 bg-red-500"
                variants={{
                    initial: { x: "-100%" },   // start off-screen
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
            <Factoid value="18+" desc={languageContext?.language == "en" ? "years of experience" : "năm kinh nghiệm"} />
            <Factoid value="999+" desc={languageContext?.language == "en" ? "projects" : "dự án"} />
            <Factoid value="190+" desc={languageContext?.language == "en" ? "customers" : "khách hàng"} />
            <Factoid value="100+" desc={languageContext?.language == "en" ? "employees" : "nhân viên"} />
        </div>
    )
}

const Client = ({ src } : { src: string }) => {
    return (
        <div className="w-[20%] h-full flex justify-center items-center p-10 flex-none">
            <Image
                src={src}
                alt="Project Background"
                width={4492}
                height={2995}
                className="absolute w-auto h-full object-cover brightness-30 shadow-lg/50"
            />
        </div>
    )
}

const ClientsSection = () => {
    const languageContext = useLanguage();

    return (
        <div className="relative w-full h-[40vh] flex flex-row justify-between items-center overflow-hidden">
            <Image
                src={"/test/dinningbg.png"}
                alt="Project Background"
                width={4492}
                height={2995}
                className="absolute w-auto h-full object-fill brightness-30 shadow-lg/50"
            />
            <div className="relative w-full h-full flex flex-row justify-between items-center">
                <div className="w-[30%] h-full flex flex-col justify-center items-center">
                    <p className="text-4xl">{languageContext?.language == "en" ? "Our clients" : "Khách hàng thân thiết"}</p>
                    <p className="text-xl">{languageContext?.language == "en" ? "See more" : "Xem thêm"}</p>
                </div>
                <div className="w-full h-full flex flex-row justify-start items-center overflow-x-auto">
                    <Client src={"/GBA Logo.png"} />
                    <Client src={"/GBA Logo.png"} />
                    <Client src={"/GBA Logo.png"} />
                    <Client src={"/GBA Logo.png"} />
                </div>
            </div>
        </div>
    )
}