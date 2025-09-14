import type { Metadata } from "next";
import "./globals.css";
import { Audiowide } from "next/font/google";
import Navbar from "./components/header";
import Footer from "./components/footer";
import React from "react";


const audio_wide = Audiowide({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lista de Pokemon",
  description: "Site de busca de POKEMON",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={audio_wide.className}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
