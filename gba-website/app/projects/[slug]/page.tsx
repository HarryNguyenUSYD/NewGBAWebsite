import ProjectMobile from "./components/ProjectMobile";
import ProjectDesktop from "./components/ProjectDesktop";

import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {

  const { slug } = await params;

  return {
    title: `${slug} | GBA`,
    description: "Established in 2007, Global Brother Associates (GBA) is one of Vietnam's top design company focusing in Architecture, Interior Decoration, Construction, MEP works and Furniture Supply to Turnkey Projects.",
  };
}

export default async function Project({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
    const { slug } = await params;
    
    return (
        <>
            {/* Desktop */}
            <div className="hidden lg:block">
                <ProjectDesktop slug={slug} />
            </div>

            {/* Mobile / Tablet */}
            <div className="block lg:hidden">
                <ProjectMobile slug={slug} />
            </div>
        </>
    )
}