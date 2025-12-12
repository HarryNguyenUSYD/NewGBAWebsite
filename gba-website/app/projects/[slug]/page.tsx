"use client";

import { useEffect, useState } from "react";
import ProjectMobile from "./components/ProjectMobile";
import ProjectDesktop from "./components/ProjectDesktop";

export default function Project() {
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

    return (isMobile ? <ProjectMobile /> : <ProjectDesktop />)
}