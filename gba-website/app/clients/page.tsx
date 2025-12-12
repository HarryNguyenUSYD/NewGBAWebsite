"use client";

import { useEffect, useState } from "react";
import ClientsMobile from "./components/ClientsMobile";
import ClientsDesktop from "./components/ClientsDesktop";

export default function Clients() {
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

    return (isMobile ? <ClientsMobile /> : <ClientsDesktop />)
}