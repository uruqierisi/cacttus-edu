"use client";

import { motion, type Transition } from "framer-motion";

const floatCards = [
  { value: "1000+", label: "Studentë në programet profesionale", icon: "👨‍💻", bar: 80 },
  { value: "88%", label: "E studentëve të punësuar", icon: "💼", bar: 88 },
  { value: "80+", label: "Bursa të ofruara", icon: "🎓", bar: 65 },
];

const tx = (delay: number): Transition => ({ delay, duration: 0.55, ease: "easeOut" });
const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: tx(delay),
});

interface HeroProps {
  onApply: () => void;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Hero({ onApply }: HeroProps) {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden bg-[#0F0A14]"
    >
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#8E4897]/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#5C2F65]/10 blur-[100px] rounded-full" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(142,72,151,0.5) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(142,72,151,0.5) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-8 pb-20">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          {/* Left: Text content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <motion.div
              {...fadeUp(0)}
              className="inline-flex items-center gap-2 bg-[#8E4897]/10 border border-[#8E4897]/30 rounded-full px-4 py-1.5 mb-5"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
              </span>
              <span className="text-xs sm:text-sm text-white/70 font-grotesk font-medium">
                Institucioni lider në TIK — Kosovë
              </span>
            </motion.div>

            {/* Headline — 2.2rem mobile → 4rem desktop */}
            <motion.h1
              {...fadeUp(0.12)}
              className="font-sora font-extrabold text-white leading-[1.1] mb-5"
              style={{ fontSize: "clamp(2rem, 6vw, 3.75rem)" }}
            >
              Fillo karrierën{" "}
              <span className="text-gradient">tënde në teknologji</span>{" "}
              sot
            </motion.h1>

            {/* Subtext */}
            <motion.p
              {...fadeUp(0.24)}
              className="text-white/50 text-base sm:text-lg leading-relaxed mb-7 font-grotesk max-w-lg mx-auto lg:mx-0"
            >
              Studime profesionale 2-vjeçare të akredituara dhe trajnime profesionale në Web,
              Mobile Development dhe Siguri Kibernetike.
            </motion.p>

            {/* CTAs — stacked on mobile, side-by-side on sm+ */}
            <motion.div
              {...fadeUp(0.36)}
              className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start"
            >
              <a
                href="#studimet"
                className="inline-flex items-center justify-center gap-2 bg-[#8E4897] hover:bg-[#5C2F65] text-white font-semibold px-7 py-3.5 rounded-full transition-all duration-200 shadow-lg shadow-[#8E4897]/25 font-grotesk min-h-[52px]"
              >
                Zbulo Programet
              </a>
              <a
                href="#trajnimet"
                className="inline-flex items-center justify-center gap-2 bg-transparent border border-white/20 text-white hover:border-white/50 hover:bg-white/5 font-semibold px-7 py-3.5 rounded-full transition-all duration-200 font-grotesk min-h-[52px]"
              >
                Shiko Trajnimet
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </motion.div>

            {/* Trust avatars */}
            <motion.div
              {...fadeUp(0.48)}
              className="flex items-center gap-4 mt-7 justify-center lg:justify-start"
            >
              <div className="flex -space-x-2">
                {(["A", "B", "M", "L"] as const).map((letter, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-[#0F0A14] flex items-center justify-center text-xs font-bold text-white bg-[#8E4897]"
                    style={{ opacity: 1 - i * 0.15 }}
                  >
                    {letter}
                  </div>
                ))}
              </div>
              <p className="text-sm text-white/40 font-grotesk">
                <span className="text-white font-semibold">1000+</span> studentë na kanë besuar
              </p>
            </motion.div>

            {/* Mobile stat cards — horizontal scroll, hidden on lg */}
            <motion.div
              {...fadeUp(0.6)}
              className="mt-8 lg:hidden"
            >
              <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2 -mx-4 px-4">
                {floatCards.map((card) => (
                  <div
                    key={card.value}
                    className="flex-shrink-0 w-44 bg-[#1A1025] border border-[#8E4897]/20 rounded-2xl p-4 shadow-xl"
                  >
                    <div className="flex items-center gap-2.5 mb-2">
                      <span className="text-2xl">{card.icon}</span>
                      <div>
                        <p className="font-sora font-extrabold text-xl text-white leading-none">{card.value}</p>
                      </div>
                    </div>
                    <p className="text-white/50 text-xs font-grotesk leading-tight mb-2">{card.label}</p>
                    <div className="h-1 rounded-full bg-white/5 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-[#8E4897] to-[#B06BBD]"
                        style={{ width: `${card.bar}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right: Floating stat cards — desktop only */}
          <div className="relative hidden lg:flex items-center justify-center h-96">
            {floatCards.map((card, i) => (
              <motion.div
                key={card.value}
                initial={{ opacity: 0, scale: 0.8, x: 30 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.2, duration: 0.5, ease: "easeOut" }}
                className={`absolute bg-[#1A1025] border border-[#8E4897]/20 rounded-2xl p-5 shadow-xl
                  ${i === 0 ? "top-0 right-8 w-52 animate-float" : ""}
                  ${i === 1 ? "top-1/2 -translate-y-1/2 right-0 w-56 animate-float-delayed" : ""}
                  ${i === 2 ? "bottom-0 right-12 w-48 animate-float" : ""}
                `}
                style={{ animationDelay: `${i * 1.5}s` }}
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{card.icon}</span>
                  <div>
                    <p className="font-sora font-extrabold text-2xl text-white">{card.value}</p>
                    <p className="text-white/50 text-xs mt-0.5 font-grotesk leading-tight">
                      {card.label}
                    </p>
                  </div>
                </div>
                <div className="mt-3 h-1 rounded-full bg-white/5 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#8E4897] to-[#B06BBD]"
                    style={{ width: `${card.bar}%` }}
                  />
                </div>
              </motion.div>
            ))}

            <div className="w-64 h-64 rounded-full border border-[#8E4897]/10 flex items-center justify-center">
              <div className="w-48 h-48 rounded-full border border-[#8E4897]/20 flex items-center justify-center">
                <div className="w-32 h-32 rounded-full bg-[#8E4897]/10 flex items-center justify-center">
                  <span className="text-5xl">🎓</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-white/30 text-xs font-grotesk">Zbulo më shumë</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-2 rounded-full bg-[#8E4897]" />
        </motion.div>
      </motion.div>
    </section>
  );
}
