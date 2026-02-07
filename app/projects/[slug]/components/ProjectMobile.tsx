"use client";

import { titleFont } from "@/global/fonts/fonts";
import { useLanguage } from "@/global/LanguageContext/LanguageContext";
import SiteWrapper from "@/global/SiteWrapper/SiteWrapperMobile";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import ProjectGallery from "./ProjectGalleryMobile";
import { ProjectTableType } from "@/backend/tables";
import { fetchProjectImage, fetchProjects } from "@/backend/fetchFunctions";
import { typesOption } from "../../components/consts";
import Link from "next/link";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";

export default function Project({ slug } : { slug: string }) {
    const [prev, setPrev] = useState<ProjectTableType | null>(null);
    const [next, setNext] = useState<ProjectTableType | null>(null);
    const [project, setProject] = useState<ProjectTableType | null>(null);

    const parseEndDate = useCallback((endDate: string) => {
        const [monthStr, yearStr] = endDate.split("-");
        const year = 2000 + Number(yearStr); // assumes 2000–2099
        const month = new Date(`${monthStr} 1`).getMonth(); // 0-based
        return new Date(year, month, 1);
    }, []);

    const sortByDate = useCallback((p1: ProjectTableType, p2: ProjectTableType, reverse: boolean) => {
        if (p1.endDate == "-" && p2.endDate != "-") {
            return true;
        } else if (p1.endDate != "-" && p2.endDate == "-") {
            return false;
        } else if (p1.endDate == "-" && p2.endDate == "-") {
            return true;
        }

        return reverse ? (parseEndDate(p1.endDate) >= parseEndDate(p2.endDate)) : (parseEndDate(p1.endDate) < parseEndDate(p2.endDate))
    }, [parseEndDate]);

    useEffect(() => {
        fetchProjects()
            .then((json) => {
                const projects = json.projects.sort((p1, p2) => { return sortByDate(p1, p2, false) ? 1 : -1; });
                const i = projects.findIndex((p) => (p.id === slug)) ?? -1;
                
                setProject((i === -1) ? null : projects[i]);
                setPrev((i - 1 < 0) ? null : projects[i - 1]);
                setNext((i + 1 >= projects.length) ? null : projects[i + 1]);
            })
            .catch(console.error)
    }, [slug, sortByDate]);

    return (
        <SiteWrapper topMargin={true}>
            <TitleSection project={project} />
            <ListSection project={project} />
            <NavSection prev={prev} next={next} />
        </SiteWrapper>
    );
}

const TitleSection = ({ project } : { project: ProjectTableType | null }) => {
    const languageContext = useLanguage();

    return (
        <div className="relative w-full h-[60vh]">
            <Image
                src={fetchProjectImage(`${project?.folderName}${project?.coverImage}`)}
                alt="Title background"
                width={1620}
                height={1080}
                className="absolute w-full h-full object-cover brightness-30"
            />
            <div className="absolute w-full h-full flex flex-col justify-center items-center gap-10 text-center">
                <p className={`text-3xl ${titleFont.className}`}>
                    {project?.name}
                </p>
                <div className="w-full h-auto flex flex-col justify-center items-center gap-3">
                    <p className="text-xl">
                        <span className="font-bold">{languageContext?.language == "en" ? "Type: " : "Loại dự án: "}</span>
                        <span>
                            {
                                languageContext?.language == "en" ?
                                typesOption.find((p) => project?.projectType === p.value)?.labelEn :
                                typesOption.find((p) => project?.projectType === p.value)?.labelVi
                            }
                        </span>
                    </p>
                    <p className="text-xl">
                        <span className="font-bold">{languageContext?.language == "en" ? "Address: " : "Địa chỉ: "}</span>
                        <span>{project?.siteAddress}</span>
                    </p>
                    <p className="text-xl">
                        <span className="font-bold">{languageContext?.language == "en" ? "Completion Date: " : "Ngày hoàn thành: "}</span>
                        <span>{project?.endDate}</span>
                    </p>
                </div>
            </div>
        </div>
    )
}

const ListSection = ({ project } : { project: ProjectTableType | null }) => {
    const [isShowingGallery, setIsShowingGallery] = useState(false);
    const [index, setIndex] = useState(0);

    return (
        <>
            {isShowingGallery && <ProjectGallery
                index={index}
                disableGallery={() => setIsShowingGallery(false)}
                project={project}
            />}
            <div className="w-full h-auto px-5 my-10 bg-white flex flex-col justify-center items-start gap-10">
                {project?.images.map((image, i) => (
                    <button
                        key={`project_image_left_${i}`}
                        className="w-full h-auto duration-150 cursor-pointer overflow-hidden shadow-lg/50 hover:scale-105"
                        onClick={() => {
                            setIsShowingGallery(!isShowingGallery)
                            setIndex(i);
                        }}
                    >
                        <Image
                            src={fetchProjectImage(`${project?.folderName}${image}`)}
                            width={1920}
                            height={1080}
                            alt="Project Image"
                            className="w-full h-full object-fill"
                        />
                    </button>
                ))}
            </div>
        </>
    )
}

const NavSection = ({ prev, next } : { prev: ProjectTableType | null, next: ProjectTableType | null }) => {
    const languageContext = useLanguage();

    return (
        <div className="w-full h-auto flex justify-center items-center mb-5">
            <div className="w-auto grid grid-cols-3 gap-5">
                <Link
                    href={`/projects/${prev?.id}`}
                    style={{ opacity: prev ? 1 : 0, pointerEvents: prev ? "auto" : "none" }}
                    className={`w-auto flex flex-row justify-end items-center gap-2 text-2xl text-black`}
                >
                    <FaAngleDoubleLeft />
                    <span>{languageContext?.language == "en" ? "Previous" : "Trước"}</span>
                </Link>
                <Link
                    href={`/projects`}
                    className={`w-auto px-3 py-1 flex flex-row justify-end items-center gap-3 text-2xl text-black
                        border-4 border-black rounded-xl text-center`}
                >
                    {languageContext?.language == "en" ? "Back to Projects" : "Quay về trang Dự Án"}
                </Link>
                <Link
                    href={`/projects/${next?.id}`}
                    style={{ opacity: next ? 1 : 0, pointerEvents: next ? "auto" : "none" }}
                    className="flex flex-row justify-start items-center gap-2 text-2xl text-black"
                >
                    <span>{languageContext?.language == "en" ? "Next" : "Sau"}</span>
                    <FaAngleDoubleRight />
                </Link>
            </div>
        </div>
    )
}