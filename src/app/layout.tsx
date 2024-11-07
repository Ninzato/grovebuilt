/* eslint-disable @next/next/no-page-custom-font */
import type { Metadata } from "next";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
import { roboto } from "../fonts/fonts";
import Navbar from "../components/Navbar";
import { AuthProvider } from "@/contexts/AuthContext";
import { ToastContainer } from "react-toastify";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Grovebuilt",
  description: "A project made for hacktiv8 phase 3 challenge",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/*  eslint-disable-next-line @next/next/google-font-display */}
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <AuthProvider>
        <body className={`${roboto.className} antialiased`}>
          <Navbar />
          {children}
          <Footer />
          <ToastContainer />
        </body>
      </AuthProvider>
    </html>
  );
}
