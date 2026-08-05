import type { Metadata } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { cookies } from "next/headers";
import { LanguageProvider, type Lang } from "@/i18n/i18n";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Paulina Henkel — Product Builder",
  description:
    "Product Builder. Building technology people actually adopt — by understanding how people work first.",
  metadataBase: new URL("https://pauhenkelsho.com"),
  openGraph: {
    title: "Paulina Henkel — Product Builder",
    description:
      "Building technology people actually adopt. Philosophy, products shaped by real work, and field notes on product thinking.",
    url: "https://pauhenkelsho.com",
    siteName: "Paulina Henkel",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Paulina Henkel — Product Builder",
    description:
      "Building technology people actually adopt. Philosophy, products shaped by real work, and field notes on product thinking.",
  },
  robots: {
    index: true,
    follow: true,
  },
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
      className={`${inter.variable} ${instrumentSerif.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme");if(t==="dark"||(!t&&matchMedia("(prefers-color-scheme:dark)").matches))document.documentElement.classList.add("dark")}catch(e){}})()`,
          }}
        />
      </head>
      <body className="font-sans text-[15px] font-normal leading-relaxed tracking-[-0.01em] md:text-base md:tracking-normal">
        <a
          href="#hero"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[9999] focus:rounded-md focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-surface"
        >
          Skip to content
        </a>
        <LanguageProvider initialLang={initialLang}>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
