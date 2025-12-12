"use client";

import { navFont, titleFont } from "@/global/fonts/fonts";
import { useLanguage } from "@/global/LanguageContext/LanguageContext";
import SiteWrapper from "@/global/SiteWrapper/SiteWrapperMobile";
import Image from "next/image";
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardDoubleArrowLeft, MdOutlineKeyboardArrowRight, MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import { IconType } from "react-icons";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Articles() {
    return (
        <SiteWrapper topMargin={true}>
            <TitleSection />
            <PageSection currentValue={1} maxValue={10} />
            <ListSection />
            <PageSection currentValue={1} maxValue={10} />
        </SiteWrapper>
    );
}

const TitleSection = () => {
    const languageContext = useLanguage();

    return (
        <div className="relative w-full h-[50vh]">
            <Image
                src={"/test/diningbg.png"}
                alt="Title background"
                width={4992}
                height={2995}
                className="absolute w-full h-full object-cover brightness-30"
            />
            <div className="absolute w-auto h-auto bottom-0 right-0 m-5 flex flex-col justify-end items-end gap-5">
                <p className={`text-4xl ${titleFont.className}`}>
                    {languageContext?.language == "en" ? "Articles" : "Bài báo"}
                </p>
                <p className="text-2xl">
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
            className={`size-8 rounded-full text-lg flex justify-center items-center
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
            className="relative size-6 rounded-full overflow-hidden
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
                <Icon className="text-lg" />
            </motion.div>
        </motion.a>
    )
}

const PageSection = ({ currentValue, maxValue }: { currentValue: number, maxValue: number }) => {
    return (
        <div className="w-full h-auto my-10 bg-white flex flex-row justify-center items-center gap-4">
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
        <div className="w-full h-[155vh]">
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
        <div className="w-full h-auto mb-5 px-5 bg-white flex flex-col justify-start items-center gap-10">
            {htmlSrcs.map((src, i) => (<Post src={src} key={`article_${i}`} />))}
        </div>
    )
}