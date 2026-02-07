"use client";

import { titleFont } from "@/global/fonts/fonts";
import { useLanguage } from "@/global/LanguageContext/LanguageContext";
import SiteWrapper from "@/global/SiteWrapper/SiteWrapperDesktop";
import Image from "next/image";
import PageSelection from "@/global/PageSelection/PageSelectionDesktop";
import { TbCircleDotted } from "react-icons/tb";
import { fetchClients, fetchImageOrFile } from "@/backend/fetchFunctions";
import { useEffect, useState } from "react";
import { ClientsTableType } from "@/backend/tables";
import { ClientsSearchProps, ITEMS_PER_PAGE } from "./consts";
import { useRouter, useSearchParams } from "next/navigation";
import { FaCaretDown, FaCheck } from "react-icons/fa";

export default function Clients() {
    const languageContext = useLanguage();
    const router = useRouter();
    const searchParams = useSearchParams();
    
    const [clients, setClients] = useState<ClientsTableType | null>(null);

    const [page, setPage] = useState(parseInt(searchParams.get("page") ?? "1"));
    const [name, setName] = useState(searchParams.get("name") ?? "");
    const [order, setOrder] = useState(searchParams.get("order") ?? "az");
    const [finalClients, setFinalClients] = useState<ClientsTableType>([]);
    
    const handleSubmit = () => {
        const sp = new URLSearchParams(searchParams.toString());
        sp.delete("name");
        sp.delete("order");

        sp.set("name", name);
        sp.set("order", order);

        router.push(`/clients?${sp.toString()}`);

        setFinalClients(clients?.filter((c) => {
            if (name != "" && !c[languageContext?.language ?? "en"].toLowerCase().includes(name.toLowerCase())) { return false; }

            return true;
        }).sort((p1, p2) => {
            switch (order) {
                case "za":
                    return p2.en.localeCompare(p1.en);
                case "az":
                default:
                    return p1.en.localeCompare(p2.en);
            }
        }) ?? []);
    }

    useEffect(() => {
        fetchClients()
            .then(setClients)
            .catch(console.error)
    }, []);

    useEffect(() => {
        handleSubmit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [clients]);
    
    return (
        <SiteWrapper topMargin={true}>
            <TitleSection />
            <SearchSection props={{
                name,
                setName,
                order,
                setOrder,
                handleSubmit
            }} />
            <PageSelection props={{
                page,
                setPage,
                maxPage: Math.ceil((finalClients?.length ?? 1) / ITEMS_PER_PAGE),
                title: "clients"
            }}>
                <ListSection page={page} clients={finalClients} />
            </PageSelection>
        </SiteWrapper>
    );
}

const TitleSection = () => {
    const languageContext = useLanguage();

    return (
        <div className="relative w-full h-[60vh]">
            <Image
                src={"/backgrounds/bg-3.jpg"}
                alt="Title background"
                width={1620}
                height={1080}
                className="absolute w-full h-full object-cover brightness-30"
            />
            <div className="absolute w-auto h-auto bottom-0 right-0 m-20 flex flex-col justify-end items-end gap-10 text-right">
                <p className={`text-8xl ${titleFont.className}`}>
                    {languageContext?.language == "en" ? "Clients" : "Khách hàng"}
                </p>
                <p className="text-4xl">
                    {languageContext?.language == "en" ? "Strong partnerships built on trust, quality, and results" : "Quan hệ đối tác bền vững được xây dựng trên niềm tin, chất lượng và hiệu quả"}
                </p>
            </div>
        </div>
    )
}

const SearchSection = ({ props } : { props: ClientsSearchProps }) => {
    const languageContext = useLanguage();
    const [isSelectingOrder, setIsSelectingOrder] = useState(false);

    const orderOption: { value: string, label: string }[] = [
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

const ListSection = ({ clients, page } : { clients: ClientsTableType | null, page: number }) => {
    const languageContext = useLanguage();

    return (
        <div className="w-full h-auto mb-10 flex flex-col justify-center items-center">
            <div className="w-[66vw] h-auto bg-white flex flex-col justify-start items-center gap-20">
                {clients?.slice((page - 1) * ITEMS_PER_PAGE, (page - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE).map((client, i) => (
                    <div
                        key={`client_${i}`}
                        className="relative w-full h-[40vh] flex flex-row justify-center items-center gap-10"
                    >
                        {(i % 2 == 1) && <div className={`w-1/2 h-[80%] p-10 flex flex-col justify-center items-start gap-2
                            bg-gray-700`}>
                            <p className="w-full text-center text-3xl text-white">{languageContext?.language == "en" ? client.en : client.vi}</p>
                            <p className="text-white text-2xl">
                                {languageContext?.language == "en" ? "Completed Projects:" : "Dự án hoàn thành:"}
                            </p>
                            {client.projects.slice(0, 3).map((name, k) => (
                                <div
                                    className="w-full flex flex-row justify-start items-center gap-2 text-2xl group"
                                    key={`client_${i}_${k}`}
                                >
                                    <TbCircleDotted className="group-hover:scale-120 group-hover:rotate-45 duration-100" />
                                    <p>{name}</p>
                                </div>
                            ))}
                        </div>}
                        <div className="relative w-1/2 h-full bg-white flex flex-col justify-center items-center gap-2">
                            <Image
                                src={"/border-decor.png"}
                                className="w-full h-auto grayscale-100 scale-y-[-1]"
                                width={829}
                                height={71}
                                alt="Decorative Border"
                            />
                            <div className="border border-black w-full h-[80%] p-5">
                                <Image
                                    src={fetchImageOrFile(`Clients/${client.icon}`)}
                                    width={2560}
                                    height={1040}
                                    alt="Client Logo"
                                    className="w-full h-full object-contain"
                                />
                            </div>
                            <Image
                                src={"/border-decor.png"}
                                className="w-full h-auto grayscale-100"
                                width={829}
                                height={71}
                                alt="Decorative Border"
                            />
                        </div>
                        {(i % 2 == 0) && <div className={`w-1/2 h-[80%] p-10 flex flex-col justify-center items-start gap-2
                            bg-red-500`}>
                            <p className="w-full text-center text-3xl text-white">{languageContext?.language == "en" ? client.en : client.vi}</p>
                            <p className="text-white text-2xl">
                                {languageContext?.language == "en" ? "Completed Projects:" : "Dự án hoàn thành:"}
                            </p>
                            {client.projects.slice(0, 3).map((name, k) => (
                                <div
                                    className="w-full flex flex-row justify-start items-center gap-2 text-2xl group"
                                    key={`client_${i}_${k}`}
                                >
                                    <TbCircleDotted className="group-hover:scale-120 group-hover:rotate-45 duration-100" />
                                    <p>{name}</p>
                                </div>
                            ))}
                        </div>}
                    </div>
                ))}
            </div>
        </div>
    )
}