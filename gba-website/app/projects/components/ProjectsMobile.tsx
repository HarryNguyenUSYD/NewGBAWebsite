"use client";

import { titleFont } from "@/global/fonts/fonts";
import { useLanguage } from "@/global/LanguageContext/LanguageContext";
import SiteWrapper from "@/global/SiteWrapper/SiteWrapperMobile";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ImCheckboxUnchecked, ImCheckboxChecked } from "react-icons/im";
import { FaCaretDown, FaCheck } from "react-icons/fa";
import { ProjectPreview } from "./ProjectPreviewMobile";
import PageSelection from "@/global/PageSelection/PageSelectionMobile";
import { ProjectsTableType, ProjectTableType } from "@/backend/tables";
import { useSearchParams } from "next/navigation";
import { fetchProjects } from "@/backend/fetchFunctions";
import { ITEMS_PER_PAGE, ProjectSearchProps, typesOption } from "./consts";
import { useRouter } from "next/navigation";

export default function Projects() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [projects, setProjects] = useState<ProjectsTableType | null>(null);
    const [page, setPage] = useState(parseInt(searchParams.get("page") ?? "1"));
    const [name, setName] = useState(searchParams.get("name") ?? "");
    const [order, setOrder] = useState(searchParams.get("order") ?? "newest");
    const [excludeTypes, setExcludeTypes] = useState<string[]>(searchParams.getAll("exclude"));
    const [finalProjects, setFinalProjects] = useState<ProjectTableType[]>([]);

    const handleSubmit = () => {
        const sp = new URLSearchParams(searchParams.toString());
        sp.delete("name");
        sp.delete("order");
        sp.delete("exclude");

        sp.set("name", name);
        sp.set("order", order);

        excludeTypes.forEach((t) => sp.append("exclude", t));

        router.push(`/projects?${sp.toString()}`);

        console.log(projects?.projects);

        setFinalProjects(projects?.projects.filter((p) => {
            if (name != "" && !p.name.toLowerCase().includes(name.toLowerCase())) { return false; }
            if (excludeTypes.includes(p.projectType)) { return false; }

            return true;
        }).sort((p1, p2) => {
            switch (order) {
                case "az":
                    return p1.name.localeCompare(p2.name);
                case "za":
                    return p2.name.localeCompare(p1.name);
                case "oldest":
                    return sortByDate(p1, p2, true) ? 1 : -1;
                case "newest":
                default:
                    return sortByDate(p1, p2, false) ? 1 : -1;
            }
        }) ?? []);
    }

    const sortByDate = (p1: ProjectTableType, p2: ProjectTableType, reverse: boolean) => {
        if (p1.endDate == "-" && p2.endDate != "-") {
            return true;
        } else if (p1.endDate != "-" && p2.endDate == "-") {
            return false;
        } else if (p1.endDate == "-" && p2.endDate == "-") {
            return true;
        }

        return reverse ? (parseEndDate(p1.endDate) >= parseEndDate(p2.endDate)) : (parseEndDate(p1.endDate) < parseEndDate(p2.endDate))
    }

    const parseEndDate = (endDate: string) => {
        const [monthStr, yearStr] = endDate.split("-");
        const year = 2000 + Number(yearStr); // assumes 2000–2099
        const month = new Date(`${monthStr} 1`).getMonth(); // 0-based
        return new Date(year, month, 1);
    }

    useEffect(() => {
        fetchProjects()
            .then(setProjects)
            .catch(console.error)
    }, []);

    useEffect(() => {
        handleSubmit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [projects]);

    return (
        <SiteWrapper topMargin={true}>
            <TitleSection />
            <SearchSection props={{
                name,
                setName,
                order,
                setOrder,
                excludeTypes,
                setExcludeTypes,
                handleSubmit
            }} />
            <PageSelection props={{
                page,
                setPage,
                maxPage: Math.ceil((finalProjects.length ?? 1) / ITEMS_PER_PAGE),
                title: "projects"
            }}>
                <ListSection projects={finalProjects} page={page} />
            </PageSelection>
        </SiteWrapper>
    );
}

const TitleSection = () => {
    const languageContext = useLanguage();

    return (
        <div className="relative w-full h-[50vh]">
            <Image
                src={"/backgrounds/bg-2.jpg"}
                alt="Title background"
                width={1620}
                height={1080}
                className="absolute w-full h-full object-cover brightness-30"
            />
            <div className="absolute w-[60%] h-auto bottom-0 right-0 m-5 flex flex-col justify-end items-end gap-5 text-right">
                <p className={`text-4xl ${titleFont.className}`}>
                    {languageContext?.language == "en" ? "Projects" : "Dự án"}
                </p>
                <p className="text-2xl">
                    {languageContext?.language == "en" ? "Built on experience, proven through every project." : "Xây dựng từ kinh nghiệm, khẳng định qua từng dự án."}
                </p>
            </div>
        </div>
    )
}

const SearchSection = ({ props } : { props: ProjectSearchProps }) => {
    const languageContext = useLanguage();
    const [isSelectingType, setIsSelectingType] = useState(false);
    const [isSelectingOrder, setIsSelectingOrder] = useState(false);

    const onChange = (name: string) => {
        if (props.excludeTypes.includes(name)) {
            props.setExcludeTypes((prev) => (prev.filter((ele) => (ele != name))));
        } else {
            props.setExcludeTypes((prev) => [...prev, name]);
        }
    }

    const orderOption: { value: string, label: string }[] = [
        {
            value: "newest",
            label: languageContext?.language == "en" ? "Newest" : "Mới nhất",
        },
        {
            value: "oldest",
            label: languageContext?.language == "en" ? "Oldest" : "Cũ nhất",
        },
        {
            value: "az",
            label: languageContext?.language == "en" ? "Name (A - Z)" : "Tên (A - Z)",
        },
        {
            value: "za",
            label: languageContext?.language == "en" ? "Name (Z - A)" : "Tên (Z - A)",
        },
    ];

    return (
        <div className="relative w-full h-auto my-5 z-20">
            <form
                action=""
                className="flex flex-col justify-center items-center gap-3"
            >
                <input
                    type="text"
                    placeholder={languageContext?.language == "en" ? "Search by name" : "Tìm theo tên"}
                    className="w-[75vw] h-10 outline-none border-2 border-black text-black placeholder:text-gray-300
                        p-5 rounded-full text-xl z-5"
                    onChange={(e) => (props.setName(e.currentTarget.value))}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            e.preventDefault();
                            props.handleSubmit();
                        }
                    }}
                />
                <div className="flex flex-col justify-center items-center gap-3">
                    {/* Select Project Types */}
                    <div className="relative w-auto h-auto flex flex-col justify-start items-center">
                        <button
                            onClick={() => setIsSelectingType(!isSelectingType)}
                            type="button"
                            className="w-full h-auto px-10 py-1 flex flex-row justify-center items-center gap-3
                                rounded-full bg-white border-2 border-black text-black cursor-pointer z-4"
                        >
                            <p className="text-xl">{languageContext?.language == "en" ? "Search by type" : "Tìm theo loại"}</p>
                            <FaCaretDown className="text-xl" />
                        </button>
                        {isSelectingType && (
                            <div
                                className="absolute top-10 mt-2 w-full h-50 bg-white overflow-hidden border-2
                                    border-black rounded-2xl z-3"
                            >
                                <div className="w-full h-full overflow-y-auto scrollbar scrollbar-thumb-gray-700
                                    scrollbar-track-gray-200">
                                    <button
                                        type="button"
                                        className={`w-full px-3 cursor-pointer text-black`}
                                        onClick={() => props.setExcludeTypes([])}
                                    >
                                        <span className="text-xl whitespace-nowrap select-none">
                                            {languageContext?.language == "en" ? "Select All" : "Chọn tất cả"}
                                        </span>
                                    </button>
                                    <button
                                        type="button"
                                        className={`w-full px-3 cursor-pointer text-black`}
                                        onClick={() => props.setExcludeTypes(typesOption.map((opt) => opt.value))}
                                    >
                                        <span className="text-xl whitespace-nowrap select-none">
                                            {languageContext?.language == "en" ? "Deselect All" : "Huỷ chọn tất cả"}
                                        </span>
                                    </button>
                                    <div className="w-full border border-black opacity-50 mt-1 mb-2"></div>
                                    {typesOption.map((opt) => (
                                        <label
                                            key={`option_${opt.value}`}
                                            className={`flex flex-row px-3 justify-between items-center gap-3 cursor-pointer
                                                hover:bg-gray-200 text-black duration-100`}
                                        >
                                            <input
                                                type="checkbox"
                                                name={opt.value}
                                                id={opt.value}
                                                className="sr-only"
                                                checked={!props.excludeTypes.includes(opt.value)}
                                                onChange={() => onChange(opt.value)}
                                            />
                                            <div className="size-5">
                                                {!props.excludeTypes.includes(opt.value) && <ImCheckboxChecked className="w-full h-full"/>}
                                                {props.excludeTypes.includes(opt.value) && <ImCheckboxUnchecked className="w-full h-full"/>}
                                            </div>
                                            <span className="text-xl whitespace-nowrap select-none">
                                                {languageContext?.language == "en" ? opt.labelEn : opt.labelVi}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                    {/* Sort Projects Order */}
                    <div className="relative w-auto h-auto flex flex-col justify-start items-center">
                        <button
                            onClick={() => setIsSelectingOrder(!isSelectingOrder)}
                            type="button"
                            className="w-full h-auto px-10 py-1 flex flex-row justify-center items-center gap-3
                                rounded-full bg-white border-2 border-black text-black cursor-pointer
                                hover:bg-gray-200 duration-150 z-2"
                        >
                            <p className="text-xl">{languageContext?.language == "en" ? "Order by" : "Sắp xếp theo"}</p>
                            <FaCaretDown className="text-xl" />
                        </button>
                        {isSelectingOrder && (
                            <div
                                className="absolute top-10 mt-2 w-full h-auto bg-white overflow-hidden border-2
                                    border-black rounded-2xl z-1"
                            >
                                <div
                                    className="w-full h-full overflow-y-auto scrollbar scrollbar-thumb-gray-700
                                        scrollbar-track-gray-200"
                                >
                                    <input
                                        type="hidden"
                                        name="order"
                                        value={props.order}
                                    />
                                    {orderOption.map((opt) => (
                                        <button
                                            type="button"
                                            key={opt.value}
                                            className={`w-full px-3 cursor-pointer hover:bg-gray-200 text-black duration-100
                                                flex flex-row justify-between items-center`}
                                            onClick={() => props.setOrder(opt.value)}
                                        >
                                            <FaCheck
                                                className={`text-xl`}
                                                style={{ opacity: (props.order == opt.value) ? 100 : 0 }}
                                            />
                                            <span className="text-xl whitespace-nowrap select-none">
                                                {opt.label}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                    {/* Submit Button */}
                    <input
                        type="submit"
                        value="Submit"
                        className={`w-auto h-auto px-5 py-1 rounded-full flex flex-row justify-center items-center gap-3 cursor-pointer
                            bg-gray-700 text-white hover:bg-red-500 duration-100 text-2xl z-0`}
                        onClick={(e) => {
                            e.preventDefault();
                            props.handleSubmit();
                        }}
                    />
                </div>
            </form>
        </div>
    )
}

const ListSection = ({ projects, page }: { projects: ProjectTableType[] | undefined, page: number }) => {
    return (
        <div className="w-full h-auto mb-10 bg-white flex flex-col justify-start items-center gap-10">
            {projects?.slice((page - 1) * ITEMS_PER_PAGE, (page - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE).map((p, i) => (
                <ProjectPreview key={i} project={p} />
            ))}
        </div>
    )
}