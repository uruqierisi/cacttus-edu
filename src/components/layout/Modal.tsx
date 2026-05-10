"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ContactForm from "@/components/ui/ContactForm";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Modal({ isOpen, onClose }: ModalProps) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[60]"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Modal container — full screen mobile, centered desktop */}
          <motion.div
            className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center sm:p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <motion.div
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 32 }}
              className="
                w-full sm:max-w-md
                bg-[#1A1025] border-t sm:border border-white/10
                rounded-t-3xl sm:rounded-2xl
                shadow-2xl p-6 pb-8 sm:pb-6
                relative max-h-[92vh] overflow-y-auto
              "
              onClick={(e) => e.stopPropagation()}
            >
              {/* Drag handle (mobile) */}
              <div className="sm:hidden w-10 h-1 rounded-full bg-white/20 mx-auto mb-5" />

              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-xl text-white/40 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Mbylle"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Header */}
              <div className="mb-6">
                <div className="w-10 h-10 rounded-xl bg-[#8E4897]/20 flex items-center justify-center mb-4">
                  <span className="text-xl">🚀</span>
                </div>
                <h2 id="modal-title" className="font-sora text-xl font-bold text-white mb-2">
                  Gati me fillu karrierën në teknologji?
                </h2>
                <p className="text-white/50 text-sm leading-relaxed">
                  Përgjigjju pyetjeve të mëposhtme dhe ekspertët tanë do ju kontaktojnë.
                </p>
              </div>

              <ContactForm onSuccess={() => setTimeout(onClose, 2000)} compact />
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
