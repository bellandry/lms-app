import { ConfettiProvider } from "@/components/providers/confetti-provider";
import { ToastProvider } from "@/components/providers/toaster-providers";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://learn.laclass.dev"),
  title: {
    template: "%s | Laclass Dev",
    default: "Laclass Dev | Apprendre par la pratique"
  },
  description: "Avec 2 nouveau cours orientés pratique chaque mois, faites passer vos compétences à un autre niveau",
  keywords: "laclass dev, laclass learn, cours en ligne, formation, online courses, learn react, learn next js, learn javaScript, laclass, bellandry, developer, web-developer, react developer, landry, bella, landry Bella, Next.js, Next.js Developer, Laravel, next.js Developer, freelance, développeur web, développeur react, vue.js, laravel, symfony, vue.js, ",
  twitter: {
    card: "summary_large_image",
    creator: "Landry Bella",
    images: {
      url: "/hero.png",
      alt: "Landry's photo"
    }
  },
  category: "technology"
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <ToastProvider />
          <ConfettiProvider />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
