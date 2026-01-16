import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "../LanguageContext/LanguageContext";
import { useNavigationBar } from "./NavigationBarContext";
import { navFont } from "../fonts/fonts";
import { FaPhone } from "react-icons/fa";
import { useEffect, useState } from "react";

export default function NavigationBar({ isHomepage }: { isHomepage: boolean }) {
    const languageContext = useLanguage();
    const navigationBarContext = useNavigationBar();
    
    const [active, setActive] = useState<string>("");
    
    useEffect(() => {
        const sections = ["about-us", "projects", "why-us", "clients", "bulletin", "contact-us"]
        const observers: IntersectionObserver[] = [];

        sections.forEach((id) => {
            const el = document.getElementById(id);
            if (!el) return;

            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        setActive(id);
                    }
                },
                {
                    rootMargin: "0% 0px 0% 0px", 
                    threshold: 0.75,
                }
            );

            observer.observe(el);
            observers.push(observer);
        });

        return () => observers.forEach((o) => o.disconnect());
    }, []);

    return (
        <motion.nav
            className="fixed top-0 left-0 w-full h-auto flex flex-col justify-center items-start z-50"
            animate={{
                y: navigationBarContext?.visible ? "0" : "calc(-1 * (var(--navbar-height) + 0.5rem + var(--on-this-page-height)))"
            }}
            transition={{ duration: 0.2 }}
        >
            <div className="w-full h-(--navbar-height) flex flex-row justify-between items-center bg-black z-50">
                <CompanyLogo />
                <div className="w-full h-full ml-10 flex flex-row justify-start items-center">
                    <NavLink href="/projects">
                        {languageContext?.language == "en" ? "Projects" : "Dự Án"}
                    </NavLink>
                    <NavLink href="/articles">
                        {languageContext?.language == "en" ? "Articles" : "Bài Báo"}
                    </NavLink>
                    <NavLink href="/clients">
                        {languageContext?.language == "en" ? "Clients" : "Khách Hàng"}
                    </NavLink>
                    <NavLink href="/careers">
                        {languageContext?.language == "en" ? "Careers" : "Tuyển Dụng"}
                    </NavLink>
                    <NavLink href="/vendors">
                        {languageContext?.language == "en" ? "Vendors" : "Cung Cấp"}
                    </NavLink>
                    <NavLink href="/resources">
                        {languageContext?.language == "en" ? "Resources" : "Tài Nguyên"}
                    </NavLink>
                </div>
                <ContactUsButton />
                <LanguageSetter />
            </div>
            {isHomepage && (
                <div
                    className="w-full h-(--on-this-page-height) mt-2 flex flex-row justify-center items-center pointer-events-none"
                >
                    <div
                        className="w-auto h-auto flex flex-row justify-center items-center
                        bg-white border-2 rounded-full border-black pointer-events-auto"
                    >
                        <MiniNavLink id={"about-us"} active={active}>
                            {languageContext?.language == "en" ? "About us" : "Về chúng tôi"}
                        </MiniNavLink>
                        <MiniNavLink id={"projects"} active={active}>
                            {languageContext?.language == "en" ? "Projects" : "Dự án"}
                        </MiniNavLink>
                        <MiniNavLink id={"why-us"} active={active}>
                            {languageContext?.language == "en" ? "Why us" : "Lợi thế"}
                        </MiniNavLink>
                        <MiniNavLink id={"clients"} active={active}>
                            {languageContext?.language == "en" ? "Clients" : "Khách hàng"}
                        </MiniNavLink>
                        <MiniNavLink id={"bulletin"} active={active}>
                            {languageContext?.language == "en" ? "Bulletin" : "Thông tin"}
                        </MiniNavLink>
                        <MiniNavLink id={"contact-us"} active={active}>
                            {languageContext?.language == "en" ? "Contact us" : "Liên hệ"}
                        </MiniNavLink>
                    </div>
                </div>
            )}
        </motion.nav>
    )
}

const CompanyLogo = () => (
    <div className="w-auto h-full flex flex-row justify-start items-center flex-none">
        <Link
            href={"/"}
            className="w-auto h-full object-cover flex flex-row justify-center items-center p-3 z-10 flex-none"
        >
            <Image src={"/GBA Logo.png"} width={2560} height={1040} alt="Company Logo" className="h-full w-auto object-cover" />
        </Link>
        <div className="h-[75%] border rounded-4xl border-white ml-5"></div>
    </div>
)

const NavLink = ({ href, children }: {
    href: string,
    children: React.ReactNode
}) => (
    <motion.a
        href={href}
        whileHover={"hover"}
        className="relative w-auto h-full px-8 overflow-hidden flex justify-center items-center"
        animate="initial"
    >
        <div
            className={`w-full h-full flex flex-row justify-center items-center text-xl ${navFont.className}`}>
            {children}
        </div>
        <motion.div
            className="absolute inset-0 bg-red-500 -z-10"
            variants={{
                initial: { y: "100%" },   // start off-screen
                hover: { y: "0%" }      // slide fully in
            }}
            transition={{ duration: 0.2 }}
        >
        </motion.div>
    </motion.a>
)

const MiniNavLink = ({ id, children, active }: {
    id: string,
    children: React.ReactNode,
    active: string
}) => {
    const scrollTo = (id: string) => {
        const el = document.getElementById(id);
        if (!el) return;

        const y = el.getBoundingClientRect().top + window.scrollY - 80;

        window.scrollTo({
            top: y,
            behavior: "smooth",
        });
    };

    return (
        <motion.div
            whileHover={"hover"}
            className="relative w-35 h-full overflow-hidden flex justify-center items-center py-1 px-1"
            animate="initial"
        >
            <button
                onClick={() => scrollTo(id)}
                className={`w-full h-full flex flex-row justify-center items-center
                    text-md border-transparent rounded-full cursor-pointer
                    ${active == id ? "bg-red-500 text-white" : "bg-transparent text-black hover:border-red-200 hover:bg-red-200"}
                    duration-150 ${navFont.className}`}>
                {children}
            </button>
        </motion.div>
    )
}

const ContactUsButton = () => {
    const languageContext = useLanguage();

    return (
        <Link
            href={"/#contact-us"}
            className="w-auto h-auto flex flex-row justify-center items-center gap-4 my-5 px-5 py-1 rounded-full bg-red-700
            hover:text-gray-800 hover:bg-white duration-150"
        >
            <p className="text-2xl whitespace-nowrap">{languageContext?.language == "en" ? "Contact Us" : "Liên Hệ"}</p>
            <FaPhone className="text-xl" />
        </Link>
    )
}

const LanguageSetter = () => {
    const languageContext = useLanguage();

    return (
        <div className="w-70 h-full px-5 py-5 flex flex-row justify-between items-center">
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
                            cursor-pointer px-4 rounded-2xl text-(--txt)"
            >
                <Image src={"/vi.png"} width={512} height={512} alt="Vietnamese Flag" className="w-auto h-1/2" />
                <span className={`text-lg ${navFont.className}`}>VI</span>
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
                            cursor-pointer px-4 rounded-2xl text-(--txt)"
            >
                <Image src={"/en.png"} width={512} height={512} alt="US Flag" className="w-auto h-1/2" />
                <span className={`text-lg ${navFont.className}`}>EN</span>
            </button>
        </div>
    )
}