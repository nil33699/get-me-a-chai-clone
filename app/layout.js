import { Geist, Geist_Mono } from "next/font/google";
import SessionWrapper from "@/components/sessionwrapper";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Get Me A Chai | Fund Your Project with chai",
  description: "A Crowdfunding platform for creaters. Get funded by your fans and followers. Start Now",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased h-full w-full bg-black`}
          >
          <SessionWrapper>
          <Navbar />
          <div className="min-h-screen bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]">
            {children}
          </div>
          <Footer />
      </SessionWrapper>
        </body>
    </html>
  );
}
