"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AnnouncementBarProps {
  onApply: () => void;
}

export default function AnnouncementBar({ onApply }: AnnouncementBarProps) {
  const [dismissed, setDismissed] = useState(false);

  return (
    <AnimatePresence>
      {!dismissed && (
        <motion.div
          initial={{ height: "auto" }}
          exit={{ height: 0, opacity: 0 }}
          className="bg-gradient-to-r from-[#5C2F65] via-[#8E4897] to-[#5C2F65] text-white overflow-hidden relative"
        >
          <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-center gap-3 text-sm font-grotesk">
            <span className="font-medium text-center">
              🎓 Apliko për <strong>Bursë deri në 80%</strong> — Mundësi e kufizuar!
            </span>
            <button
              onClick={onApply}
              className="bg-white text-[#8E4897] font-bold text-xs px-4 py-1.5 rounded-full hover:bg-white/90 transition-colors flex-shrink-0"
            >
              APLIKO TANI
            </button>
          </div>
          <button
            onClick={() => setDismissed(true)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors p-1"
            aria-label="Mbylle"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
