import { useSettings } from "../contexts/SettingsContext";
import { Heart, Sparkles, MessageCircle, Globe, Mail, ArrowUp } from "lucide-react";

export const Footer = () => {
  const { settings } = useSettings();
  const rawPhone = settings?.company_phone ? settings.company_phone.replace(/\D/g, "") : "6289514930800";
  const waUrl = `https://wa.me/${rawPhone}?text=${encodeURIComponent("Hello Nadrical Wedding, I'm interested in the live wedding gallery and guest photo sharing service.")}`;
  const companyWebsite = settings?.company_website || "nadrical.my.id";

  const scrollToTop = () => {
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="mt-auto border-t bg-card/60 backdrop-blur-md border-border/70 py-14 transition-colors">
      <div className="container px-6 mx-auto md:px-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4 lg:grid-cols-5">
          {/* Brand & Description (2 cols on large) */}
          <div className="md:col-span-2 lg:col-span-2 flex flex-col gap-4">
            <a
              href="/"
              className="flex items-center gap-2 text-2xl font-space-bold tracking-tight text-primary transition-opacity hover:opacity-90"
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
                  <span className="font-serif italic text-primary">.wedding</span>
                </div>
              )}
            </a>

            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground font-jakarta">
              Real-time wedding photo sharing & digital live guest gallery platform. Capture every candid smile, laughter, and heartfelt wish without requiring guests to install an app.
            </p>

            <div className="flex items-center gap-2 text-xs text-muted-foreground font-jakarta pt-1">
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
            <h3 className="font-space-medium text-sm text-foreground tracking-wide uppercase">
              Navigation
            </h3>
            <ul className="flex flex-col gap-2.5">
              <li>
                <a
                  href="/#howto"
                  className="text-sm font-jakarta text-muted-foreground hover:text-primary transition-colors"
                >
                  How It Works
                </a>
              </li>
              <li>
                <a
                  href="/#features"
                  className="text-sm font-jakarta text-muted-foreground hover:text-primary transition-colors"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="/#pricing"
                  className="text-sm font-jakarta text-muted-foreground hover:text-primary transition-colors"
                >
                  Packages & Pricing
                </a>
              </li>
            </ul>
          </div>

          {/* Highlights */}
          <div className="flex flex-col gap-3">
            <h3 className="font-space-medium text-sm text-foreground tracking-wide uppercase">
              Highlights
            </h3>
            <ul className="flex flex-col gap-2.5 text-sm font-jakarta text-muted-foreground">
              <li>Instant Table QR Scan</li>
              <li>No App Download Needed</li>
              <li>Full HD Album Download</li>
              <li>Live Reception Slideshow</li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div className="flex flex-col gap-3">
            <h3 className="font-space-medium text-sm text-foreground tracking-wide uppercase">
              Contact Us
            </h3>
            <ul className="flex flex-col gap-3">
              <li>
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-jakarta text-muted-foreground hover:text-primary transition-colors"
                >
                  <MessageCircle size={15} className="text-emerald-500 shrink-0" />
                  <span>WhatsApp Consultation</span>
                </a>
              </li>
              <li>
                <a
                  href={`https://${companyWebsite.replace(/^https?:\/\//, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-jakarta text-muted-foreground hover:text-primary transition-colors"
                >
                  <Globe size={15} className="text-primary shrink-0" />
                  <span>{companyWebsite}</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:halo@nadrical.my.id"
                  className="inline-flex items-center gap-2 text-sm font-jakarta text-muted-foreground hover:text-primary transition-colors"
                >
                  <Mail size={15} className="text-amber-500 shrink-0" />
                  <span>halo@nadrical.my.id</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 mt-12 border-t border-border/80">
          <p className="text-xs font-jakarta text-muted-foreground text-center sm:text-left">
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
