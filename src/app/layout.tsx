import type { Metadata } from "next";
import { Gaegu } from "next/font/google";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";
import { ThemeToggle } from "./theme-toggle";
import { MobileMenu } from "./mobile-menu";
import { navLinks } from "./nav-links";

const gaegu = Gaegu({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-gaegu",
});

const delight = localFont({
  src: "./fonts/Delight-Black.woff2",
  variable: "--font-delight",
});

export const metadata: Metadata = {
  title: "Koken Met Stefan",
  description: "Een persoonlijke verzameling van recepten",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nl" className={`${gaegu.variable} ${delight.variable}`}>
      <body className="min-h-screen bg-white text-stone-900 dark:bg-stone-950 dark:text-stone-100">
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                var stored = localStorage.getItem("theme");
                var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
                if (stored === "dark" || (!stored && prefersDark)) {
                  document.documentElement.classList.add("dark");
                }
              })();
            `
          }}
        />
        <header className="border-b border-stone-200 dark:border-stone-800">
          <div className="flex items-center justify-between px-6 py-4 md:px-12 lg:px-20">
            <div className="text-left">
              <h1 className="font-delight text-3xl text-crimson sm:text-5xl dark:text-cyan">
                Koken Met Stefan
              </h1>
              <p className="font-gaegu text-base text-stone-600 sm:text-lg dark:text-stone-400">
                Een persoonlijke verzameling van recepten
              </p>
            </div>

            <div className="hidden items-center gap-6 sm:flex">
              <nav className="flex gap-4">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-sm text-stone-700 hoveR:text-crimson dark:text-stone-300 dark:hover:text-cyan"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
              <ThemeToggle />
            </div>

            <MobileMenu />
          </div>
        </header>
        <main className="px-4 py-8 md:px-12 lg:px-20">{children}</main>
      </body>
    </html>
  );
}
