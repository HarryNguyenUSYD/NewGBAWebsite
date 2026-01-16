"use client";

import { titleFont } from "@/global/fonts/fonts";
import { useLanguage } from "@/global/LanguageContext/LanguageContext";
import SiteWrapper from "@/global/SiteWrapper/SiteWrapperDesktop";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import ProjectGallery from "./ProjectGalleryDesktop";
import { ProjectTableType } from "@/backend/tables";
import { fetchProjectImage, fetchProjects } from "@/backend/fetchFunctions";
import { typesOption } from "../../components/consts";

export default function Project({ slug } : { slug: string }) {
    const [project, setProject] = useState<ProjectTableType | null>(null);

    useEffect(() => {
        fetchProjects()
            .then((json) => (json.projects.find((p) => (p.id === slug)) ?? null))
            .then(setProject)
            .catch(console.error)
    }, [slug]);

    return (
        <SiteWrapper topMargin={true}>
            <TitleSection project={project} />
            <ListSection project={project} />
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
                width={4992}
                height={2995}
                className="absolute w-full h-full object-cover brightness-30"
            />
            <div className="absolute w-full h-full flex flex-col justify-center items-center gap-10 text-center">
                <p className={`text-5xl ${titleFont.className}`}>
                    {project?.name}
                </p>
                <div className="w-full h-auto flex flex-col justify-center items-center gap-3">
                    <p className="text-3xl">
                        <span className="font-bold">{languageContext?.language == "en" ? "Type: " : "Loại dự án: "}</span>
                        <span>
                            {
                                languageContext?.language == "en" ?
                                typesOption.find((p) => project?.projectType === p.value)?.labelEn :
                                typesOption.find((p) => project?.projectType === p.value)?.labelVi
                            }
                        </span>
                    </p>
                    <p className="text-3xl">
                        <span className="font-bold">{languageContext?.language == "en" ? "Address: " : "Địa chỉ: "}</span>
                        <span>{project?.siteAddress}</span>
                    </p>
                    <p className="text-3xl">
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
    const length = useMemo(() => project?.images.length ?? 0, [project]);

    return (
        <>
            {isShowingGallery && <ProjectGallery
                index={index}
                disableGallery={() => setIsShowingGallery(false)}
                project={project}
            />}
            <div className="w-full h-auto my-10 bg-white flex flex-row justify-center items-start gap-10">
                <div className="w-[40%] h-auto flex flex-col justify-start items-center gap-10">
                    {project?.images.slice(0, Math.ceil(length / 2)).map((image, i) => (
                        <button
                            key={`project_image_left_${i}`}
                            className="w-full h-auto p-2 border-4 border-black hover:border-red-500 duration-150 cursor-pointer"
                            onClick={() => {
                                setIsShowingGallery(!isShowingGallery)
                                setIndex(i);
                            }}
                        >
                            <Image
                                src={fetchProjectImage(`${project?.folderName}${image}`)}
                                width={4492}
                                height={2995}
                                alt="Project Image"
                                className="w-full h-full object-fill"
                            />
                        </button>
                    ))}
                </div>
                <div className="w-[40%] h-auto flex flex-col justify-start items-center gap-10">
                    {project?.images.slice(Math.ceil(length / 2)).map((image, i) => (
                        <button
                            key={`project_image_left_${i}`}
                            className="w-full h-auto p-2 border-4 border-black hover:border-red-500 duration-150 cursor-pointer"
                            onClick={() => {
                                setIsShowingGallery(!isShowingGallery)
                                setIndex(i + Math.ceil(length / 2));
                            }}
                        >
                            <Image
                                src={fetchProjectImage(`${project?.folderName}${image}`)}
                                width={4492}
                                height={2995}
                                alt="Project Image"
                                className="w-full h-full object-fill"
                            />
                        </button>
                    ))}
                </div>
            </div>
        </>
    )
}