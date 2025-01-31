"use client"
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { endSession } from "../customHooks/setSession";
import { useSession } from "../context/SessionContext";
import { BiCodeAlt, BiMenuAltRight } from "react-icons/bi";
import { AnimatePresence, motion } from "framer-motion";

export default function Header() {
  const { sessionEmail } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 w-full z-50 bg-gradient-to-r from-gray-900/95 via-gray-800/95 to-gray-900/95 border-b border-gray-700/30 backdrop-blur-md font-sans transition-shadow duration-300 ${
        scrolled ? 'shadow-xl shadow-black/10' : 'shadow-lg shadow-black/5'
      }`}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        <motion.div 
          className="text-xl font-bold text-transparent bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link href="/" aria-label="Home" className="hover:opacity-80 transition-opacity">
            <BiCodeAlt size={36} className="filter drop-shadow-lg" />
          </Link>
        </motion.div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="sm:hidden text-orange-400 hover:text-orange-300 transition-colors focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          <BiMenuAltRight size={36} className="filter drop-shadow-lg" />
        </motion.button>

        <nav className="hidden sm:flex items-center gap-8 text-gray-300">
          {[
            { href: "/", label: "Home" },
            { href: "/projects", label: "Projects" },
            { href: "/upload", label: "Upload" },
            { href: "/post", label: "Posts" },
            ...(sessionEmail === "admin@votech.com" ? [{ href: "/dashboard", label: "Admin" }] : []),
          ].map((link) => (
            <motion.div
              key={link.href}
              whileHover={{ y: -2 }}
              className="relative group"
            >
              <Link 
                href={link.href} 
                className="hover:text-orange-400 transition-colors tracking-wide text-sm font-medium"
              >
                {link.label}
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-gradient-to-r from-yellow-400 to-orange-500 opacity-0 group-hover:opacity-100 group-hover:w-full transition-all duration-300 rounded-full"></span>
              </Link>
            </motion.div>
          ))}
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={endSession}
            className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-yellow-400 to-orange-500 text-white hover:from-orange-500 hover:to-yellow-400 transition-all shadow-lg shadow-orange-500/20 text-sm font-medium tracking-wide"
          >
            Log Out
          </motion.button>
        </nav>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            onClick={() => setIsMenuOpen(false)}
          >
            <motion.nav 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="absolute right-0 top-[73px] w-80 h-[calc(100vh-73px)] bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-gray-300 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="h-full px-8 py-8 overflow-y-auto">
                <div className="space-y-6">
                  {[
                    { href: "/", label: "Home" },
                    { href: "/projects", label: "Projects" },
                    { href: "/upload", label: "Upload" },
                    { href: "/post", label: "Posts" },
                    ...(sessionEmail === "admin@votech.com" ? [{ href: "/dashboard", label: "Admin" }] : []),
                  ].map((link) => (
                    <motion.div
                      key={link.href}
                      whileHover={{ x: 4 }}
                      className="group"
                    >
                      <Link
                        href={link.href}
                        className="flex items-center space-x-2 py-2 px-4 rounded-xl hover:bg-orange-500/10 hover:text-orange-400 transition-all duration-200"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <span className="text-lg font-medium">{link.label}</span>
                        <span className="h-px w-0 bg-gradient-to-r from-yellow-400 to-orange-500 group-hover:w-full transition-all duration-300" />
                      </Link>
                    </motion.div>
                  ))}
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-gray-900 via-gray-900/95 to-transparent pt-20">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      endSession();
                      setIsMenuOpen(false);
                    }}
                    className="w-full px-6 py-4 rounded-xl bg-gradient-to-r from-yellow-400 to-orange-500 text-white hover:from-orange-500 hover:to-yellow-400 transition-all shadow-lg shadow-orange-500/20 text-lg font-medium tracking-wide"
                  >
                    Log Out
                  </motion.button>
                </div>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}