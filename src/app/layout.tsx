"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import ClientProvider from "@/components/ClientProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body>
        <ClientProvider>
          <Navbar />
          <main className="py-16">{children}</main>
        </ClientProvider>
      </body>
    </html>
  );
}
