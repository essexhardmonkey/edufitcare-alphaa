import Header from "@/components/Layout/Header";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ToasterClient from "@/components/Layout/ToasterClient";
import AuthProvider from "@/components/Auth/AuthProvider";
import Footer from "@/components/Layout/Footer";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="light">
      <body className={"flex flex-col gap-4 bg-white min-h-screen"}>
        <AuthProvider>
          <ToasterClient />
          <Header />
          <main className="flex flex-col gap-3 px-4 flex-1">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
