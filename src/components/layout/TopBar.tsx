"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const topItems = [
  {
    label: "Rreth Nesh",
    dropdown: [
      { label: "Ekipi", href: "#" },
      { label: "Ligjëruesit", href: "#" },
    ],
  },
  { label: "Kontakti", href: "#apliko" },
];

export default function TopBar() {
  const [open, setOpen] = useState(false);

  return (
    <div className="hidden sm:block bg-[#0a0610] border-b border-white/5 text-xs font-grotesk">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-end items-center h-9 gap-6">
        {topItems.map((item) => {
          if (item.dropdown) {
            return (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setOpen(true)}
                onMouseLeave={() => setOpen(false)}
              >
                <button
                  className="flex items-center gap-1 text-white/50 hover:text-white/80 transition-colors"
                  aria-haspopup="true"
                  aria-expanded={open}
                >
                  {item.label}
                  <svg
                    className={`w-3 h-3 transition-transform ${open ? "rotate-180" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <AnimatePresence>
                  {open && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full mt-1 w-36 bg-[#1A1025] border border-white/10 rounded-lg py-1 z-50 shadow-xl"
                    >
                      {item.dropdown.map((sub) => (
                        <a
                          key={sub.label}
                          href={sub.href}
                          className="block px-4 py-2 text-white/60 hover:text-white hover:bg-white/5 transition-colors"
                        >
                          {sub.label}
                        </a>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          }
          return (
            <a
              key={item.label}
              href={item.href}
              className="text-white/50 hover:text-white/80 transition-colors"
            >
              {item.label}
            </a>
          );
        })}
      </div>
    </div>
  );
}
