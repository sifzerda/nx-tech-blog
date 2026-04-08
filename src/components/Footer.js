// components/Footer.js
"use client";

import { FaGithub } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#06064d] text-[#c8efbb] py-4 px-4 sm:px-6 border-t-[4px] border-[#0b82c4]">
      <div className="flex flex-col items-center max-w-4xl mx-auto space-y-1">
        
        <div className="text-sm sm:text-base font-medium tracking-wide">
          tech-blog
        </div>

        <div className="text-sm sm:text-base font-medium tracking-wide">
          siferzda 2026
        </div>

        <div>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-110 transition-transform">
            <FaGithub className="w-5 h-5 sm:w-6 sm:h-6" />
          </a>
        </div>
      </div>
    </footer>
  );
}