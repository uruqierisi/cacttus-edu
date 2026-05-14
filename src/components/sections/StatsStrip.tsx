"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  { value: "1,000+", label: "Studentë" },
  { value: "95%", label: "Të diplomuar" },
  { value: "38K+", label: "Të trajnuar" },
  { value: "120+", label: "Kurse" },
];

export default function StatsStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <section className="border-y border-white/[0.06]" ref={ref}>
      <div className="mx-auto max-w-4xl px-5 py-14 sm:px-8">
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 text-center sm:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
              transition={{ delay: i * 0.07, duration: 0.4 }}
            >
              <p className="font-sora text-3xl font-extrabold text-white sm:text-4xl">
                {stat.value}
              </p>
              <p className="mt-2 font-grotesk text-sm text-white/40">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
