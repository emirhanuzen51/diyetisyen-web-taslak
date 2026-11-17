import type { Metadata, Viewport } from "next";
import { DM_Serif_Display, Manrope } from "next/font/google";
import "./globals.css";
import { pro } from "@/lib/data";
import { SmoothScroll } from "@/components/site";

const serif = DM_Serif_Display({ subsets: ["latin", "latin-ext"], weight: "400", style: ["normal", "italic"], variable: "--font-dmserif", display: "swap" });
const sans = Manrope({ subsets: ["latin", "latin-ext"], variable: "--font-manrope", display: "swap" });

export const metadata: Metadata = {
  title: `Filiz Beslenme | ${pro.name} — Bilimsel ve kişiye özel beslenme`,
  description: "Kısıtlamalardan uzak, sürdürülebilir ve bilimsel temelli beslenme danışmanlığı. Bireysel, sporcu, çocuk ve çevrim içi beslenme danışmanlığı.",
};
export const viewport: Viewport = { themeColor: "#f5f1e8" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className={`${serif.variable} ${sans.variable}`}>
      <body>
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
