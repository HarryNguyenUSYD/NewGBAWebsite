import VendorsMobile from "./components/VendorsMobile";
import VendorsDesktop from "./components/VendorsDesktop";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Vendors | GBA",
    description: "Established in 2007, Global Brother Associates (GBA) is one of Vietnam's top design company focusing in Architecture, Interior Decoration, Construction, MEP works and Furniture Supply to Turnkey Projects.",
};

export default function Vendors() {
    return (
        <>
            {/* Desktop */}
            <div className="hidden lg:block">
                <VendorsDesktop />
            </div>

            {/* Mobile / Tablet */}
            <div className="block lg:hidden">
                <VendorsMobile />
            </div>
        </>
    )
}