"use client";

import { navFont, titleFont } from "@/global/fonts/fonts";
import { useLanguage } from "@/global/LanguageContext/LanguageContext";
import SiteWrapper from "@/global/SiteWrapper/SiteWrapperDesktop";
import Image from "next/image";
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardDoubleArrowLeft, MdOutlineKeyboardArrowRight, MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import { IconType } from "react-icons";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaFacebook, FaLinkedin } from "react-icons/fa";

export default function Articles() {
    return (
        <SiteWrapper topMargin={true}>
            <TitleSection />
            <div className="flex flex-row justify-around items-start mt-20 px-20">
                <div className="w-[70vw] flex flex-col justify-center items-center gap-5">
                    <PageSection currentValue={1} maxValue={10} />
                    <ListSection />
                    <PageSection currentValue={1} maxValue={10} />
                </div>
                <LinksSection />
            </div>
        </SiteWrapper>
    );
}

const TitleSection = () => {
    const languageContext = useLanguage();

    return (
        <div className="relative w-full h-[60vh]">
            <Image
                src={"/test/diningbg.png"}
                alt="Title background"
                width={4992}
                height={2995}
                className="absolute w-full h-full object-cover brightness-30"
            />
            <div className="absolute w-auto h-auto bottom-0 right-0 m-20 flex flex-col justify-end items-end gap-10">
                <p className={`text-8xl ${titleFont.className}`}>
                    {languageContext?.language == "en" ? "Articles" : "Bài báo"}
                </p>
                <p className="text-4xl">
                    {languageContext?.language == "en" ? "-- insert slogan here --" : "-- insert slogan here --"}
                </p>
            </div>
        </div>
    )
}

const PageButton = ({ isCurrent, value } : { isCurrent?: boolean, value: number }) => {
    return (
        <Link
            href={"/"}
            className={`size-12 rounded-full text-2xl flex justify-center items-center
                ${(isCurrent) ? "bg-red-500 text-white": "bg-gray-200 text-black hover:bg-red-500 hover:text-white"}
                duration-100 ${navFont.className}`}
        >
            {value}
        </Link>
    )
}

const MoveButton = ({ Icon, direction } : { Icon: IconType, direction: number }) => {
    return (
        <motion.a
            href="/"
            whileHover={"hover"}
            className="relative size-10 rounded-full overflow-hidden
                bg-gray-200 text-black hover:bg-red-500 hover:text-white duration-100"
        >
            <motion.div
                className="absolute w-full h-full flex justify-center items-center"
                animate={{ x: 0 }}
                variants={{
                    hover: {
                        x: ["0", direction < 0 ? "-0.5rem" : "0.5rem", "0"],
                        transition: { duration: 0.5, ease: "easeInOut", repeat: Infinity }
                    }
                }}
            >
                <Icon className="text-2xl" />
            </motion.div>
        </motion.a>
    )
}

const PageSection = ({ currentValue, maxValue }: { currentValue: number, maxValue: number }) => {
    return (
        <div className="w-full h-auto mb-10 bg-white flex flex-row justify-center items-center gap-5">
            <MoveButton Icon={MdOutlineKeyboardDoubleArrowLeft} direction={-2} />
            <MoveButton Icon={MdOutlineKeyboardArrowLeft} direction={-1} />
            {currentValue - 3 >= 1 && <div className="text-2xl text-black">...</div>}
            {currentValue - 2 >= 1 && <PageButton value={currentValue - 2} />}
            {currentValue - 1 >= 1 && <PageButton value={currentValue - 1} />}
            <PageButton isCurrent value={currentValue} />
            {currentValue + 1 <= maxValue && <PageButton value={currentValue + 1} />}
            {currentValue + 2 <= maxValue && <PageButton value={currentValue + 2} />}
            {currentValue + 3 <= maxValue && <div className="text-2xl text-black">...</div>}
            <MoveButton Icon={MdOutlineKeyboardArrowRight} direction={1} />
            <MoveButton Icon={MdOutlineKeyboardDoubleArrowRight} direction={2} />
        </div>
    )
}

const Post = ({ src } : { src: string }) => {
    const extractIframeAttributes = (html: string) => {
        const get = (attr: string) => {
            const regex = new RegExp(`${attr}="([^"]+)"`);
            const match = html.match(regex);
            return match ? match[1] : "";
        };

        return {
            src: get("src"),
            height: get("height"),
            width: get("width"),
            title: get("title"),
        };
    }

    const attributes = extractIframeAttributes(src);

    return (
        <div className="w-[40vw] h-[110vh]">
            <iframe
                src={attributes.src}
                width={attributes.width}
                height={attributes.height}
                title={attributes.title}
                className="w-full h-full"
                allowFullScreen
            ></iframe>
        </div>
    );
}

const ListSection = () => {
    const htmlSrcs = [
        `<iframe src="https://www.linkedin.com/embed/feed/update/urn:li:share:7396767047617036288" height="984" width="504" frameborder="0" allowfullscreen="" title="Embedded post"></iframe>`,
        `<iframe src="https://www.linkedin.com/embed/feed/update/urn:li:share:7396767047617036288" height="984" width="504" frameborder="0" allowfullscreen="" title="Embedded post"></iframe>`,
        `<iframe src="https://www.linkedin.com/embed/feed/update/urn:li:share:7396767047617036288" height="984" width="504" frameborder="0" allowfullscreen="" title="Embedded post"></iframe>`,
        `<iframe src="https://www.linkedin.com/embed/feed/update/urn:li:share:7396767047617036288" height="984" width="504" frameborder="0" allowfullscreen="" title="Embedded post"></iframe>`,
        `<iframe src="https://www.linkedin.com/embed/feed/update/urn:li:share:7396767047617036288" height="984" width="504" frameborder="0" allowfullscreen="" title="Embedded post"></iframe>`,
    ]

    return (
        <div className="w-full h-auto mb-10 px-20 bg-white flex flex-col justify-start items-center gap-10">
            {htmlSrcs.map((src, i) => (<Post src={src} key={`article_${i}`} />))}
        </div>
    )
}

const LinksSection = () => {
    const languageContext = useLanguage();

    return (
        <div
            className="w-[30vw] h-auto flex flex-col justify-start items-start gap-2 p-5
                border rounded-2xl border-gray-700 text-black text-4xl">
            <p>{languageContext?.language == "en" ? "Follow us:" : "Theo dõi chúng tôi:"}</p>
            <Link
                href="https://www.facebook.com/gbavn"
                target="_blank"
                className="text-3xl flex flex-row justify-start items-start gap-3 text-black
                    hover:text-red-500 duration-150"
            >
                <FaFacebook />
                <p>Facebook</p>
            </Link>
            <Link
                href="https://www.linkedin.com/in/global-brother-associates-co-ltd-design-and-build-435446339/"
                target="_blank"
                className="text-3xl flex flex-row justify-start items-start gap-3 text-black
                    hover:text-red-500 duration-150"
            >
                <FaLinkedin />
                <p>LinkedIn</p>
            </Link>
        </div>
    )
}