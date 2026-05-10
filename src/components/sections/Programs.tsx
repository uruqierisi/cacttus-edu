"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const programs = [
  {
    icon: "💻",
    title: "Zhvillues i Ueb-it dhe Aplikacioneve Mobile",
    description:
      "Bëhu zhvillues profesionist i plotë-stackit. Mëso React, Node.js, React Native dhe teknologjitë moderne të zhvillimit të softuerit.",
    tags: ["React", "Node.js", "Mobile", "2 vjet"],
    features: [
      "Programim me JavaScript/TypeScript",
      "Zhvillim Frontend dhe Backend",
      "Aplikacione Mobile (React Native)",
      "Projekt final i certifikuar",
    ],
    accent: "#8E4897",
    badge: "Akredituar MAS",
  },
  {
    icon: "🔐",
    title: "Siguria Kibernetike",
    description:
      "Bëhu ekspert në mbrojtjen e sistemeve informatike. Mëso ethical hacking, analizën e rreziqeve dhe menaxhimin e incidenteve kibernetike.",
    tags: ["Ethical Hacking", "Network Security", "2 vjet"],
    features: [
      "Analiza e Rreziqeve Kibernetike",
      "Penetration Testing",
      "Mbrojtja e Infrastrukturës",
      "Certifikime ndërkombëtare",
    ],
    accent: "#5C2F65",
    badge: "Akredituar MAS",
  },
];

export default function Programs() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="studimet" className="py-24 bg-[#0F0A14]" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 text-[#8E4897] text-sm font-semibold font-grotesk uppercase tracking-widest mb-4">
            <span className="w-6 h-px bg-[#8E4897]" />
            Studimet
            <span className="w-6 h-px bg-[#8E4897]" />
          </span>
          <h2 className="font-sora text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4">
            Studime Profesionale të{" "}
            <span className="text-gradient">Akredituara</span>
          </h2>
          <p className="text-white/40 max-w-xl mx-auto font-grotesk text-lg">
            Programe 2-vjeçare të dizajnuara me industrinë, me praktikë intensive dhe mundësi
            punësimi.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {programs.map((prog, i) => (
            <motion.div
              key={prog.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.15, duration: 0.55 }}
              className="group relative bg-[#1A1025] border border-white/8 rounded-2xl p-8 hover:border-[#8E4897]/40 transition-all duration-300 hover:shadow-xl hover:shadow-[#8E4897]/10 hover:-translate-y-1"
            >
              {/* Badge */}
              <div className="absolute top-6 right-6">
                <span className="text-xs font-semibold text-[#8E4897] bg-[#8E4897]/10 border border-[#8E4897]/20 px-3 py-1 rounded-full font-grotesk">
                  {prog.badge}
                </span>
              </div>

              {/* Icon */}
              <div className="w-14 h-14 rounded-2xl bg-[#8E4897]/10 flex items-center justify-center text-3xl mb-6">
                {prog.icon}
              </div>

              {/* Title */}
              <h3 className="font-sora font-bold text-xl text-white mb-3 pr-24">{prog.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed mb-6 font-grotesk">
                {prog.description}
              </p>

              {/* Features */}
              <ul className="space-y-2 mb-6">
                {prog.features.map((feat) => (
                  <li key={feat} className="flex items-center gap-2.5 text-sm text-white/60 font-grotesk">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8E4897] flex-shrink-0" />
                    {feat}
                  </li>
                ))}
              </ul>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {prog.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs text-white/50 bg-white/5 border border-white/10 px-3 py-1 rounded-full font-grotesk"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <a
                href="#apliko"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#8E4897] hover:text-[#B06BBD] transition-colors font-grotesk group-hover:gap-3"
              >
                Apliko tani
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>

              {/* Decorative gradient border bottom */}
              <div className="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-[#8E4897]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
