import ResourcesMobile from "./components/ResourcesMobile";
import ResourcesDesktop from "./components/ResourcesDesktop";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Resources | GBA",
    description: "Established in 2007, Global Brother Associates (GBA) is one of Vietnam's top design company focusing in Architecture, Interior Decoration, Construction, MEP works and Furniture Supply to Turnkey Resources.",
};

export default function Resources() {
    return (
        <>
            {/* Desktop */}
            <div className="hidden lg:block">
                <ResourcesDesktop />
            </div>

            {/* Mobile / Tablet */}
            <div className="block lg:hidden">
                <ResourcesMobile />
            </div>
        </>
    )
}