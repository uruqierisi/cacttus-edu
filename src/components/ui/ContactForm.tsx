"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface ContactFormProps {
  onSuccess?: () => void;
  compact?: boolean;
}

const interests = [
  "Zhvillimi i Ueb-it dhe Aplikacioneve Mobile",
  "Siguria Kibernetike",
  "Trajnime",
];

export default function ContactForm({ onSuccess, compact = false }: ContactFormProps) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", interest: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", form);
    setSubmitted(true);
    onSuccess?.();
  };

  const inputCls =
    "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 text-sm font-grotesk focus:outline-none focus:border-[#8E4897] focus:bg-white/8 transition-all duration-200";

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-10"
      >
        <div className="w-16 h-16 rounded-full bg-[#8E4897]/20 flex items-center justify-center mx-auto mb-4">
          <span className="text-3xl">✓</span>
        </div>
        <h3 className="font-sora text-xl font-bold text-white mb-2">Faleminderit!</h3>
        <p className="text-white/60 text-sm">
          Kërkesa juaj u pranua. Ekipi ynë do t&apos;ju kontaktojë së shpejti.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={compact ? "space-y-3" : "space-y-4"}>
      <div>
        <label htmlFor="name" className="block text-xs font-medium text-white/60 mb-1.5">
          Emri <span className="text-[#8E4897]">*</span>
        </label>
        <input
          id="name"
          type="text"
          required
          placeholder="Emri dhe mbiemri"
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          className={inputCls}
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-xs font-medium text-white/60 mb-1.5">
          Email <span className="text-[#8E4897]">*</span>
        </label>
        <input
          id="email"
          type="email"
          required
          placeholder="email@shembull.com"
          value={form.email}
          onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
          className={inputCls}
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-xs font-medium text-white/60 mb-1.5">
          Nr i telefonit <span className="text-[#8E4897]">*</span>
        </label>
        <input
          id="phone"
          type="tel"
          required
          placeholder="+383 4X XXX XXX"
          value={form.phone}
          onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
          className={inputCls}
        />
      </div>

      <div>
        <label htmlFor="interest" className="block text-xs font-medium text-white/60 mb-1.5">
          Interesimi?
        </label>
        <select
          id="interest"
          value={form.interest}
          onChange={(e) => setForm((f) => ({ ...f, interest: e.target.value }))}
          className={`${inputCls} appearance-none cursor-pointer`}
        >
          <option value="" className="bg-[#1A1025]">
            Zgjidhni një opsion
          </option>
          {interests.map((opt) => (
            <option key={opt} value={opt} className="bg-[#1A1025]">
              {opt}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="w-full mt-2 bg-[#8E4897] hover:bg-[#5C2F65] text-white font-semibold text-sm py-3 px-6 rounded-xl transition-colors duration-200"
      >
        KONTAKTO
      </button>
    </form>
  );
}
