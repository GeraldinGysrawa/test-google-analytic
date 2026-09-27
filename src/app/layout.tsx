import type { Metadata } from "next";
import { Figtree, Syne } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { ContentProvider } from "@/components/providers/ContentProvider";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Geraldin Gysrawa · Portofolio",
  description:
    "Portofolio Geraldin Gysrawa — mahasiswa Teknik Informatika Politeknik Negeri Bandung yang berfokus pada pengembangan web.",
};

const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${syne.variable} ${figtree.variable} h-full`}>
      <body className="min-h-full antialiased">
        <ContentProvider>{children}</ContentProvider>
        {gaId ? <GoogleAnalytics gaId={gaId} /> : null}
      </body>
    </html>
  );
}
