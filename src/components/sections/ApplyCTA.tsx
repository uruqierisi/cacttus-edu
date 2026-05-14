"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import ContactForm from "@/components/ui/ContactForm";

export default function ApplyCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="apliko"
      className="relative py-16 sm:py-24 overflow-hidden"
      ref={ref}
      style={{
        background: "linear-gradient(135deg, #1A1025 0%, #2D1035 50%, #1A1025 100%)",
      }}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#8E4897]/15 blur-[100px] rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#5C2F65]/15 blur-[100px] rounded-full translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          {/* Left: text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.55 }}
          >
            <div className="inline-flex items-center gap-2 bg-[#8E4897]/20 border border-[#8E4897]/30 rounded-full px-4 py-1.5 mb-6">
              <span className="text-sm text-[#B06BBD] font-medium font-grotesk">🚀 Fillo Tani</span>
            </div>
            <h2 className="font-sora font-extrabold text-white mb-6 leading-tight" style={{ fontSize: "clamp(2rem, 5vw, 3rem)" }}>
              Apliko{" "}
              <span className="text-gradient">Tani!</span>
            </h2>
            <p className="text-white/50 text-base sm:text-lg leading-relaxed font-grotesk mb-8">
              Bëhu pjesë e komunitetit tonë prej mbi 1000 studentësh. Ekspertët tanë do të
              të udhëheqin hap pas hapi drejt karrierës tënde në teknologji.
            </p>

            <div className="space-y-4">
              {[
                { icon: "🎓", text: "Bursa deri në 80% të disponueshme" },
                { icon: "💼", text: "88% e studentëve punësohen pas diplomimit" },
                { icon: "📍", text: "Klasa në Prishtinë, Prizren dhe Online" },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-3">
                  <span className="text-xl w-8 text-center">{item.icon}</span>
                  <span className="text-white/60 text-sm font-grotesk">{item.text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ delay: 0.15, duration: 0.55 }}
          >
            <div className="bg-[#0F0A14] border border-white/10 rounded-2xl p-5 sm:p-8 shadow-2xl">
              <h3 className="font-sora font-bold text-xl text-white mb-1">Na kontakto</h3>
              <p className="text-white/40 text-sm mb-6 font-grotesk">
                Plotëso formularin dhe ne do të të kontaktojmë brenda 24 orësh.
              </p>
              <ContactForm />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
