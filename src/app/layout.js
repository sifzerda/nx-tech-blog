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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex flex-col min-h-screen">
        <AuthProvider>
          {/* Header always at top */}
          <Header />

          {/* Main content wrapper: full height minus header/footer */}
          <div className="flex-1 flex flex-col justify-start items-center w-full">
            {children}
          </div>

          {/* Footer stays at bottom */}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}