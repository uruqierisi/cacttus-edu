"use client";

import { useState } from "react";

interface AnnouncementBarProps {
  onApply: () => void;
}

export default function AnnouncementBar({ onApply }: AnnouncementBarProps) {
  const [dismissed, setDismissed] = useState(false);

  return (
    <div
      style={{
        height: dismissed ? 0 : "auto",
        opacity: dismissed ? 0 : 1,
        overflow: "hidden",
        transition: "height 0.35s ease, opacity 0.2s ease",
      }}
    >
      <div className="relative border-b border-[#8E4897]/[0.18] bg-[#0A0710]">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-2.5 px-10 py-2.5 text-center sm:gap-3">
          <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#8E4897]" />
          <p className="font-grotesk text-xs text-white/50 sm:text-[13px]">
            Apliko për{" "}
            <span className="font-semibold text-white/75">Bursë deri në 80%</span>
            {" "}— Mundësi e kufizuar!
          </p>
          <button
            onClick={onApply}
            className="flex-shrink-0 rounded-full border border-[#8E4897]/30 px-3.5 py-1 font-grotesk text-[11px] font-semibold text-[#C088CB] transition-all hover:border-[#8E4897]/60 hover:bg-[#8E4897]/10"
          >
            Apliko →
          </button>
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-white/25 transition-colors hover:text-white/60"
          aria-label="Mbylle"
        >
          <svg
            className="h-3 w-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
