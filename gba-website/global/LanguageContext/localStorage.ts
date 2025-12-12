"use client";

import { Language } from "./LanguageContext";

export function getLanguage(): Language {
    if (typeof window === "undefined") {
        return "en"; // safe default for SSR
    }

    const language = localStorage.getItem("language");
    
    if (language !== "en" && language !== "vi") {
        return "en";
    }

    return language;
}

export function setLanguage(value: Language) {
    localStorage.setItem("language", value);
}