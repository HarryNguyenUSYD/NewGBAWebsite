"use client";

import { createContext, useContext, useState } from "react";

type Language = "en" | "vi";

interface LanguageContextInterface {
    language: Language,
    setLanguage: (value: Language) => void
}

const LanguageContext = createContext<LanguageContextInterface | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  return <LanguageContext.Provider value={{ language, setLanguage }}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  return useContext(LanguageContext);
}