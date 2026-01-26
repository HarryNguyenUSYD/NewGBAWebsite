"use client";

import { fetchCareers, fetchImageOrFile } from "@/backend/fetchFunctions";
import { CareersTableType, CareerTableType } from "@/backend/tables";
import { titleFont } from "@/global/fonts/fonts";
import { useLanguage } from "@/global/LanguageContext/LanguageContext";
import SiteWrapper from "@/global/SiteWrapper/SiteWrapperMobile";
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
            <GuideSection />
            <ListSection careers={careers} />
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
                width={1620}
                height={1080}
                className="absolute w-full h-full object-cover brightness-30"
            />
            <div className="absolute w-auto h-auto bottom-0 right-0 m-5 flex flex-col justify-end items-end gap-5 text-right">
                <p className={`text-4xl ${titleFont.className}`}>
                    {languageContext?.language == "en" ? "Careers" : "Tuyển dụng"}
                </p>
                <p className="text-2xl">
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
            className="w-full h-[40vh] p-5 border-4 border-gray-700 flex flex-col
                justify-between items-center rounded-3xl text-black"
        >
            <p className="w-full text-3xl">{languageContext?.language == "en" ? career.nameEn : career.nameVi}</p>
            <div className="w-full flex flex-col justify-end items-start gap-3">
                <p className={`${career.status == "fulltime" && "bg-red-300"} ${career.status == "parttime" && "bg-yellow-300"}
                    ${career.status == "internship" && "bg-green-300"} text-lg rounded-full px-5 py-1`}>
                        {career.status == "fulltime" && (languageContext?.language == "en" ? "Full-time" : "Toàn thời gian")}
                        {career.status == "parttime" && (languageContext?.language == "en" ? "Part-Time" : "Bán thời gian")}
                        {career.status == "internship" && (languageContext?.language == "en" ? "Internship" : "Tập sự")}
                </p>
                <Link
                    href={fetchImageOrFile(`${dir}${career.jobDescFileName}`)}
                    className="w-auto flex flex-row justify-start items-center gap-3 text-lg
                        rounded-full bg-gray-200 px-5 py-1 hover:bg-red-500 hover:text-white duration-150"
                    target="_blank"
                >
                    <FiFileText />
                    {languageContext?.language == "en" ? "View Job Description" : "Xem mô tả công việc"}
                </Link>
                <Link
                    download={true}
                    href={fetchImageOrFile(`${dir}${career.jobDescFileName}`)}
                    className="w-auto flex flex-row justify-start items-center gap-3 text-lg
                        rounded-full bg-gray-200 px-5 py-1 hover:bg-red-500 hover:text-white duration-150"
                    target="_blank"
                >
                    <HiOutlineDownload />
                    {languageContext?.language == "en" ? "Download Job Description" : "Tải mô tả công việc"}
                </Link>
            </div>
        </div>
    )
} 

const ListSection = ({ careers } : { careers: CareersTableType | null }) => {
    return (
        <div className="w-full h-auto px-10 my-10 flex flex-col justify-start items-center gap-10">
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
            className="w-full h-auto flex flex-row justify-center items-center
                text-black text-2xl py-10"
        >
            <div 
                className="w-[80vw] h-full flex flex-col justify-start items-start gap-2
                    border rounded-2xl border-gray-700 p-5"
            >
                <p>{languageContext?.language == "en" ? "Submit your CV to:" : "Gửi CV trực tiếp cho:"}</p>
                <div
                    className="text-xl flex flex-row justify-start items-start gap-3 text-black
                        hover:text-red-500 duration-150"
                >
                    <HiOutlineMail />
                    <p>binh@gba.vn</p>
                </div>
                <div
                    className="text-xl flex flex-row justify-start items-start gap-3 text-black
                        hover:text-red-500 duration-150"
                >
                    <FiPhone />
                    <p>+84 83843700</p>
                </div>
            </div>
        </div>
    )
}