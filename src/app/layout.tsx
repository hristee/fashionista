import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Head from "next/head";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <Head>
        {/*This is the CORRECT way */}
        <link
  rel="stylesheet"
  href="https://use.fontawesome.com/releases/v6.4.0/css/all.css"
  integrity="sha384-u1O/1R+ge3mE54EyEoOekgSPLy2GkpVYbnKa7U9h2Daf8h+4GLDf2KEEXzH8oy0u"
  crossOrigin="anonymous"
/>
      </Head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}