"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  { value: "1000+", label: "Studentë" },
  { value: "95%", label: "Të diplomuar" },
  { value: "38K+", label: "Të trajnuar" },
  { value: "120+", label: "Kurse" },
];

export default function StatsStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section className="bg-[#080510] border-y border-white/5 py-12" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="text-center"
            >
              <div className="font-sora text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-1">
                <span className="text-gradient">{stat.value}</span>
              </div>
              <div className="text-white/40 text-xs sm:text-sm font-grotesk">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
