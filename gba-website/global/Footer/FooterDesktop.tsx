import Link from "next/link";
import { useLanguage } from "../LanguageContext/LanguageContext";
import { FaFacebook, FaLinkedin, FaMapMarkedAlt } from "react-icons/fa";
import { PiMapPin } from "react-icons/pi";
import { HiOutlineMail } from "react-icons/hi";
import { FiPhone } from "react-icons/fi";

interface FooterProps {
    text: string,
    href: string
}

const FooterColumn = ({ title, propList }: { title: string, propList: FooterProps[] }) => (
    <div className="w-auto h-full mt-10 flex flex-col justify-start items-start gap-2">
        <p className="text-3xl">{title}</p>
        <div className="w-full border border-white"></div>
        {(propList.length < 5) ?
        (
            propList.map((props, i) => ( <FooterLink key={`footer_column_${title}_${i}`} props={props} /> ))
        ) : (
            <div className="flex flex-row justify-center items-center gap-10">
                <div className="flex flex-col justify-start items-start gap-2">
                    {propList.slice(0, Math.floor(propList.length / 2)).map((props, i) => ( <FooterLink key={`footer_column_${title}_${i}`} props={props} /> ))}
                </div>
                <div className="flex flex-col justify-start items-start gap-2">
                    {propList.slice(Math.floor(propList.length / 2), propList.length).map((props, i) => ( <FooterLink key={`footer_column_${title}_${i}`} props={props} /> ))}
                </div>
            </div>
        )}
    </div>
)

const FooterLink = ({ props }: { props: FooterProps }) => (
    <Link
        className="text-xl"
        href={props.href}
    >
        {props.text}
    </Link>
)

export default function Footer() {
    const languageContext = useLanguage();

    return (
        <div className="w-full h-[40vh] bg-black flex flex-col justify-between items-center">
            <div className="w-full h-full mx-10 flex flex-row justify-around items-center gap-5">
                <FooterColumn title={languageContext?.language == "en" ? "Pages" : "Trang"} propList={[
                    { text: languageContext?.language == "en" ? "Homepage" : "Trang chủ", href: "/" },
                    { text: languageContext?.language == "en" ? "Projects" : "Dự án", href: "/" },
                    { text: languageContext?.language == "en" ? "Articles" : "Bài báo", href: "/" },
                    { text: languageContext?.language == "en" ? "Clients" : "Khách hàng", href: "/" },
                    { text: languageContext?.language == "en" ? "Partners" : "Đối tác", href: "/" },
                    { text: languageContext?.language == "en" ? "Careers" : "Tuyển dụng", href: "/" },
                ]} />
                <FooterColumn title={languageContext?.language == "en" ? "Projects" : "Dự án"} propList={[
                    { text: languageContext?.language == "en" ? "Apartment" : "Căn hộ", href: "/" },
                    { text: languageContext?.language == "en" ? "Bank" : "Ngân hàng", href: "/" },
                    { text: languageContext?.language == "en" ? "Consulate" : "Lãnh sự quán", href: "/" },
                    { text: languageContext?.language == "en" ? "Education" : "Giáo dục", href: "/" },
                    { text: languageContext?.language == "en" ? "Food & Beverage" : "Đồ ăn & thức uống", href: "/" },
                    { text: languageContext?.language == "en" ? "Hotel & Resort" : "Khách sạn & Resort", href: "/" },
                    { text: languageContext?.language == "en" ? "Office" : "Văn phòng", href: "/" },
                    { text: languageContext?.language == "en" ? "Shop" : "Cửa hàng", href: "/" },
                    { text: languageContext?.language == "en" ? "Showroom" : "Phòng trưng bày", href: "/" },
                    { text: languageContext?.language == "en" ? "Others" : "Khác", href: "/" },
                ]} />
                <FooterColumn title={languageContext?.language == "en" ? "Articles" : "Bài báo"} propList={[
                    { text: languageContext?.language == "en" ? "Newest Article" : "Bài báo mới nhất", href: "/" }
                ]} />
                <div className="h-[80%] border-2 border-white"></div>
                <div className="h-full flex flex-col justify-center items-start gap-5">
                    <p className={`text-4xl`}>
                        {languageContext?.language == "en" ? "Get In Touch" : "Liên Hệ Chúng Tôi"}
                    </p>
                    <div className="text-2xl flex flex-row justify-start items-center gap-3">
                        <PiMapPin className="flex-none" />
                        <p>
                            {languageContext?.language == "en" ? "88 Thich Quang Duc, Ward 05, Phu Nhuan District, HCMC" :
                                "88 Thích Quảng Đức, Quận 5, Phường Phú Nhuận, Thành phố Hồ Chí Minh"}
                        </p>
                    </div>
                    <div className="text-2xl flex flex-row justify-start items-center gap-3">
                        <HiOutlineMail className="flex-none" />
                        <p>
                            sales@gba.vn
                        </p>
                    </div>
                    <div className="text-2xl flex flex-row justify-start items-center gap-3">
                        <FiPhone className="flex-none" />
                        <p>
                            +84 28 3535 5966 - +84 28 3535 5988
                        </p>
                    </div>
                </div>
                <div className="h-full flex flex-col justify-center items-center gap-2">
                    <div className="w-full h-auto flex flex-col justify-center items-center gap-5">
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
            <div className={`w-full h-auto mb-5 text-center text-3xl text-white opacity-20`}>
                © Global Brother Associates 2025. All rights reserved
            </div>
        </div>
    )
}