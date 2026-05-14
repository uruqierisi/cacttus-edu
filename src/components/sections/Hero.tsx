"use client";

import { motion, type Transition } from "framer-motion";

interface HeroProps {
  onApply: () => void;
}

const tx = (delay: number): Transition => ({ delay, duration: 0.5, ease: "easeOut" });
const reveal = (delay: number) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: tx(delay),
});

const miniStats = [
  { value: "1,000+", label: "Studentë aktivë" },
  { value: "88%", label: "Punësohen" },
  { value: "80+", label: "Bursa" },
];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Hero({ onApply }: HeroProps) {
  return (
    <section
      id="hero"
      className="relative flex min-h-[88vh] items-center overflow-hidden bg-[#0F0A14] sm:min-h-[82vh]"
    >
      {/* Single centered ambient glow — no blur mess */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0"
        style={{
          height: 520,
          background:
            "radial-gradient(ellipse 80% 55% at 50% -10%, rgba(142,72,151,0.11) 0%, transparent 72%)",
        }}
      />

      <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center px-5 py-20 text-center sm:px-8 sm:py-28">

        {/* Live badge */}
        <motion.div {...reveal(0)} className="mb-7">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#8E4897]/[0.22] bg-[#8E4897]/[0.07] px-4 py-1.5 font-grotesk text-[11px] font-semibold uppercase tracking-wide text-[#C088CB]">
            <span className="relative flex h-1.5 w-1.5 flex-shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
            </span>
            Regjistrime të hapura
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          {...reveal(0.08)}
          className="mb-5 font-sora font-extrabold leading-[1.08] tracking-tight text-white"
          style={{ fontSize: "clamp(2.2rem, 7vw, 3.75rem)" }}
        >
          Fillo karrierën tënde{" "}
          <span className="whitespace-nowrap">
            në <span className="text-gradient">teknologji</span>
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          {...reveal(0.16)}
          className="mb-9 max-w-[460px] text-[0.9375rem] leading-[1.78] text-white/48 sm:text-base"
        >
          Studime profesionale 2-vjeçare të akredituara dhe trajnime
          intensive në Web Development, Mobile dhe Siguri Kibernetike.
        </motion.p>

        {/* CTAs */}
        <motion.div
          {...reveal(0.24)}
          className="mb-10 flex w-full flex-col gap-3 sm:w-auto sm:flex-row"
        >
          <a
            href="#studimet"
            className="inline-flex h-[42px] items-center justify-center rounded-full bg-[#8E4897] px-7 font-grotesk text-[13px] font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] ring-1 ring-inset ring-white/[0.08] transition-all hover:bg-[#7B3E88] hover:shadow-[0_0_28px_rgba(142,72,151,0.2)] active:scale-[.98]"
          >
            Zbulo Programet
          </a>
          <a
            href="#trajnimet"
            className="inline-flex h-[42px] items-center justify-center gap-1.5 rounded-full border border-white/10 px-7 font-grotesk text-[13px] font-semibold text-white/60 transition-all hover:border-white/20 hover:bg-white/[0.04] hover:text-white active:scale-[.98]"
          >
            Shiko Trajnimet
            <svg
              className="h-3.5 w-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </motion.div>

        {/* Social proof */}
        <motion.div {...reveal(0.32)} className="flex items-center gap-3">
          <div className="flex -space-x-2">
            {(["A", "B", "M", "L"] as const).map((letter, i) => (
              <div
                key={letter}
                className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-[#0F0A14] bg-[#8E4897] font-grotesk text-[10px] font-bold text-white"
                style={{ opacity: 1 - i * 0.16 }}
              >
                {letter}
              </div>
            ))}
          </div>
          <p className="font-grotesk text-[13px] text-white/40">
            <span className="font-semibold text-white/60">1,000+</span>{" "}
            studentë kanë nisur karrierën
          </p>
        </motion.div>

        {/* Mini stats grid */}
        <motion.div {...reveal(0.4)} className="mt-14 w-full sm:max-w-xs">
          <div className="overflow-hidden rounded-2xl border border-white/[0.07]">
            <div className="grid grid-cols-3">
              {miniStats.map((s, i) => (
                <div
                  key={s.label}
                  className={`bg-white/[0.03] px-3 py-5 text-center${
                    i > 0 ? " border-l border-white/[0.07]" : ""
                  }`}
                >
                  <p className="font-sora text-lg font-bold text-white">{s.value}</p>
                  <p className="mt-0.5 font-grotesk text-[11px] leading-tight text-white/40">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
