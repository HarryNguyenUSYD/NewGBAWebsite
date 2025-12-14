import CareersMobile from "./components/CareersMobile";
import CareersDesktop from "./components/CareersDesktop";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Careers | GBA",
    description: "Established in 2007, Global Brother Associates (GBA) is one of Vietnam's top design company focusing in Architecture, Interior Decoration, Construction, MEP works and Furniture Supply to Turnkey Projects.",
};

export default function Careers() {
    return (
        <>
            {/* Desktop */}
            <div className="hidden lg:block">
                <CareersDesktop />
            </div>

            {/* Mobile / Tablet */}
            <div className="block lg:hidden">
                <CareersMobile />
            </div>
        </>
    )
}