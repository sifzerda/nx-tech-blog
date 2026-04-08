import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "../../lib/authContext";
import Header from "../components/Header";
import Footer from "../components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Next.js Tech Blog",
  description: "A tech blog made in Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased border border-[#0b82c4]`}>
      <body className="min-h-full flex flex-col bg-[#c8efbb]">
        
        <AuthProvider>
          
          <main className="min-h-screen bg-[#c8efbb] flex flex-col ">
            <Header />

            <div className="flex-1 border-l-[4px] border-r-[4px] border-[#0b82c4]">
              {children}
            </div>

            <Footer />
          </main>
        </AuthProvider>
        
      </body>
    </html>
  );
}