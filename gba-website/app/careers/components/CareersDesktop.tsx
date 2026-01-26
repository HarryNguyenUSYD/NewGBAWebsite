"use client";

import { fetchCareers, fetchImageOrFile } from "@/backend/fetchFunctions";
import { CareersTableType, CareerTableType } from "@/backend/tables";
import { titleFont } from "@/global/fonts/fonts";
import { useLanguage } from "@/global/LanguageContext/LanguageContext";
import SiteWrapper from "@/global/SiteWrapper/SiteWrapperDesktop";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FiPhone, FiFileText } from "react-icons/fi";
import { HiOutlineMail, HiOutlineDownload } from "react-icons/hi";

export default function Careers() {
    const [careers, setCareers] = useState<CareersTableType | null>(null);

    useEffect(() => {
        fetchCareers()
            .then(setCareers)
            .catch(console.error)
    }, []);

    return (
        <SiteWrapper topMargin={true}>
            <TitleSection />
            <div className="flex flex-row justify-around items-start my-20 px-20">
                <div className="w-[70vw] flex flex-col justify-center items-center gap-5">
                    <ListSection careers={careers} />
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
                width={1620}
                height={1080}
                className="absolute w-full h-full object-cover brightness-30"
            />
            <div className="absolute w-auto h-auto bottom-0 right-0 m-20 flex flex-col justify-end items-end gap-10">
                <p className={`text-8xl ${titleFont.className}`}>
                    {languageContext?.language == "en" ? "Careers" : "Tuyển dụng"}
                </p>
                <p className="text-4xl">
                    {languageContext?.language == "en" ? "Join our team and grow our future" : "Đồng hành cùng chúng tôi và kiến tạo tương lai"}
                </p>
            </div>
        </div>
    )
}

const JobListing = ({ dir, career } : { dir: string, career: CareerTableType }) => {
    const languageContext = useLanguage();

    return (
        <div
            className="w-full h-[25vh] p-10 border-4 border-gray-700 flex flex-col
                justify-between items-center rounded-3xl text-black"
        >
            <p className="w-full text-5xl">{languageContext?.language == "en" ? career.nameEn : career.nameVi}</p>
            <div className="w-full flex flex-row justify-between items-center">
                <p className={`${career.status == "fulltime" && "bg-red-300"} ${career.status == "parttime" && "bg-yellow-300"}
                    ${career.status == "internship" && "bg-green-300"} whitespace-nowrap text-2xl rounded-full px-5 py-1 mr-5`}>
                        {career.status == "fulltime" && (languageContext?.language == "en" ? "Full-time" : "Toàn thời gian")}
                        {career.status == "parttime" && (languageContext?.language == "en" ? "Part-Time" : "Bán thời gian")}
                        {career.status == "internship" && (languageContext?.language == "en" ? "Internship" : "Tập sự")}
                </p>
                <div className="w-full flex flex-row justify-end items-center gap-5">
                    <Link
                        href={fetchImageOrFile(`${dir}${career.jobDescFileName}`)}
                        className="w-auto flex flex-row justify-start items-center gap-3 text-2xl
                            rounded-full bg-gray-200 px-5 py-1 hover:bg-red-500 hover:text-white duration-150"
                        target="_blank"
                    >
                        <FiFileText />
                        {languageContext?.language == "en" ? "View Job Description" : "Xem mô tả công việc"}
                    </Link>
                    <Link
                        download={true}
                        href={fetchImageOrFile(`${dir}${career.jobDescFileName}`)}
                        className="w-auto flex flex-row justify-start items-center gap-3 text-2xl
                            rounded-full bg-gray-200 px-5 py-1 hover:bg-red-500 hover:text-white duration-150"
                        target="_blank"
                    >
                        <HiOutlineDownload />
                        {languageContext?.language == "en" ? "Download Job Description" : "Tải mô tả công việc"}
                    </Link>
                </div>
            </div>
        </div>
    )
} 

const ListSection = ({ careers } : { careers: CareersTableType | null }) => {
    return (
        <div className="w-full h-auto px-10 flex flex-col justify-start items-center gap-10">
            {careers?.careers.map((c, k) => (
                <JobListing
                    key={`position_${k}`}
                    dir={careers.careerDir}
                    career={c}
                />
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