import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
import Image from "next/image";
// import Sidebar from "@/components/Sidebar";
import ResponsiveLayout from "@/components/ResponsiveLayout";
import SupabaseListener from './auth/_components/supabase-listener'


export const metadata: Metadata = {
  title: "OSUMITUKI",
  description: "OSUMITUKI - The fansite of MITUKI RURI ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="jp">
      <body className={`${inter.className}`}>
        <ResponsiveLayout>
          {children}
        </ResponsiveLayout>
        <div id="modal-root" />
      </body>
    </html>
  );
}
