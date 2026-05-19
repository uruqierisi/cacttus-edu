import type { Metadata, Viewport } from "next";
import { Sora, Space_Grotesk } from "next/font/google";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  weight: ["400", "500", "600", "700", "800"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["300", "400", "500", "600", "700"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0F0A14",
};

export const metadata: Metadata = {
  title: "Cacttus Education — Institucioni Lider në TIK, Kosovë",
  description:
    "Studime profesionale 2-vjeçare të akredituara dhe trajnime profesionale në Web/Mobile Development dhe Siguri Kibernetike në Kosovë.",
  keywords: "IT shkollë, Kosovë, web development, siguri kibernetike, trajnime profesionale",
  openGraph: {
    title: "Cacttus Education",
    description: "Fillo karrierën tënde në teknologji sot.",
    locale: "sq_AL",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sq" className="scroll-smooth">
      <body
        className={`${sora.variable} ${spaceGrotesk.variable} font-grotesk bg-bg text-white antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
