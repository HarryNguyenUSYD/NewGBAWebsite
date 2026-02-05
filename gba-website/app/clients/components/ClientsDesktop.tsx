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
import { ITEMS_PER_PAGE } from "./consts";
import { useSearchParams } from "next/navigation";

export default function Clients() {
    const searchParams = useSearchParams();
    
    const [clients, setClients] = useState<ClientsTableType | null>(null);
    const [page, setPage] = useState(parseInt(searchParams.get("page") ?? "1"));

    useEffect(() => {
        fetchClients()
            .then(setClients)
            .catch(console.error)
    }, []);
    
    return (
        <SiteWrapper topMargin={true}>
            <TitleSection />
            <PageSelection props={{
                page,
                setPage,
                maxPage: Math.ceil((clients?.length ?? 1) / ITEMS_PER_PAGE),
                title: "clients"
            }}>
                <ListSection page={page} clients={clients} />
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