"use client";
import Link from "next/link";
import { useState } from "react";
import { barlow, merriweather } from "../fonts/fonts";
import { useAuth } from "@/contexts/AuthContext";
import { LogoutSharp } from "@mui/icons-material";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const router = useRouter();

  const toggleMenu = () => {
    setIsOpen((prev) => {
      return !prev;
    });
  };

  const logout = () => {
    Cookies.remove("Authorization");
    setIsLoggedIn(false);
    router.push("/login");
  };

  const mobileMenuStyle = `${merriweather.className} block py-2 px-3 text-black rounded md:bg-transparent md:text-black md:p-0 dark:text-white font-bold text-lg tracking-widest bg-white hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700`;

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 shadow-md sticky top-0 z-20">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-5 md:px-10 py-4 relative">
        <button
          onClick={toggleMenu}
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 md:hidden hover:bg-black hover:text-white transition-all duration-300 ease-linear dark:text-gray-400 dark:hover:bg-gray-700"
          aria-controls="navbar-default"
          aria-expanded={isOpen}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div className={`hidden w-auto md:block md:w-1/4`} id="navbar-default">
          <ul className="font-medium flex flex-col p-4 absolute z-10 left-0 top-20 md:static md:p-0 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Link
                href="/products"
                className="block py-2 px-3 text-black rounded md:bg-transparent md:text-black md:p-0 dark:text-white font-bold text-lg tracking-widest "
                aria-current="page"
              >
                SHOP
              </Link>
            </li>
          </ul>
        </div>
        <ul className="w=1/3 md:w-1/2 flex justify-center">
          <li>
            <Link href="/" className="flex items-center space-x-3">
              <div className="flex justify-center items-center gap-2">
                <svg className="w-5 h-5 md:w-8 md:h-8" viewBox="0 0 14 12">
                  <g>
                    <path
                      fill="#272524"
                      d="M7.9,11.2L7.9,11.2c0,0,0-0.1,0-0.1c0,0.1-1.1-2.7-1.5-3.1C5.5,7.1,4.5,7.2,3.8,7.2H0.4
C0.2,7.2,0,7.3,0,7.5v0c0,0,0,0.1,0,0.1c0,0,1.1,2.8,1.5,3.1c0.8,0.8,1.5,0.8,2.6,0.8h3.5C7.8,11.5,7.9,11.4,7.9,11.2z"
                    ></path>
                    <path
                      fill="#272524"
                      d="M13.7,7.7c0-2.1-2.2-6.7-2.5-7.5C11.2,0.1,11.1,0,10.9,0c-0.1,0-0.3,0.1-0.3,0.2C9.1,3.7,8,6.3,8,6.3
C7.9,6.6,7.8,6.9,7.9,7.2C8,7.5,8.6,8.7,9,9.7c0.6,1.4,0.7,1.8,2,1.8C12.6,11.5,13.7,10.1,13.7,7.7z"
                    ></path>
                  </g>
                </svg>
                <span
                  className={`${barlow.className} font-bold self-center text-xl md:text-2xl whitespace-nowrap tracking-[.5rem] dark:text-white`}
                >
                  GROVEBUILT
                </span>
              </div>
            </Link>
          </li>
        </ul>
        <ul className="hidden md:flex justify-end items-center gap-4 w-1/4">
          {isLoggedIn ? (
            <div className="flex gap-5">
              <li>
                <Link
                  href="/wishlist"
                  className="text-[10px] md:text-lg font-bold tracking-widest"
                >
                  WISHLIST
                </Link>
              </li>
              <li onClick={logout} className="cursor-pointer">
                <LogoutSharp />
              </li>
            </div>
          ) : (
            <li>
              <Link
                href="/login"
                className="text-[10px] md:text-lg font-bold tracking-widest"
              >
                SIGN IN
              </Link>
            </li>
          )}
        </ul>
      </div>
      {/* Mobile Menu */}
      <div
        className={`w-full ${isOpen ? "block" : "hidden"}`}
        id="navbar-default"
      >
        <ul
          onClick={toggleMenu}
          className="font-medium flex flex-col p-4 absolute left-0 top-19 w-full bg-white shadow-md border-t-2 "
        >
          <li>
            <Link
              href="/products"
              className={mobileMenuStyle}
              aria-current="page"
            >
              Shop
            </Link>
          </li>
          {isLoggedIn ? (
            <div>
              <li>
                <Link
                  href="/wishlist"
                  className={mobileMenuStyle}
                  aria-current="page"
                >
                  Wishlist
                </Link>
              </li>
              <li
                className={`${mobileMenuStyle} cursor-pointer`}
                onClick={logout}
              >
                Logout
              </li>
            </div>
          ) : (
            <li>
              <Link
                href="/login"
                className={mobileMenuStyle}
                aria-current="page"
              >
                Sign In
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
