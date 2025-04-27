import { Inter, Roboto, Poppins, Barlow_Semi_Condensed, Geist, Montserrat, DM_Sans, Hanken_Grotesk } from "next/font/google";

export const geistSans = Geist({ subsets: ["latin"], variable: "--font-geist" })
export const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
export const roboto = Roboto({ subsets: ["latin"], variable: "--font-roboto" });
export const poppins = Poppins({ subsets: ["latin"], weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"], variable: "--font-poppins" });
export const barlowSemiCondensed = Barlow_Semi_Condensed({ subsets: ["latin"], weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"], variable: "--font-barlow-semi-condensed" })
export const montserrat = Montserrat({ subsets: ["latin"], weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"], variable: "--font-montserrat" });
export const dmSans = DM_Sans({ subsets: ["latin"], weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"], variable: "--font-dm-sans" });
export const hankenGrotesk = Hanken_Grotesk({ subsets: ["latin"], weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"], variable: "--font-hanken-grotesk" })