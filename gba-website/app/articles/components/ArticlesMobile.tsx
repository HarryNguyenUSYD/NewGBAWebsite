"use client";

import { titleFont } from "@/global/fonts/fonts";
import { useLanguage } from "@/global/LanguageContext/LanguageContext";
import SiteWrapper from "@/global/SiteWrapper/SiteWrapperMobile";
import Image from "next/image";
import PageSelection from "@/global/PageSelection/PageSelectionMobile";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ArticlesTableType } from "@/backend/tables";
import { fetchArticles } from "@/backend/fetchFunctions";
import { ITEMS_PER_PAGE } from "./consts";

export default function Articles() {
    const searchParams = useSearchParams();

    const [articles, setArticles] = useState<ArticlesTableType | null>(null);
    const [page, setPage] = useState(parseInt(searchParams.get("page") ?? "1"));

    useEffect(() => {
        fetchArticles()
            .then(setArticles)
            .catch(console.error)
    }, []);

    return (
        <SiteWrapper topMargin={true}>
            <TitleSection />
            <PageSelection
                props={{
                    page: page,
                    setPage: setPage,
                    maxPage: Math.ceil((articles?.iframes.length ?? 1) / ITEMS_PER_PAGE),
                    title: "articles"
                }}
            >
                <ListSection
                    page={page}
                    articles={articles}
                />
            </PageSelection>
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
            <div className="absolute w-[60%] h-auto bottom-0 right-0 m-5 flex flex-col justify-end items-end gap-5 text-right">
                <p className={`text-4xl ${titleFont.className}`}>
                    {languageContext?.language == "en" ? "Articles" : "Bài báo"}
                </p>
                <p className="text-2xl ">
                    {languageContext?.language == "en" ? "The latest news about everything GBA." : "Tin tức mới nhất về mọi hoạt động của GBA."}
                </p>
            </div>
        </div>
    )
}

const Post = ({ iframe } : { iframe: { src: string, width: number, height: number } }) => {
    return (
        <div className="w-full h-screen">
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

const ListSection = ({ articles, page } : { articles: ArticlesTableType | null, page: number }) => {
    return (
        <div className="w-full h-auto mb-5 px-5 bg-white flex flex-col justify-start items-center gap-10">
            {articles?.iframes.slice((page - 1) * ITEMS_PER_PAGE, (page - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE).map((iframe, i) => (<Post iframe={iframe} key={`article_${i}`} />))}
        </div> 
    )
}