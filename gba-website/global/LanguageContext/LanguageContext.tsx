"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getLanguage, setLanguage } from "./localStorage";

export type Language = "en" | "vi";

interface LanguageContextInterface {
    language: Language,
    setLanguage: (value: Language) => void
}

const LanguageContext = createContext<LanguageContextInterface | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState<Language>("en");

    useEffect(() => {
        const stored = getLanguage();
        if (stored === "en" || stored === "vi") {
            setLanguage(stored);
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setCurrentLanguage(stored);
        }
    }, []);

  const storeLanguage = (language: Language) => {
    setCurrentLanguage(language);
    setLanguage(language);
  }

  return <LanguageContext.Provider value={{ language: currentLanguage, setLanguage: storeLanguage }}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  return useContext(LanguageContext);
}