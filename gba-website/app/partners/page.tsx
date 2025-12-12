"use client";

import { useEffect, useState } from "react";
import PartnersMobile from "./components/PartnersMobile";
import PartnersDesktop from "./components/PartnersDesktop";

export default function Partners() {
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

    return (isMobile ? <PartnersMobile /> : <PartnersDesktop />)
}