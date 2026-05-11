"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { studimeDropdown, bizneseDropdown, projektetDropdown } from "@/data/nav";

interface NavbarProps {
  onApply: () => void;
}

type DropdownKey = "studime" | "biznese" | "projekte" | null;

export default function Navbar({ onApply }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<DropdownKey>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [accordionOpen, setAccordionOpen] = useState<string | null>(null);
  const closeTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [drawerOpen]);

  const openMenu = (key: DropdownKey) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenDropdown(key);
  };

  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setOpenDropdown(null), 150);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
    setAccordionOpen(null);
  };

  const navLinkCls =
    "flex items-center gap-1 text-sm text-white/70 hover:text-white transition-colors py-1 font-grotesk font-medium px-2";

  const accordionItems = [
    {
      key: "studime",
      label: "Studime Profesionale",
      children: studimeDropdown.programs.map((p) => ({
        label: p.label,
        href: p.href,
        sub: p.description,
      })),
    },
    {
      key: "biznese",
      label: "Për Biznese",
      children: bizneseDropdown.items.map((p) => ({
        label: p.label,
        href: "#",
        sub: p.description,
      })),
    },
    {
      key: "projekte",
      label: "Projektet",
      children: projektetDropdown.map((p) => ({
        label: p.label,
        href: "#",
        sub: p.logo ?? undefined,
      })),
    },
  ];

  return (
    <>
      <header
        className={`fixed left-0 right-0 z-40 top-0 sm:top-9 transition-all duration-300 ${
          scrolled
            ? "bg-[#0F0A14]/95 backdrop-blur-md border-b border-white/10 shadow-lg"
            : "bg-[#0F0A14]"
        }`}
      >
        <nav
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16"
          aria-label="Navigimi kryesor"
        >
          {/* Logo */}
          <a
            href="#hero"
            className="flex items-center flex-shrink-0"
            aria-label="Cacttus Education"
            onClick={closeDrawer}
          >
            <Image
              src="/cacttus.png"
              alt="Cacttus Education"
              width={160}
              height={40}
              className="h-8 w-auto object-contain"
              priority
            />
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {/* Studime Profesionale */}
            <div
              className="relative"
              onMouseEnter={() => openMenu("studime")}
              onMouseLeave={scheduleClose}
            >
              <button
                className={navLinkCls}
                aria-haspopup="true"
                aria-expanded={openDropdown === "studime"}
              >
                Studime Profesionale
                <ChevronIcon open={openDropdown === "studime"} />
              </button>
              <AnimatePresence>
                {openDropdown === "studime" && (
                  <DropdownPanel onMouseEnter={() => openMenu("studime")} onMouseLeave={scheduleClose}>
                    <div className="flex gap-6 p-6 min-w-[620px]">
                      <div className="w-52 flex-shrink-0">
                        <p className="font-sora font-bold text-white text-sm mb-2">
                          {studimeDropdown.title}
                        </p>
                        <p className="text-white/50 text-xs leading-relaxed">
                          {studimeDropdown.subtitle}
                        </p>
                      </div>
                      <div className="flex-1 grid grid-cols-1 gap-3">
                        {studimeDropdown.programs.map((p) => (
                          <a
                            key={p.label}
                            href={p.href}
                            className="flex items-start gap-3 p-3 rounded-xl bg-white/5 hover:bg-[#8E4897]/10 border border-white/5 hover:border-[#8E4897]/30 transition-all group"
                          >
                            <span className="text-2xl mt-0.5">{p.icon}</span>
                            <div>
                              <p className="text-sm font-semibold text-white group-hover:text-[#B06BBD] transition-colors font-sora">
                                {p.label}
                              </p>
                              <p className="text-xs text-white/50 mt-0.5">{p.description}</p>
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>
                  </DropdownPanel>
                )}
              </AnimatePresence>
            </div>

            <a href="#trajnimet" className={navLinkCls}>
              Trajnime profesionale
            </a>

            {/* Për Biznese */}
            <div
              className="relative"
              onMouseEnter={() => openMenu("biznese")}
              onMouseLeave={scheduleClose}
            >
              <button
                className={navLinkCls}
                aria-haspopup="true"
                aria-expanded={openDropdown === "biznese"}
              >
                Për Biznese
                <ChevronIcon open={openDropdown === "biznese"} />
              </button>
              <AnimatePresence>
                {openDropdown === "biznese" && (
                  <DropdownPanel onMouseEnter={() => openMenu("biznese")} onMouseLeave={scheduleClose}>
                    <div className="flex gap-6 p-6 min-w-[600px]">
                      <div className="w-48 flex-shrink-0">
                        <p className="font-sora font-bold text-white text-sm mb-2">
                          {bizneseDropdown.title}
                        </p>
                        <p className="text-white/50 text-xs leading-relaxed">
                          {bizneseDropdown.subtitle}
                        </p>
                      </div>
                      <div className="flex-1 grid grid-cols-2 gap-2">
                        {bizneseDropdown.items.map((item) => (
                          <a
                            key={item.label}
                            href="#"
                            className="p-3 rounded-xl bg-white/5 hover:bg-[#8E4897]/10 border border-white/5 hover:border-[#8E4897]/30 transition-all group"
                          >
                            <p className="text-xs font-semibold text-white group-hover:text-[#B06BBD] transition-colors font-sora">
                              {item.label}
                            </p>
                            <p className="text-xs text-white/40 mt-1">{item.description}</p>
                          </a>
                        ))}
                      </div>
                    </div>
                  </DropdownPanel>
                )}
              </AnimatePresence>
            </div>

            {/* Projektet */}
            <div
              className="relative"
              onMouseEnter={() => openMenu("projekte")}
              onMouseLeave={scheduleClose}
            >
              <button
                className={navLinkCls}
                aria-haspopup="true"
                aria-expanded={openDropdown === "projekte"}
              >
                Projektet
                <ChevronIcon open={openDropdown === "projekte"} />
              </button>
              <AnimatePresence>
                {openDropdown === "projekte" && (
                  <DropdownPanel onMouseEnter={() => openMenu("projekte")} onMouseLeave={scheduleClose}>
                    <div className="p-4 min-w-[280px]">
                      <p className="text-xs text-white/40 uppercase tracking-wider mb-3 px-2 font-grotesk font-medium">
                        Projektet tona
                      </p>
                      <div className="space-y-1">
                        {projektetDropdown.map((p) => (
                          <a
                            key={p.label}
                            href="#"
                            className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-white/5 transition-colors group"
                          >
                            <span className="text-sm text-white/70 group-hover:text-white transition-colors">
                              {p.label}
                            </span>
                            {p.logo && (
                              <span className="text-xs text-[#8E4897] font-semibold">{p.logo}</span>
                            )}
                          </a>
                        ))}
                      </div>
                    </div>
                  </DropdownPanel>
                )}
              </AnimatePresence>
            </div>

            <a href="#" className={navLinkCls}>
              Lajmet
            </a>
            <a href="#apliko" className={navLinkCls}>
              Kontakti
            </a>
          </div>

          {/* Right: CTA + hamburger */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={onApply}
              className="inline-flex items-center bg-[#8E4897] hover:bg-[#5C2F65] text-white text-xs sm:text-sm font-semibold px-4 sm:px-5 py-2 rounded-full transition-all duration-200 shadow-lg shadow-[#8E4897]/20 min-h-[40px]"
            >
              Apliko tani
            </button>

            {/* Hamburger — mobile only */}
            <button
              className="lg:hidden flex items-center justify-center w-11 h-11 rounded-xl text-white/70 hover:text-white hover:bg-white/5 transition-colors"
              onClick={() => setDrawerOpen(true)}
              aria-label="Hap menunë"
              aria-expanded={drawerOpen}
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 lg:hidden"
              onClick={closeDrawer}
              aria-hidden="true"
            />

            {/* Drawer */}
            <motion.aside
              key="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              className="fixed top-0 right-0 bottom-0 w-full sm:w-80 bg-[#0F0A14] border-l border-white/10 z-50 lg:hidden flex flex-col overflow-hidden"
              aria-label="Menuja mobile"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 flex-shrink-0">
                <a href="#hero" onClick={closeDrawer} className="flex items-center">
                  <Image
                    src="/cacttus.png"
                    alt="Cacttus Education"
                    width={140}
                    height={36}
                    className="h-7 w-auto object-contain"
                  />
                </a>
                <button
                  onClick={closeDrawer}
                  className="flex items-center justify-center w-10 h-10 rounded-xl text-white/50 hover:text-white hover:bg-white/10 transition-colors"
                  aria-label="Mbyll"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Drawer nav links */}
              <nav className="flex-1 overflow-y-auto py-3 px-3">
                {accordionItems.map((item) => (
                  <div key={item.key} className="mb-1">
                    <button
                      className="w-full flex items-center justify-between px-3 py-3 rounded-xl text-white/70 hover:text-white hover:bg-white/5 transition-colors text-sm font-grotesk font-medium min-h-[44px]"
                      onClick={() =>
                        setAccordionOpen(accordionOpen === item.key ? null : item.key)
                      }
                      aria-expanded={accordionOpen === item.key}
                    >
                      {item.label}
                      <ChevronIcon open={accordionOpen === item.key} />
                    </button>

                    <AnimatePresence>
                      {accordionOpen === item.key && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.22 }}
                          className="overflow-hidden ml-3 border-l border-white/10 pl-3"
                        >
                          <div className="py-1 space-y-0.5">
                            {item.children.map((child) => (
                              <a
                                key={child.label}
                                href={child.href}
                                onClick={closeDrawer}
                                className="block px-3 py-2.5 rounded-lg text-sm text-white/50 hover:text-white hover:bg-white/5 transition-colors min-h-[44px] flex items-center"
                              >
                                {child.label}
                              </a>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}

                {/* Simple links */}
                {[
                  { label: "Trajnime profesionale", href: "#trajnimet" },
                  { label: "Lajmet", href: "#" },
                  { label: "Kontakti", href: "#apliko" },
                ].map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={closeDrawer}
                    className="flex items-center px-3 py-3 rounded-xl text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors font-grotesk font-medium min-h-[44px] mb-1"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>

              {/* Drawer footer CTA */}
              <div className="px-4 py-5 border-t border-white/10 flex-shrink-0">
                <button
                  onClick={() => { closeDrawer(); onApply(); }}
                  className="w-full bg-[#8E4897] hover:bg-[#5C2F65] text-white font-semibold py-3.5 rounded-full transition-all duration-200 text-sm font-grotesk min-h-[52px]"
                >
                  Apliko tani
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      className={`w-3.5 h-3.5 flex-shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  );
}

function DropdownPanel({
  children,
  onMouseEnter,
  onMouseLeave,
}: {
  children: React.ReactNode;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.18 }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="absolute left-0 top-full mt-2 bg-[#1A1025] border border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden"
    >
      {children}
    </motion.div>
  );
}
