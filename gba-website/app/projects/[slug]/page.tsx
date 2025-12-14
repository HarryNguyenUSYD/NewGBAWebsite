import ProjectMobile from "./components/ProjectMobile";
import ProjectDesktop from "./components/ProjectDesktop";

import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Project | GBA",
    description: "Established in 2007, Global Brother Associates (GBA) is one of Vietnam's top design company focusing in Architecture, Interior Decoration, Construction, MEP works and Furniture Supply to Turnkey Projects.",
};

export default function Project() {
    return (
        <>
            {/* Desktop */}
            <div className="hidden lg:block">
                <ProjectDesktop />
            </div>

            {/* Mobile / Tablet */}
            <div className="block lg:hidden">
                <ProjectMobile />
            </div>
        </>
    )
}