import { LanguageProvider } from "../LanguageContext/LanguageContext"
import NavigationBar from "../NavigationBar/NavigationBar"
import { NavigationBarProvider } from "../NavigationBar/NavigationBarContext"

export default function SiteWrapper({
    children,
    topMargin
}: {
    children: React.ReactNode,
    topMargin: boolean
}) {
    return (
        <LanguageProvider>
            <NavigationBarProvider>
                <div className={topMargin ? "pt-(--navbar-height)" : ""}>
                    <NavigationBar />
                    <main className="w-full h-auto overflow-x-hidden">
                        {children}
                    </main>
                </div>
            </NavigationBarProvider>
        </LanguageProvider>
    )
}