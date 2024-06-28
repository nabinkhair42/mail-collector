import { metaData } from "@/constants";
import { Poppins } from "next/font/google";

import "./globals.css";

import { Metadata } from "next";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});
export const metadata: Metadata = metaData;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>{children}</body>
    </html>
  );
}
