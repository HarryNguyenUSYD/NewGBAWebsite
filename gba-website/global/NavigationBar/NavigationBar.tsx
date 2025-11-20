import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "../LanguageContext/LanguageContext";
import { useNavigationBar } from "./NavigationBarContext";
import { navFont } from "../fonts/fonts";

export default function NavigationBar() {
    const languageContext = useLanguage();
    const navigationBarContext = useNavigationBar();

    return (
        <motion.nav
            className="fixed top-0 left-0 w-full h-(--navbar-height) flex flex-row justify-between bg-black z-50"
            animate={{
                y: navigationBarContext?.visible ? "0" : "calc(-1 * var(--navbar-height))"
            }}
            transition={{ duration: 0.2 }}
        >
            <CompanyLogo />
            <div className="w-full h-auto ml-10 flex flex-row justify-start items-center">
                <NavLink href="/">
                    {languageContext?.language == "en" ? "Projects" : "Dự Án"}
                </NavLink>
                <NavLink href="/">
                    {languageContext?.language == "en" ? "Blogs" : "Bài Báo"}
                </NavLink>
                <NavLink href="/">
                    {languageContext?.language == "en" ? "Clients" : "Khách Hàng"}
                </NavLink>
                <NavLink href="/">
                    {languageContext?.language == "en" ? "Partners" : "Đối Tác"}
                </NavLink>
                <NavLink href="/">
                    {languageContext?.language == "en" ? "Careers" : "Tuyển Dụng"}
                </NavLink>
            </div>
            <LanguageSetter />
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
    <motion.div
        whileHover={"hover"}
        className="relative w-40 h-full overflow-hidden flex justify-center items-center"
        animate="initial"
    >
        <Link
            href={href}
            className={`w-full h-full flex flex-row justify-center items-center text-xl ${navFont.className}`}>
            {children}
        </Link>
        <motion.div
            className="absolute inset-0 bg-red-500 -z-10"
            variants={{
                initial: { y: "100%" },   // start off-screen
                hover: { y: "0%" }      // slide fully in
            }}
            transition={{ duration: 0.2 }}
        >
        </motion.div>
    </motion.div>
)

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
                            cursor-pointer px-3 rounded-2xl text-(--txt)"
            >
                <Image src={"/vi.png"} width={512} height={512} alt="Vietnamese Flag" className="w-auto h-1/2" />
                <span className="text-xl">VI</span>
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
                            cursor-pointer px-3 rounded-2xl text-(--txt)"
            >
                <Image src={"/en.png"} width={512} height={512} alt="US Flag" className="w-auto h-1/2" />
                <span className="text-xl">EN</span>
            </button>
        </div>
    )
}