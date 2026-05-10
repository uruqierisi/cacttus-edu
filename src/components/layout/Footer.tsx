import { socialLinks } from "@/data/nav";

const footerLinks = [
  { label: "Rreth nesh", href: "#" },
  { label: "Projektet", href: "#" },
  { label: "Studime Profesionale", href: "#studimet" },
  { label: "Trajnime", href: "#trajnimet" },
  { label: "Biznese", href: "#" },
];

function SocialIcon({ type }: { type: string }) {
  const icons: Record<string, string> = {
    facebook: "M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z",
    twitter:
      "M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z",
    instagram:
      "M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01M6.5 19.5h11a3 3 0 003-3v-11a3 3 0 00-3-3h-11a3 3 0 00-3 3v11a3 3 0 003 3z",
    linkedin:
      "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 6a2 2 0 100-4 2 2 0 000 4z",
  };

  return (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
    >
      <path d={icons[type]} />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="bg-[#080510] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-10 mb-10">
          {/* Brand */}
          <div className="sm:col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-[#8E4897] flex items-center justify-center">
                <span className="text-white font-sora font-bold text-sm">C</span>
              </div>
              <span className="font-sora font-bold text-white text-lg">
                Cacttus <span className="text-[#8E4897]">Education</span>
              </span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed mb-4 max-w-xs">
              Cacttus Education është lider në Kosovë në ofrimin e edukimit profesional në fushën e
              teknologjisë informative.
            </p>
            <div className="space-y-1.5 text-sm text-white/40">
              <p>Rr. Bashkim Fehmiu, Arbëria 3, BC2/14 nr.4</p>
              <p>10000 Prishtinë, Kosovë</p>
              <a
                href="tel:+38338600237"
                className="block hover:text-[#8E4897] transition-colors"
              >
                +383 (0)38 600 237
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-sora font-semibold text-white text-sm mb-4">Navigimi</h3>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-white/40 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-sora font-semibold text-white text-sm mb-4">Rrjetet Sociale</h3>
            <div className="flex gap-3 sm:justify-start justify-center">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 text-white/50 hover:text-[#8E4897] hover:border-[#8E4897]/30 hover:bg-[#8E4897]/10 transition-all"
                >
                  <SocialIcon type={social.icon} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col items-center sm:flex-row sm:justify-between gap-2 text-center sm:text-left">
          <p className="text-white/30 text-xs font-grotesk">
            Cacttus Education 2025. Të gjitha drejtat e rezervuara.
          </p>
          <p className="text-white/20 text-xs font-grotesk">
            Ndërtuar me ♥ në Prishtinë
          </p>
        </div>
      </div>
    </footer>
  );
}
