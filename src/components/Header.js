// components/Header.js
"use client";

import Link from "next/link";
import { useAuth } from "../../lib/authContext";
import { usePathname, useRouter } from 'next/navigation';

export default function Header() {
    const pathname = usePathname();
    const router = useRouter();
    const { isLoggedIn, logout } = useAuth();

    // Base links
    const links = [{ href: '/', label: 'Home' }];

    // Conditional links
    if (isLoggedIn) {
        //links.push({ href: '/profile', label: 'Profile' });
        links.push({ label: 'Logout', onClick: null }); // placeholder
    } else {
        links.push(
            { href: '/signup', label: 'Signup' },
            { href: '/login', label: 'Login' }
        );
    }

    return (
        <header className="bg-[#06064d] px-4 sm:px-6 pt-6 pb-8 border-b-[4px] border-[#0b82c4]">

            <nav className="flex flex-wrap gap-4 sm:gap-8 text-[#c8efbb] text-lg font-medium mb-6">

                {links.map(({ href, label, onClick }) => {
                    const isActive = href === pathname;

                    // Define logout click here where router is available
                    const handleClick = label === 'Logout'
                        ? () => {
                            logout();
                            router.push('/'); // redirect after logout
                        }
                        : onClick;

                    return (
                        <li className="list-none" key={label}>
                            {handleClick ? (
                                <button
                                    onClick={handleClick}
                                    type="button"
                                    className={`${pathname === "/logout"
                                        ? "text-[#c8efbb]"
                                        : "text-white hover:text-blue-400 cursor-pointer"
                                        }`}>
                                    {label}
                                </button>

                            ) : (

                                <Link
                                    href={href}
                                    className={`${isActive
                                        ? "text-[#c8efbb]"
                                        : "text-white hover:text-blue-400"
                                        }`}>
                                    {label}
                                </Link>
                            )}
                        </li>
                    );
                })}

            </nav>

            <div className="inline-block bg-[#c8efbb] text-[#06064d] px-4 sm:px-5 py-3 rounded-2xl shadow-[6px_6px_0px_#7b7b7b]">
                <h1 className="text-4xl sm:text-5xl font-extrabold">
                    The Tech Blog
                </h1>
            </div>

        </header>
    );
}