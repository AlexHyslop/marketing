import type { Metadata } from "next";
import { Archivo, Public_Sans } from "next/font/google";
import "./globals.css";

// Archivo's width axis gives a condensed, signwriting-style headline face,
// the kind painted on vans, rather than a startup display font.
const display = Archivo({
  variable: "--font-display-face",
  subsets: ["latin"],
  axes: ["wdth"],
});

const body = Public_Sans({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lead desk",
  description: "Internal dashboard for the landscaping lead business",
  robots: { index: false, follow: false },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB">
      <body className={`${display.variable} ${body.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
