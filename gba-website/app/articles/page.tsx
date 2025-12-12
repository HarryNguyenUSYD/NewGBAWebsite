"use client";

import { useEffect, useState } from "react";
import ArticlesMobile from "./components/ArticlesMobile";
import ArticlesDesktop from "./components/ArticlesDesktop";

export default function Articles() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const changeDeviceType = () => {
            if (window.innerWidth <= 1024) {
                setIsMobile(true);
            } else {
                setIsMobile(false);
            }
        }

        changeDeviceType();
        window.addEventListener("resize", changeDeviceType);
        return () => window.removeEventListener("resize", changeDeviceType);
    }, [])

    return (isMobile ? <ArticlesMobile /> : <ArticlesDesktop />)
}