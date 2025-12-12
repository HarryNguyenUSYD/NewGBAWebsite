"use client";

import { titleFont } from "@/global/fonts/fonts";
import { useLanguage } from "@/global/LanguageContext/LanguageContext";
import SiteWrapper from "@/global/SiteWrapper/SiteWrapperDesktop";
import Image from "next/image";
import { useState } from "react";
import ProjectGallery from "./ProjectGalleryDesktop";

export default function Project() {
    return (
        <SiteWrapper topMargin={true}>
            <TitleSection />
            <ListSection />
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
            <div className="absolute w-full h-full flex flex-col justify-center items-center gap-10 text-center">
                <p className={`text-5xl ${titleFont.className}`}>
                    Project Name Placeholder
                </p>
                <div className="w-full h-auto flex flex-col justify-center items-center gap-3">
                    <p className="text-3xl">
                        <span className="font-bold">{languageContext?.language == "en" ? "Type: " : "Loại dự án: "}</span>
                        <span>Education</span>
                    </p>
                    <p className="text-3xl">
                        <span className="font-bold">{languageContext?.language == "en" ? "Address: " : "Địa chỉ: "}</span>
                        <span>Project Title Number 1</span>
                    </p>
                    <p className="text-3xl">
                        <span className="font-bold">{languageContext?.language == "en" ? "Completion Date: " : "Ngày hoàn thành: "}</span>
                        <span>01/01/2000</span>
                    </p>
                </div>
            </div>
        </div>
    )
}

const ListSection = () => {
    const [isShowingGallery, setIsShowingGallery] = useState(false);
    const [index, setIndex] = useState(0);
    const [maxIndex, setMaxIndex] = useState(15);

    return (
        <>
            {isShowingGallery && <ProjectGallery index={index} maxIndex={maxIndex} disableGallery={() => setIsShowingGallery(false)} />}
            <div className="w-full h-auto my-10 bg-white flex flex-row justify-center items-start gap-10">
                <div className="w-[40%] h-auto flex flex-col justify-start items-center gap-10">
                    {Array.from({ length: Math.floor(maxIndex / 2) }, (_, i) => i + 1).map((_, i) => (
                        <button
                            key={`project_image_left_${i}`}
                            className="w-full h-auto p-2 border-4 border-black hover:border-red-500 duration-150 cursor-pointer"
                            onClick={() => {
                                setIsShowingGallery(!isShowingGallery)
                                setIndex(i);
                            }}
                        >
                            <Image
                                src={"/test/diningbg.png"}
                                width={4492}
                                height={2995}
                                alt="Project Image"
                                className="w-full h-full object-fill"
                            />
                        </button>
                    ))}
                </div>
                <div className="w-[40%] h-auto flex flex-col justify-start items-center gap-10">
                    {Array.from({ length: Math.ceil(maxIndex / 2) }, (_, i) => i + 1).map((_, i) => (
                        <button
                            key={`project_image_left_${i}`}
                            className="w-full h-auto p-2 border-4 border-black hover:border-red-500 duration-150 cursor-pointer"
                            onClick={() => {
                                setIsShowingGallery(!isShowingGallery)
                                setIndex(i + Math.floor(maxIndex / 2));
                            }}
                        >
                            {
                                i % 2 == 0 ? (
                                    <Image
                                        src={"/test/diningbg.png"}
                                        width={4492}
                                        height={2995}
                                        alt="Project Image"
                                        className="w-full h-full object-fill"
                                    />
                                ) : (
                                    <Image
                                        src={"/test/louisbg.png"}
                                        width={938}
                                        height={1440}
                                        alt="Project Image"
                                        className="w-full h-full object-fill"
                                    />
                                )
                            }
                        </button>
                    ))}
                </div>
            </div>
        </>
    )
}