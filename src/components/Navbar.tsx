import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { MainButton } from "./ui/MainButton";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSettings } from "../contexts/SettingsContext";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { settings } = useSettings();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Fitur", href: "/#features" },
    { name: "Katalog Tema", href: "/themes" },
    { name: "Harga", href: "/#pricing" },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border/40 py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        <Link
          to="/"
          className="font-space-bold text-2xl tracking-tighter text-primary flex items-center gap-2"
        >
          {settings?.app_logo ? (
            <img
              src={settings.app_logo}
              alt={settings?.app_name || "Logo"}
              className="h-8 w-auto object-contain"
            />
          ) : (
            <>
              {settings?.app_name || "Nadrical"}
              <span className="text-muted-foreground font-space-regular text-xl">
                .wedding
              </span>
            </>
          )}
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isHash = link.href.includes("#");
            return isHash ? (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-jakarta-medium text-foreground/80 hover:text-primary transition-colors"
              >
                {link.name}
              </a>
            ) : (
              <Link
                key={link.name}
                to={link.href}
                className={`text-sm font-jakarta-medium transition-colors ${
                  location.pathname === link.href
                    ? "text-primary"
                    : "text-foreground/80 hover:text-primary"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
          <div className="h-4 w-px bg-border mx-2"></div>
          <MainButton
            text="Mulai Buat Undangan"
            variant="primary"
            to="/#pricing"
          />
        </nav>

        {/* Mobile Nav Toggle */}
        <button
          className="md:hidden text-foreground p-2 -mr-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-background border-b border-border/40 md:hidden flex flex-col p-6 gap-6 shadow-xl"
          >
            {navLinks.map((link) => {
              const isHash = link.href.includes("#");
              return isHash ? (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-lg font-jakarta-medium text-foreground hover:text-primary transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ) : (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`text-lg font-jakarta-medium transition-colors ${
                    location.pathname === link.href
                      ? "text-primary"
                      : "text-foreground hover:text-primary"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              );
            })}
            <div className="pt-4 border-t border-border/40">
              <MainButton
                text="Mulai Buat Undangan"
                fullWidth
                to="/#pricing"
                onClick={() => setIsMobileMenuOpen(false)}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
