"use client";

import { navFont, titleFont } from "@/global/fonts/fonts";
import { useLanguage } from "@/global/LanguageContext/LanguageContext";
import SiteWrapper from "@/global/SiteWrapper/SiteWrapperDesktop";
import Image from "next/image";
import { useState } from "react";
import { ImCheckboxUnchecked, ImCheckboxChecked } from "react-icons/im";
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardDoubleArrowLeft, MdOutlineKeyboardArrowRight, MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import { FaCaretDown, FaCheck } from "react-icons/fa";
import { IconType } from "react-icons";
import { ProjectPreview } from "./ProjectPreviewDesktop";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Projects() {
    return (
        <SiteWrapper topMargin={true}>
            <TitleSection />
            <SearchSection />
            <PageSection currentValue={1} maxValue={10} />
            <ListSection />
            <PageSection currentValue={1} maxValue={10} />
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
                    {languageContext?.language == "en" ? "Projects" : "Dự án"}
                </p>
                <p className="text-4xl">
                    {languageContext?.language == "en" ? "-- insert slogan here --" : "-- insert slogan here --"}
                </p>
            </div>
        </div>
    )
}

const SearchSection = () => {
    const languageContext = useLanguage();
    const [isSelectingType, setIsSelectingType] = useState(false);
    const [isSelectingOrder, setIsSelectingOrder] = useState(false);
    const [selected, setSelected] = useState<string[]>([]);
    const [order, setOrder] = useState<string>("newest");

    const onChange = (name: string) => {
        if (selected.includes(name)) {
            setSelected((prev) => (prev.filter((ele) => (ele != name))));
        } else {
            setSelected((prev) => [...prev, name]);
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
                    placeholder={languageContext?.language == "en" ? "Search by name" : "Tìm theo tên"}
                    className="w-[50vw] h-10 outline-none border-2 border-black text-black placeholder:text-gray-300
                        p-5 rounded-full text-2xl"
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
                                        onClick={() => setSelected(typesOption.map((opt) => opt.value))}
                                    >
                                        <span className="text-2xl whitespace-nowrap select-none">
                                            {languageContext?.language == "en" ? "Select All" : "Chọn tất cả"}
                                        </span>
                                    </button>
                                    <button
                                        type="button"
                                        className={`w-full px-3 cursor-pointer hover:bg-gray-200 text-black duration-100`}
                                        onClick={() => setSelected([])}
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
                                                checked={selected.includes(opt.value)}
                                                onChange={() => onChange(opt.value)}
                                            />
                                            <div className="size-5">
                                                {selected.includes(opt.value) && <ImCheckboxChecked className="w-full h-full"/>}
                                                {!selected.includes(opt.value) && <ImCheckboxUnchecked className="w-full h-full"/>}
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
                                        value={order}
                                    />
                                    {orderOption.map((opt) => (
                                        <button
                                            type="button"
                                            key={opt.value}
                                            className={`w-full px-3 cursor-pointer hover:bg-gray-200 text-black duration-100
                                                flex flex-row justify-between items-center`}
                                            onClick={() => setOrder(opt.value)}
                                        >
                                            <FaCheck
                                                className={`text-xl`}
                                                style={{ opacity: (order == opt.value) ? 100 : 0 }}
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
                    />
                </div>
            </form>
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

const ListSection = () => {
    return (
        <div className="w-full h-auto mb-10 bg-white flex flex-col justify-start items-center gap-10">
            {Array.from({ length: 9 }, (_, i) => i + 1).map((_, i) => (
                <ProjectPreview key={i} project={null} isLeft={i % 2 == 0} />
            ))}
        </div>
    )
}