import Footer from "../Footer/FooterDesktop"
import { LanguageProvider } from "../LanguageContext/LanguageContext"
import NavigationBar from "../NavigationBar/NavigationBarDesktop"
import { NavigationBarProvider } from "../NavigationBar/NavigationBarContext"

export default function SiteWrapper({
    children,
    topMargin,
    isHomepage
}: {
    children: React.ReactNode,
    topMargin: boolean,
    isHomepage?: boolean
}) {
    return (
        <LanguageProvider>
            <NavigationBarProvider>
                <div className={`${topMargin ? "pt-(--navbar-height)" : ""}`}>
                    <NavigationBar isHomepage={isHomepage ?? false} />
                    <main className="w-full h-auto overflow-x-hidden">
                        {children}
                    </main>
                    <Footer />
                </div>
            </NavigationBarProvider>
        </LanguageProvider>
    )
}