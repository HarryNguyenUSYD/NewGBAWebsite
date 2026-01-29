import ArticlesMobile from "./components/ArticlesMobile";
import ArticlesDesktop from "./components/ArticlesDesktop";
import { Metadata } from "next";
import { Suspense } from "react";
import LoadingDiv from "@/global/Loading/LoadingDiv";

export const metadata: Metadata = {
    title: "Articles | GBA",
    description: "Established in 2007, Global Brother Associates (GBA) is one of Vietnam's top design company focusing in Architecture, Interior Decoration, Construction, MEP works and Furniture Supply to Turnkey Projects.",
};

export default function Articles() {
    return (
        <Suspense fallback={<LoadingDiv />}>
            {/* Desktop */}
            <div className="hidden lg:block">
                <ArticlesDesktop />
            </div>

            {/* Mobile / Tablet */}
            <div className="block lg:hidden">
                <ArticlesMobile />
            </div>
        </Suspense>
    )
}