import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useLanguage } from "../LanguageContext/LanguageContext";
import { useNavigationBar } from "./NavigationBarContext";
import { navFont } from "../fonts/fonts";
import { FaPhone, FaBars } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { useState } from "react";

export default function NavigationBar({ isHomepage }: { isHomepage: boolean }) {
    const languageContext = useLanguage();
    const navigationBarContext = useNavigationBar();
    
    const [isShowingContent, setIsShowingContent] = useState(false);

    return (
        <motion.nav
            className="fixed top-0 left-0 w-full h-auto flex flex-col justify-center items-start z-50"
            animate={{
                y: navigationBarContext?.visible ? "0" : "calc(-1 * (var(--navbar-height) + 0.5rem + var(--on-this-page-height)))"
            }}
            transition={{ duration: 0.2 }}
        >
            <div className="w-full h-(--navbar-height) z-50">
                <div className="relative w-full h-full flex flex-row justify-between items-center bg-black z-10">
                    <CompanyLogo />
                    <button
                        className="relative mx-3 size-10 flex justify-center items-center
                            rounded-full bg-transparent border-2 border-white overflow-hidden"
                        onClick={() => setIsShowingContent(!isShowingContent)}
                    >
                        <motion.div
                            className="absolute w-10 h-auto flex flex-col justify-start items-center gap-5"
                            animate={{ top: isShowingContent ? "-1.75rem" : "0.625rem" }}
                            transition={{ duration: 1, type: "spring" }}
                        >
                            <FaBars className="text-lg text-white" />
                            <FaXmark className="text-lg text-white" />
                        </motion.div>
                    </button>
                </div>
                <AnimatePresence>
                    {isShowingContent && (
                        <motion.div
                            className="absolute left-0 w-full pt-[10vh] h-auto bg-black
                                flex flex-col justify-start items-center z-0"
                            initial={{ top: "-100vh" }}
                            animate={{ top: "calc(var(--navbar-height) - 10vh)" }}
                            exit={{ top: "-100vh" }}
                            transition={{ duration: 1, type: "spring" }}
                        >
                            <NavLink href="/projects">
                                {languageContext?.language == "en" ? "Projects" : "Dự Án"}
                            </NavLink>
                            <NavLink href="/articles">
                                {languageContext?.language == "en" ? "Articles" : "Bài Báo"}
                            </NavLink>
                            <NavLink href="/clients">
                                {languageContext?.language == "en" ? "Clients" : "Khách Hàng"}
                            </NavLink>
                            <NavLink href="/partners">
                                {languageContext?.language == "en" ? "Partners" : "Đối Tác"}
                            </NavLink>
                            <NavLink href="/careers">
                                {languageContext?.language == "en" ? "Careers" : "Tuyển Dụng"}
                            </NavLink>
                            <div className="w-full h-auto p-2 flex flex-row justify-around items-center">
                                <ContactUsButton />
                                <LanguageSetter />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.nav>
    )
}

const CompanyLogo = () => (
    <div className="w-auto h-full flex flex-row justify-start items-center flex-none">
        <Link
            href={"/"}
            className="w-auto h-full object-cover flex flex-row justify-center items-center p-5 z-10 flex-none"
        >
            <Image src={"/GBA Logo.png"} width={2560} height={1040} alt="Company Logo" className="h-full w-auto object-cover" />
        </Link>
    </div>
)

const NavLink = ({ href, children }: {
    href: string,
    children: React.ReactNode
}) => (
    <motion.div
        className="w-full h-auto px-5 py-3 flex justify-center items-center"
    >
        <Link
            href={href}
            className={`w-full h-auto flex flex-row justify-start items-center text-xl ${navFont.className}`}>
            {children}
        </Link>
    </motion.div>
)

const ContactUsButton = () => {
    const languageContext = useLanguage();

    return (
        <Link
            href={"/"}
            className="w-auto h-auto flex flex-row justify-center items-center gap-2 my-5 px-3 py-1 rounded-full bg-red-700
            hover:text-gray-800 hover:bg-white duration-150"
        >
            <p className="text-xl whitespace-nowrap">{languageContext?.language == "en" ? "Contact Us" : "Liên Hệ"}</p>
            <FaPhone className="text-md" />
        </Link>
    )
}

const LanguageSetter = () => {
    const languageContext = useLanguage();

    return (
        <div className="w-auto h-15 flex flex-row justify-between items-center">
            <button
                onClick={() => languageContext?.setLanguage("vi")}
                style={
                    {
                        "--bg": languageContext?.language === "vi" ? "white" : "auto",
                        "--txt": languageContext?.language === "vi" ? "black" : "auto",
                        pointerEvents: (languageContext?.language === "vi" && "none")
                    } as React.CSSProperties
                }
                className="bg-(--bg) hover:bg-gray-800 duration-200 
                            w-auto h-full flex flex-row justify-center items-center gap-3
                            cursor-pointer px-2 rounded-2xl text-(--txt)"
            >
                <Image src={"/vi.png"} width={512} height={512} alt="Vietnamese Flag" className="w-auto h-1/2" />
                <span className={`text-md ${navFont.className}`}>VI</span>
            </button>
            <span className="text-xl mx-3">/</span>
            <button
                onClick={() => languageContext?.setLanguage("en")}
                style={
                    {
                        "--bg": languageContext?.language === "en" ? "white" : "auto",
                        "--txt": languageContext?.language === "en" ? "black" : "auto",
                        pointerEvents: (languageContext?.language === "en" && "none")
                    } as React.CSSProperties
                }
                className="bg-(--bg) hover:bg-gray-800 duration-200 
                            w-auto h-full flex flex-row justify-center items-center gap-3
                            cursor-pointer px-2 rounded-2xl text-(--txt)"
            >
                <Image src={"/en.png"} width={512} height={512} alt="US Flag" className="w-auto h-1/2" />
                <span className={`text-md ${navFont.className}`}>EN</span>
            </button>
        </div>
    )
}