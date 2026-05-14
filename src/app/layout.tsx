import type { Metadata } from "next";
import { Fraunces, DM_Sans } from "next/font/google";
import "./globals.css";
import { cookies } from "next/headers";
import { LanguageProvider, type Lang } from "@/i18n/i18n";
import { LanguageSwitcher } from "@/components/i18n/LanguageSwitcher";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Paulina Henkelsho — Product design, operations, and coordination",
  description:
    "Multidisciplinary product work: UX/UI, cross-functional coordination, delivery programs, startup execution, and live event operations.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const langCookie = (await cookies()).get("lang")?.value;
  const initialLang: Lang = langCookie === "es" ? "es" : "en";

  return (
    <html
      lang={initialLang}
      className={`${dmSans.variable} ${fraunces.variable}`}
    >
      <body className="font-sans text-[15px] font-normal leading-relaxed tracking-[-0.01em] md:text-base md:tracking-normal">
        <LanguageProvider initialLang={initialLang}>
          <LanguageSwitcher />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
