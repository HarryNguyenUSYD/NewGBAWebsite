import ClientsMobile from "./components/ClientsMobile";
import ClientsDesktop from "./components/ClientsDesktop";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Clients | GBA",
    description: "Established in 2007, Global Brother Associates (GBA) is one of Vietnam's top design company focusing in Architecture, Interior Decoration, Construction, MEP works and Furniture Supply to Turnkey Projects.",
};

export default function Clients() {
    return (
        <>
            {/* Desktop */}
            <div className="hidden lg:block">
                <ClientsDesktop />
            </div>

            {/* Mobile / Tablet */}
            <div className="block lg:hidden">
                <ClientsMobile />
            </div>
        </>
    )
}