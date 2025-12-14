"use client";

import { titleFont } from "@/global/fonts/fonts";
import { useLanguage } from "@/global/LanguageContext/LanguageContext";
import SiteWrapper from "@/global/SiteWrapper/SiteWrapperDesktop";
import Image from "next/image";
import Link from "next/link";
import { FaFacebook, FaLinkedin } from "react-icons/fa";
import { useEffect, useState } from "react";
import type { ArticlesType } from "@/backend/tables";
import { fetchArticles } from "@/backend/fetchFunctions";
import { useSearchParams } from "next/navigation";
import PageSelection from "@/global/PageSelection/PageSelectionDesktop";

const ITEMS_PER_PAGE = 3;

export default function Articles() {
    
    const searchParams = useSearchParams();

    const [articles, setArticles] = useState<ArticlesType | null>(null);
    const [page, setPage] = useState(parseInt(searchParams.get("page") ?? "1"));

    useEffect(() => {
        fetchArticles()
            .then(setArticles)
            .catch(console.error)
    }, []);

    return (
        <SiteWrapper topMargin={true}>
            <TitleSection />
            <div className="flex flex-row justify-around items-start mt-20 px-20">
                <div className="w-[70vw] flex flex-col justify-center items-center gap-5">
                    <PageSelection
                        props={{
                            page: page,
                            setPage: setPage,
                            maxPage: Math.ceil((articles?.iframes.length ?? 1) / ITEMS_PER_PAGE),
                            title: "articles"
                        }}
                    >
                        <ListSection
                            currentValue={page}
                            articles={articles}
                        />
                    </PageSelection>
                </div>
                <LinksSection />
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
                width={4992}
                height={2995}
                className="absolute w-full h-full object-cover brightness-30"
            />
            <div className="absolute w-auto h-auto bottom-0 right-0 m-20 flex flex-col justify-end items-end gap-10">
                <p className={`text-8xl ${titleFont.className}`}>
                    {languageContext?.language == "en" ? "Articles" : "Bài báo"}
                </p>
                <p className="text-4xl">
                    {languageContext?.language == "en" ? "-- insert slogan here --" : "-- insert slogan here --"}
                </p>
            </div>
        </div>
    )
}

const Post = ({ iframe } : { iframe: { src: string, width: number, height: number } }) => {
    return (
        <div className="w-[40vw] h-screen">
            <iframe
                src={iframe.src}
                width={iframe.width}
                height={iframe.height}
                title="LinkedIn Post"
                className="w-full h-full"
                allowFullScreen
            ></iframe>
        </div>
    );
}

const ListSection = ({ articles, currentValue } : { articles: ArticlesType | null, currentValue: number }) => {
    return (
        <div className="w-full h-auto mb-10 px-20 bg-white flex flex-col justify-start items-center gap-10">
            {articles?.iframes.slice((currentValue - 1) * ITEMS_PER_PAGE, (currentValue - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE).map((iframe, i) => (<Post iframe={iframe} key={`article_${i}`} />))}
        </div> 
    )
}

const LinksSection = () => {
    const languageContext = useLanguage();

    return (
        <div
            className="w-[30vw] h-auto flex flex-col justify-start items-start gap-2 p-5
                border rounded-2xl border-gray-700 text-black text-4xl">
            <p>{languageContext?.language == "en" ? "Follow us:" : "Theo dõi chúng tôi:"}</p>
            <Link
                href="https://www.facebook.com/gbavn"
                target="_blank"
                className="text-3xl flex flex-row justify-start items-start gap-3 text-black
                    hover:text-red-500 duration-150"
            >
                <FaFacebook />
                <p>Facebook</p>
            </Link>
            <Link
                href="https://www.linkedin.com/in/global-brother-associates-co-ltd-design-and-build-435446339/"
                target="_blank"
                className="text-3xl flex flex-row justify-start items-start gap-3 text-black
                    hover:text-red-500 duration-150"
            >
                <FaLinkedin />
                <p>LinkedIn</p>
            </Link>
        </div>
    )
}