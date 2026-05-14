"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { trainings, trainingCategories, cities } from "@/data/trainings";
import type { TrainingCategory, City } from "@/types";

const formatBadge: Record<string, string> = {
  Online: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  Klasë: "bg-green-500/10 text-green-400 border-green-500/20",
  Hibrid: "bg-orange-500/10 text-orange-400 border-orange-500/20",
};

export default function Trainings() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const [activeCategory, setActiveCategory] = useState<TrainingCategory>("Programim");
  const [activeCity, setActiveCity] = useState<City>("Të gjitha");

  const filtered = trainings.filter((t) => {
    const catMatch = t.category === activeCategory;
    const cityMatch =
      activeCity === "Të gjitha" ||
      t.city === activeCity ||
      (activeCity === "Online" && t.format === "Online");
    return catMatch && cityMatch;
  });

  return (
    <section id="trajnimet" className="py-16 sm:py-24 bg-[#080510]" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <span className="inline-flex items-center gap-2 text-[#8E4897] text-sm font-semibold font-grotesk uppercase tracking-widest mb-4">
            <span className="w-6 h-px bg-[#8E4897]" />
            Trajnimet
            <span className="w-6 h-px bg-[#8E4897]" />
          </span>
          <h2
            className="font-sora font-extrabold text-white mb-4"
            style={{ fontSize: "clamp(1.75rem, 5vw, 3rem)" }}
          >
            Trajnime <span className="text-gradient">Profesionale</span>
          </h2>
          <p className="text-white/40 max-w-lg mx-auto font-grotesk text-sm sm:text-base">
            Zgjidhni trajnimin që i përshtatet qëllimeve tuaja profesionale.
          </p>
        </motion.div>

        {/* Category filters — horizontal scroll on mobile, no wrap */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ delay: 0.1, duration: 0.45 }}
          className="mb-3"
        >
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap sm:justify-center">
            {trainingCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex-shrink-0 px-4 py-2.5 rounded-full text-sm font-medium font-grotesk transition-all duration-200 border min-h-[44px] whitespace-nowrap ${
                  activeCategory === cat
                    ? "bg-[#8E4897] border-[#8E4897] text-white shadow-lg shadow-[#8E4897]/20"
                    : "bg-white/5 border-white/10 text-white/50 hover:text-white hover:border-white/30"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        {/* City filters — wraps on mobile */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ delay: 0.15, duration: 0.4 }}
          className="flex flex-wrap gap-2 justify-center mb-8"
        >
          {cities.map((city) => (
            <button
              key={city}
              onClick={() => setActiveCity(city)}
              className={`px-3 py-2 rounded-lg text-xs font-medium font-grotesk transition-all duration-200 border min-h-[36px] ${
                activeCity === city
                  ? "bg-[#8E4897]/20 border-[#8E4897]/50 text-[#B06BBD]"
                  : "bg-transparent border-white/10 text-white/40 hover:text-white/60 hover:border-white/20"
              }`}
            >
              {city}
            </button>
          ))}
        </motion.div>

        {/* Table — horizontal scroll on mobile */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-[#120D1C] border border-white/[0.07] rounded-2xl overflow-hidden"
        >
          <div className="overflow-x-auto scrollbar-hide">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b border-white/[0.07]">
                  <th className="text-left px-4 sm:px-6 py-4 text-xs font-semibold text-white/40 uppercase tracking-wider font-grotesk">
                    Trajnimi
                  </th>
                  <th className="text-left px-3 py-4 text-xs font-semibold text-white/40 uppercase tracking-wider font-grotesk hidden sm:table-cell">
                    Fillimi
                  </th>
                  <th className="text-left px-3 py-4 text-xs font-semibold text-white/40 uppercase tracking-wider font-grotesk">
                    Forma
                  </th>
                  <th className="text-left px-3 py-4 text-xs font-semibold text-white/40 uppercase tracking-wider font-grotesk hidden md:table-cell">
                    Orë
                  </th>
                  <th className="text-left px-3 py-4 text-xs font-semibold text-white/40 uppercase tracking-wider font-grotesk hidden lg:table-cell">
                    Instruktori
                  </th>
                  <th className="px-3 py-4 text-xs font-semibold text-white/40 uppercase tracking-wider font-grotesk hidden sm:table-cell">
                    Shkarko
                  </th>
                  <th className="px-3 py-4 text-xs font-semibold text-white/40 uppercase tracking-wider font-grotesk">
                    Apliko
                  </th>
                </tr>
              </thead>
              <tbody>
                  {filtered.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="text-center py-14 text-white/30 font-grotesk text-sm">
                        Nuk ka trajnime të disponueshme për filtrat e zgjedhur.
                      </td>
                    </tr>
                  ) : (
                    filtered.map((training) => (
                      <tr
                        key={training.id}
                        className="border-b border-white/[0.05] hover:bg-white/[0.025] transition-colors group"
                      >
                        <td className="px-4 sm:px-6 py-4">
                          <span className="text-sm font-medium text-white font-grotesk group-hover:text-[#B06BBD] transition-colors leading-snug">
                            {training.name}
                          </span>
                        </td>
                        <td className="px-3 py-4 hidden sm:table-cell">
                          <span className="text-sm text-white/40 font-grotesk whitespace-nowrap">{training.startDate}</span>
                        </td>
                        <td className="px-3 py-4">
                          <span
                            className={`text-xs font-medium px-2.5 py-1 rounded-full border font-grotesk whitespace-nowrap ${formatBadge[training.format]}`}
                          >
                            {training.format}
                          </span>
                        </td>
                        <td className="px-3 py-4 hidden md:table-cell">
                          <span className="text-sm text-white/40 font-grotesk">
                            {training.hours ? `${training.hours}h` : "—"}
                          </span>
                        </td>
                        <td className="px-3 py-4 hidden lg:table-cell">
                          <span className="text-sm text-white/50 font-grotesk whitespace-nowrap">
                            {training.instructor ?? "—"}
                          </span>
                        </td>
                        <td className="px-3 py-4 hidden sm:table-cell">
                          <button
                            className="flex items-center justify-center w-8 h-8 text-white/30 hover:text-[#8E4897] transition-colors"
                            aria-label={`Shkarko syllabus për ${training.name}`}
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                              />
                            </svg>
                          </button>
                        </td>
                        <td className="px-3 py-4">
                          <a
                            href="#apliko"
                            className="inline-flex items-center justify-center px-3 py-2 rounded-lg text-xs font-semibold text-[#8E4897] hover:text-[#B06BBD] hover:bg-[#8E4897]/10 transition-colors font-grotesk whitespace-nowrap min-h-[36px]"
                          >
                            Apliko →
                          </a>
                        </td>
                      </tr>
                    ))
                  )}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
