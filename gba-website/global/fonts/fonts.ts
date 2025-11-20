import { Geist, Geist_Mono, Markazi_Text, Momo_Trust_Display } from "next/font/google";

export const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const textFont = Markazi_Text({
    variable: "--font-text",
    weight: ["400"],
    subsets: ["latin", "vietnamese"]
});

export const navFont = Momo_Trust_Display({
    variable: "--font-nav",
    subsets: ["latin", "vietnamese"],
    weight: ["400"]
});