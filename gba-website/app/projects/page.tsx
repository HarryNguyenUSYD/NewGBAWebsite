import ProjectsMobile from "./components/ProjectsMobile";
import ProjectsDesktop from "./components/ProjectsDesktop";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Projects | GBA",
    description: "Established in 2007, Global Brother Associates (GBA) is one of Vietnam's top design company focusing in Architecture, Interior Decoration, Construction, MEP works and Furniture Supply to Turnkey Projects.",
};

export default function Projects() {
    return (
        <>
            {/* Desktop */}
            <div className="hidden lg:block">
                <ProjectsDesktop />
            </div>

            {/* Mobile / Tablet */}
            <div className="block lg:hidden">
                <ProjectsMobile />
            </div>
        </>
    )
}