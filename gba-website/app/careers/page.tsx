"use client";

import { useEffect, useState } from "react";
import CareersMobile from "./components/CareersMobile";
import CareersDesktop from "./components/CareersDesktop";

export default function Careers() {
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

    return (isMobile ? <CareersMobile /> : <CareersDesktop />)
}