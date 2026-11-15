import { useSettings } from "../contexts/SettingsContext";
import { Heart, Sparkles, MessageCircle, ArrowUp, Instagram } from "lucide-react";

export const Footer = () => {
  const { settings } = useSettings();
  const rawPhone = settings?.company_phone
    ? settings.company_phone.replace(/\D/g, "")
    : "6289514930800";
  const waUrl = `https://wa.me/${rawPhone}?text=${encodeURIComponent("Hello Nadrical Wedding, I'm interested in the live wedding gallery and guest photo sharing service.")}`;

  const scrollToTop = () => {
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="mt-auto transition-colors border-t bg-card/60 backdrop-blur-md border-border/70 py-14">
      <div className="container px-6 mx-auto md:px-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4 lg:grid-cols-5">
          {/* Brand & Description (2 cols on large) */}
          <div className="flex flex-col gap-4 md:col-span-2 lg:col-span-2">
            <a
              href="/"
              className="flex items-center gap-2 text-2xl tracking-tight transition-opacity font-space-bold text-primary hover:opacity-90"
            >
              {settings?.wedding_logo || settings?.app_logo ? (
                <img
                  src={settings?.wedding_logo || settings.app_logo}
                  alt={settings?.app_name || "Nadrical Wedding Logo"}
                  className="object-contain w-auto h-8"
                />
              ) : (
                <div className="flex items-center gap-2">
                  <span className="font-space-bold text-foreground">
                    {settings?.app_name || "Nadrical"}
                  </span>
                  <span className="font-serif italic text-primary">
                    .wedding
                  </span>
                </div>
              )}
            </a>

            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground font-jakarta">
              Real-time wedding photo sharing & digital live guest gallery
              platform. Capture every candid smile, laughter, and heartfelt wish
              without requiring guests to install an app.
            </p>

            <div className="flex items-center gap-2 pt-1 text-xs text-muted-foreground font-jakarta">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary border border-border/60 text-foreground/80 font-medium">
                <Sparkles size={13} className="text-primary" />
                Live Guest Moments
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary border border-border/60 text-foreground/80 font-medium">
                <Heart size={13} className="text-primary fill-primary" />
                Made for Your Special Day
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col gap-3">
            <h3 className="text-sm tracking-wide uppercase font-space-medium text-foreground">
              Navigation
            </h3>
            <ul className="flex flex-col gap-2.5">
              <li>
                <a
                  href="/#howto"
                  className="text-sm transition-colors font-jakarta text-muted-foreground hover:text-primary"
                >
                  How It Works
                </a>
              </li>
              <li>
                <a
                  href="/#features"
                  className="text-sm transition-colors font-jakarta text-muted-foreground hover:text-primary"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="/#pricing"
                  className="text-sm transition-colors font-jakarta text-muted-foreground hover:text-primary"
                >
                  Packages & Pricing
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div className="flex flex-col gap-3">
            <h3 className="text-sm tracking-wide uppercase font-space-medium text-foreground">
              Contact Us
            </h3>
            <ul className="flex flex-col gap-3">
              <li>
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm transition-colors font-jakarta text-muted-foreground hover:text-primary"
                >
                  <MessageCircle
                    size={15}
                    className="text-emerald-500 shrink-0"
                  />
                  <span>WhatsApp Consultation</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/lumentt.id?rpxt=dmxpeWdwMjE0M3Rl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm transition-colors font-jakarta text-muted-foreground hover:text-primary"
                >
                  <Instagram
                    size={15}
                    className="text-pink-500 shrink-0"
                  />
                  <span>Instagram @lumentt.id</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.tiktok.com/@lument.id?_r=1&_t=ZS-9BQvG8MqKd4"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm transition-colors font-jakarta text-muted-foreground hover:text-primary"
                >
                  <svg
                    viewBox="0 0 24 24"
                    width={15}
                    height={15}
                    fill="currentColor"
                    className="shrink-0"
                  >
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z" />
                  </svg>
                  <span>TikTok @lument.id</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="flex flex-col items-center justify-between gap-4 pt-8 mt-12 border-t sm:flex-row border-border/80">
          <p className="text-xs text-center font-jakarta text-muted-foreground sm:text-left">
            &copy; {new Date().getFullYear()}{" "}
            <span className="font-medium text-foreground">
              {settings?.copyright || settings?.app_name || "Nadrical Wedding"}
            </span>
            . All rights reserved.
          </p>

          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-border bg-secondary/80 text-xs font-jakarta text-foreground/80 hover:text-primary hover:border-primary/50 transition-all cursor-pointer shadow-xs active:scale-95"
            title="Back to top"
          >
            <span>Back to Top</span>
            <ArrowUp size={13} className="text-primary" />
          </button>
        </div>
      </div>
    </footer>
  );
};
