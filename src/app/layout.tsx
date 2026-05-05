import type { Metadata } from "next";
import { Fraunces, DM_Sans } from "next/font/google";
import "./globals.css";

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
  title: "Paulina Henkelsho — Designing clarity in complex systems",
  description:
    "Interfaces and systems that turn complexity into decisions. Product design grounded in systems thinking.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${fraunces.variable}`}>
      <body className="font-sans text-[15px] font-normal leading-relaxed tracking-[-0.01em] md:text-base md:tracking-normal">
        <div
          style={{
            position: "fixed",
            top: "20px",
            right: "20px",
            zIndex: 9999,
            background: "red",
            color: "white",
            padding: "10px",
          }}
        >
          DEBUG TOGGLE
        </div>
        <div className="fixed top-6 right-6 z-[9998] flex items-center gap-2 rounded-md border border-neutral-200/70 bg-white/75 px-3 py-2 text-sm tracking-tight text-neutral-950 shadow-sm backdrop-blur">
          <button className="opacity-70 transition hover:opacity-100">
            EN
          </button>
          <span className="opacity-60">/</span>
          <button className="opacity-70 transition hover:opacity-100">
            ES
          </button>
        </div>
        {children}
      </body>
    </html>
  );
}
