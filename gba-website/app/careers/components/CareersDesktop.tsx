"use client";

import { Career } from "@/backend/tables";
import { titleFont } from "@/global/fonts/fonts";
import { useLanguage } from "@/global/LanguageContext/LanguageContext";
import SiteWrapper from "@/global/SiteWrapper/SiteWrapperDesktop";
import Image from "next/image";
import Link from "next/link";
import { FiPhone, FiFileText } from "react-icons/fi";
import { HiOutlineMail, HiOutlineDownload } from "react-icons/hi";

export default function Careers() {
    return (
        <SiteWrapper topMargin={true}>
            <TitleSection />
            <div className="flex flex-row justify-around items-start my-20 px-20">
                <div className="w-[70vw] flex flex-col justify-center items-center gap-5">
                    <ListSection />
                </div>
                <GuideSection />
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
                    {languageContext?.language == "en" ? "Careers" : "Tuyển dụng"}
                </p>
                <p className="text-4xl">
                    {languageContext?.language == "en" ? "-- insert slogan here --" : "-- insert slogan here --"}
                </p>
            </div>
        </div>
    )
}

const JobListing = ({ props } : { props: Career }) => {
    const languageContext = useLanguage();

    return (
        <div
            className="w-full h-[25vh] p-10 border-4 border-gray-700 flex flex-col
                justify-between items-center rounded-3xl text-black"
        >
            <p className="w-full text-5xl">{props.name}</p>
            <div className="w-full flex flex-row justify-between items-center">
                <p className={`${props.status == "fulltime" && "bg-red-300"} ${props.status == "parttime" && "bg-yellow-300"}
                    ${props.status == "internship" && "bg-green-300"} whitespace-nowrap text-2xl rounded-full px-5 py-1 mr-5`}>
                        {props.status == "fulltime" && (languageContext?.language == "en" ? "Full-time" : "Toàn thời gian")}
                        {props.status == "parttime" && (languageContext?.language == "en" ? "Part-Time" : "Toàn thời gian")}
                        {props.status == "internship" && (languageContext?.language == "en" ? "Internship" : "Tập sự")}
                </p>
                <div className="w-full flex flex-row justify-end items-center gap-5">
                    <Link
                        href={"/"}
                        className="w-auto flex flex-row justify-start items-center gap-3 text-2xl
                            rounded-full bg-gray-200 px-5 py-1 hover:bg-red-500 hover:text-white duration-150"
                    >
                        <FiFileText />
                        {languageContext?.language == "en" ? "View Job Description" : "Xem mô tả công việc"}
                    </Link>
                    <Link
                        download={true}
                        href={"/"}
                        className="w-auto flex flex-row justify-start items-center gap-3 text-2xl
                            rounded-full bg-gray-200 px-5 py-1 hover:bg-red-500 hover:text-white duration-150"
                    >
                        <HiOutlineDownload />
                        {languageContext?.language == "en" ? "Download Job Description" : "Tải mô tả công việc"}
                    </Link>
                </div>
            </div>
        </div>
    )
} 

const ListSection = () => {
    return (
        <div className="w-full h-auto px-10 flex flex-col justify-start items-center gap-10">
            {Array.from({ length: 10 }, (_, j) => j + 1).map((_, k) => (
                <JobListing key={`position_${k}`} props={{
                    name: `Position Name ${k}`,
                    jobDescFileName: "",
                    count: 1,
                    status: "internship"
                }} />
            ))}
        </div>
    )
}

const GuideSection = () => {
    const languageContext = useLanguage();

    return (
        <div
            className="w-[30vw] h-auto flex flex-col justify-start items-start gap-2 p-5
                border rounded-2xl border-gray-700 text-black text-4xl">
            <p>{languageContext?.language == "en" ? "Submit your CV to:" : "Gửi CV trực tiếp cho:"}</p>
            <div
                className="text-3xl flex flex-row justify-start items-start gap-3 text-black
                    hover:text-red-500 duration-150"
            >
                <HiOutlineMail />
                <p>binh@gba.vn</p>
            </div>
            <div
                className="text-3xl flex flex-row justify-start items-start gap-3 text-black
                    hover:text-red-500 duration-150"
            >
                <FiPhone />
                <p>+84 83843700</p>
            </div>
        </div>
    )
}