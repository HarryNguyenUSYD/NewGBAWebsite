import { Montserrat, Markazi_Text, Momo_Trust_Display, Bevan, Charm, Goldman } from "next/font/google";

export const experienceFont = Charm({
    weight: ["700"],
    subsets: ["latin", "vietnamese"]
});

export const zilliaxFont = Goldman({
    weight: ["700"],
    subsets: ["latin", "vietnamese"]
});

export const textFont = Markazi_Text({
    variable: "--font-text",
    weight: ["400"],
    subsets: ["latin", "vietnamese"]
});

export const titleFont = Bevan({
    variable: "--font-title",
    weight: ["400"],
    subsets: ["latin", "vietnamese"]
});

export const navFont = Momo_Trust_Display({
    variable: "--font-nav",
    subsets: ["latin", "vietnamese"],
    weight: ["400"]
});

export const projectFont = Montserrat({
    weight: ["400", "700"],
    subsets: ["latin", "vietnamese"]
});