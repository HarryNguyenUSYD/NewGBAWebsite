"use client";

import { useEffect, useState } from "react";
import ProjectsMobile from "./components/ProjectsMobile";
import ProjectsDesktop from "./components/ProjectsDesktop";

export default function Projects() {
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

    return (isMobile ? <ProjectsMobile /> : <ProjectsDesktop />)
}