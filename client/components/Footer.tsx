import React, { useState } from "react";
import Link from "next/link";
import { endSession } from "../customHooks/setSession";
import { useSession } from "../context/SessionContext";
import { BiCodeAlt, BiMenuAltRight } from "react-icons/bi";

export default function Header() {
  const { sessionEmail } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 bg-white shadow-md font-sans">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        <div className="text-xl font-bold text-orange-500 flex items-center gap-2">
          <Link href="/" aria-label="Home">
            <BiCodeAlt size={32} />
          </Link>
        </div>

        <button
          className="sm:hidden text-orange-500 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          <BiMenuAltRight size={32} />
        </button>

        <nav className="hidden sm:flex gap-6 text-orange-500 text-sm sm:text-base">
          <Link href="/" className="relative group hover:text-orange-600">
            Home
            <span className="absolute left-0 bottom-0 w-0 h-1 bg-orange-500 group-hover:w-full transition-all"></span>
          </Link>
          <Link
            href="/projects"
            className="relative group hover:text-orange-600"
          >
            Projects
            <span className="absolute left-0 bottom-0 w-0 h-1 bg-orange-500 group-hover:w-full transition-all"></span>
          </Link>
          {sessionEmail === "admin@votech.com" && (
            <Link
              href="/dashboard"
              className="relative group hover:text-orange-600"
            >
              Admin
              <span className="absolute left-0 bottom-0 w-0 h-1 bg-orange-500 group-hover:w-full transition-all"></span>
            </Link>
          )}
          <Link href="/upload" className="relative group hover:text-orange-600">
            Upload
            <span className="absolute left-0 bottom-0 w-0 h-1 bg-orange-500 group-hover:w-full transition-all"></span>
          </Link>
          <Link href="/post" className="relative group hover:text-orange-600">
            Posts
            <span className="absolute left-0 bottom-0 w-0 h-1 bg-orange-500 group-hover:w-full transition-all"></span>
          </Link>
          <button
            onClick={endSession}
            className="px-4 py-2 rounded-md bg-gradient-to-r from-yellow-400 to-orange-500 text-white hover:from-orange-500 hover:to-yellow-400 transition-all"
          >
            Log Out
          </button>
        </nav>
      </div>

      {isMenuOpen && (
        <nav className="sm:hidden bg-orange-50 text-orange-500 px-4 py-3 shadow-lg">
          <Link
            href="/"
            className="block py-2 relative group hover:text-orange-600"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
            <span className="absolute left-0 bottom-0 w-0 h-1 bg-orange-500 group-hover:w-full transition-all"></span>
          </Link>
          <Link
            href="/projects"
            className="block py-2 relative group hover:text-orange-600"
            onClick={() => setIsMenuOpen(false)}
          >
            Projects
            <span className="absolute left-0 bottom-0 w-0 h-1 bg-orange-500 group-hover:w-full transition-all"></span>
          </Link>
          {sessionEmail === "admin@votech.com" && (
            <Link
              href="/dashboard"
              className="block py-2 relative group hover:text-orange-600"
              onClick={() => setIsMenuOpen(false)}
            >
              Admin
              <span className="absolute left-0 bottom-0 w-0 h-1 bg-orange-500 group-hover:w-full transition-all"></span>
            </Link>
          )}
          <Link
            href="/upload"
            className="block py-2 relative group hover:text-orange-600"
            onClick={() => setIsMenuOpen(false)}
          >
            Upload
            <span className="absolute left-0 bottom-0 w-0 h-1 bg-orange-500 group-hover:w-full transition-all"></span>
          </Link>
          <Link
            href="/post"
            className="block py-2 relative group hover:text-orange-600"
            onClick={() => setIsMenuOpen(false)}
          >
            Posts
            <span className="absolute left-0 bottom-0 w-0 h-1 bg-orange-500 group-hover:w-full transition-all"></span>
          </Link>
          <button
            onClick={() => {
              endSession();
              setIsMenuOpen(false);
            }}
            className="px-4 py-2 rounded-md bg-gradient-to-r from-yellow-400 to-orange-500 text-white hover:from-orange-500 hover:to-yellow-400 transition-all"
          >
            Logout
          </button>
        </nav>
      )}
    </header>
  );
}
