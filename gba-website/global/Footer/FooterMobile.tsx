import Link from "next/link";
import { useLanguage } from "../LanguageContext/LanguageContext";
import { FaFacebook, FaLinkedin, FaMapMarkedAlt } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { FiPhone } from "react-icons/fi";
import { PiMapPin } from "react-icons/pi";

interface FooterProps {
    text: string,
    href: string
}

const FooterColumn = ({ title, propList }: { title: string, propList: FooterProps[] }) => (
    <div className="w-[25%] h-full flex-none flex flex-col justify-start items-start gap-1">
        <p className="text-2xl">{title}</p>
        <div className="w-full border border-white"></div>
        {propList.map((props, i) => ( <FooterLink key={`footer_column_${title}_${i}`} props={props} /> ))}
    </div>
)

const FooterLink = ({ props }: { props: FooterProps }) => (
    <Link
        className="text-lg"
        href={props.href}
    >
        {props.text}
    </Link>
)

export default function Footer() {
    const languageContext = useLanguage();

    return (
        <div className="w-full h-[50vh] px-5 bg-black flex flex-col justify-between items-center">
            <div className="w-full h-full mx-5 mt-5 flex flex-row justify-start items-center gap-5">
                <FooterColumn title={languageContext?.language == "en" ? "Pages" : "Trang"} propList={[
                    { text: languageContext?.language == "en" ? "Homepage" : "Trang chủ", href: "/" },
                    { text: languageContext?.language == "en" ? "Projects" : "Dự án", href: "/" },
                    { text: languageContext?.language == "en" ? "Articles" : "Bài báo", href: "/" },
                    { text: languageContext?.language == "en" ? "Clients" : "Khách hàng", href: "/" },
                    { text: languageContext?.language == "en" ? "Partners" : "Đối tác", href: "/" },
                    { text: languageContext?.language == "en" ? "Careers" : "Tuyển dụng", href: "/" },
                ]} />
                <div className="h-full flex flex-col justify-start items-start gap-1">
                    <p className={`text-2xl`}>
                        {languageContext?.language == "en" ? "Get In Touch" : "Liên Hệ Chúng Tôi"}
                    </p>
                    <div className="w-full border border-white"></div>
                    <div className="text-lg flex flex-row justify-start items-center gap-3">
                        <PiMapPin className="flex-none" />
                        <p>
                            {languageContext?.language == "en" ? "88 Thich Quang Duc, Ward 05, Phu Nhuan District, HCMC" :
                                "88 Thích Quảng Đức, Quận 5, Phường Phú Nhuận, Thành phố Hồ Chí Minh"}
                        </p>
                    </div>
                    <div className="text-lg flex flex-row justify-start items-center gap-3">
                        <HiOutlineMail className="flex-none" />
                        <p>
                            sales@gba.vn
                        </p>
                    </div>
                    <div className="text-lg flex flex-row justify-start items-center gap-3">
                        <FiPhone className="flex-none" />
                        <p>
                            +84 28 3535 5966 - +84 28 3535 5988
                        </p>
                    </div>
                </div>
            </div>
            <div className="w-full h-auto my-2 flex flex-row justify-center items-center gap-5">
                <span className="text-xl">{languageContext?.language == "en" ? "Follow us:" : "Theo dõi chúng tôi: "}</span>
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
            <div className={`w-full h-auto mb-3 text-center text-lg text-white opacity-20`}>
                © Global Brother Associates 2025. All rights reserved
            </div>
        </div>
    )
}