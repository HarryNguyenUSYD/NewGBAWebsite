"use client";

import { titleFont } from "@/global/fonts/fonts";
import { useLanguage } from "@/global/LanguageContext/LanguageContext";
import SiteWrapper from "@/global/SiteWrapper/SiteWrapperDesktop";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ImCheckboxUnchecked, ImCheckboxChecked } from "react-icons/im";
import { FaCaretDown, FaCheck } from "react-icons/fa";
import { ProjectPreview } from "./ProjectPreviewDesktop";
import PageSelection from "@/global/PageSelection/PageSelectionDesktop";
import { ProjectsTableType, ProjectTableType } from "@/backend/tables";
import { useSearchParams } from "next/navigation";
import { fetchProjects } from "@/backend/fetchFunctions";
import { ITEMS_PER_PAGE, ProjectSearchProps } from "./consts";
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
        <div className="relative w-full h-[60vh]">
            <Image
                src={"/test/diningbg.png"}
                alt="Title background"
                width={4992}
                height={2995}
                className="absolute w-full h-full object-cover brightness-30"
            />
            <div className="absolute w-[60%] h-auto bottom-0 right-0 m-20 flex flex-col justify-end items-end gap-10 text-right">
                <p className={`text-8xl ${titleFont.className}`}>
                    {languageContext?.language == "en" ? "Projects" : "Dự án"}
                </p>
                <p className="text-4xl">
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

    const typesOption: { value: string, label: string }[] = [
        {
            value: "apartment",
            label: languageContext?.language == "en" ? "Apartment" : "Căn hộ",
        },
        {
            value: "bank",
            label: languageContext?.language == "en" ? "Bank" : "Ngân hàng",
        },
        {
            value: "consulate",
            label: languageContext?.language == "en" ? "Consulate" : "Lãnh sự quán",
        },
        {
            value: "education",
            label: languageContext?.language == "en" ? "Education" : "Giáo dục",
        },
        {
            value: "foodbeverage",
            label: languageContext?.language == "en" ? "Food & Beverage" : "Đồ ăn & thức uống",
        },
        {
            value: "hotelresort",
            label: languageContext?.language == "en" ? "Hotel & Resort" : "Khách sạn & Resort",
        },
        {
            value: "office",
            label: languageContext?.language == "en" ? "Office" : "Văn phòng",
        },
        {
            value: "shop",
            label: languageContext?.language == "en" ? "Shop" : "Cửa hàng",
        },
        {
            value: "showroom",
            label: languageContext?.language == "en" ? "Showroom" : "Phòng trưng bày",
        },
        {
            value: "others",
            label: languageContext?.language == "en" ? "Others" : "Khác",
        },
    ];

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
        <div className="relative w-full h-auto my-10 z-20">
            <form
                action=""
                className="flex flex-col justify-center items-center gap-5"
            >
                <input
                    type="text"
                    value={props.name}
                    placeholder={languageContext?.language == "en" ? "Search by name" : "Tìm theo tên"}
                    className="w-[50vw] h-10 outline-none border-2 border-black text-black placeholder:text-gray-300
                        p-5 rounded-full text-2xl"
                    onChange={(e) => (props.setName(e.currentTarget.value))}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            e.preventDefault();
                            props.handleSubmit();
                        }
                    }}
                />
                <div className="flex flex-row justify-center items-center gap-5">
                    {/* Select Project Types */}
                    <div className="relative w-auto h-auto flex flex-col justify-start items-center">
                        <button
                            onClick={() => setIsSelectingType(!isSelectingType)}
                            type="button"
                            className="w-full h-auto px-10 py-1 flex flex-row justify-center items-center gap-3
                                rounded-full bg-white border-2 border-black text-black cursor-pointer
                                hover:bg-gray-200 duration-150"
                        >
                            <p className="text-2xl">{languageContext?.language == "en" ? "Search by type" : "Tìm theo loại"}</p>
                            <FaCaretDown className="text-2xl" />
                        </button>
                        {isSelectingType && (
                            <div
                                className="absolute top-10 mt-2 w-full h-50 bg-white overflow-hidden border-2 border-black rounded-2xl"
                            >
                                <div className="w-full h-full overflow-y-auto scrollbar scrollbar-thumb-gray-700
                                    scrollbar-track-gray-200">
                                    <button
                                        type="button"
                                        className={`w-full px-3 cursor-pointer hover:bg-gray-200 text-black duration-100`}
                                        onClick={() => props.setExcludeTypes([])}
                                    >
                                        <span className="text-2xl whitespace-nowrap select-none">
                                            {languageContext?.language == "en" ? "Select All" : "Chọn tất cả"}
                                        </span>
                                    </button>
                                    <button
                                        type="button"
                                        className={`w-full px-3 cursor-pointer hover:bg-gray-200 text-black duration-100`}
                                        onClick={() => props.setExcludeTypes(typesOption.map((opt) => opt.value))}
                                    >
                                        <span className="text-2xl whitespace-nowrap select-none">
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
                                            <span className="text-2xl whitespace-nowrap select-none">{opt.label}</span>
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
                                hover:bg-gray-200 duration-150"
                        >
                            <p className="text-2xl">{languageContext?.language == "en" ? "Order by" : "Sắp xếp theo"}</p>
                            <FaCaretDown className="text-2xl" />
                        </button>
                        {isSelectingOrder && (
                            <div
                                className="absolute top-10 mt-2 w-full h-auto bg-white overflow-hidden border-2 border-black rounded-2xl"
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
                                            <span className="text-2xl whitespace-nowrap select-none">
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
                            bg-gray-700 text-white hover:bg-red-500 duration-100 text-3xl`}
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
                <ProjectPreview key={i} project={p} isEven={i % 2 == 0} />
            ))}
        </div>
    )
}