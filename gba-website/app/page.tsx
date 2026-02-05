import HomeMobile from "./components/HomeMobile";
import HomeDesktop from "./components/HomeDesktop";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Homepage | GBA",
    description: "Established in 2007, Global Brother Associates (GBA) is one of Vietnam's top design company focusing in Architecture, Interior Decoration, Construction, MEP works and Furniture Supply to Turnkey Projects.",
};

export default function Home() {
    return (
        <>
            {/* Desktop */}
            <div className="hidden lg:block">
                <HomeDesktop />
            </div>

            {/* Mobile / Tablet */}
            <div className="block lg:hidden">
                <HomeMobile />
            </div>
        </>
    )
}