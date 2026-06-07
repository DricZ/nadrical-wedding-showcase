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
      <div className="container flex items-center justify-between px-6 mx-auto md:px-12">
        <Link
          to="/"
          className="flex items-center gap-2 text-2xl tracking-tighter font-space-bold text-primary"
        >
          {settings?.wedding_logo || settings?.app_logo ? (
            <img
              src={settings.wedding_logo || settings?.app_logo}
              alt={settings?.app_name || "Logo"}
              className="object-contain w-auto h-8"
            />
          ) : (
            <>
              {settings?.app_name || "Nadrical"}
              <span className="text-xl text-muted-foreground font-space-regular">
                .wedding
              </span>
            </>
          )}
        </Link>

        {/* Desktop Nav */}
        <nav className="items-center hidden gap-8 md:flex">
          {navLinks.map((link) => {
            const isHash = link.href.includes("#");
            return isHash ? (
              <a
                key={link.name}
                href={link.href}
                className="text-sm transition-colors font-jakarta-medium text-foreground/80 hover:text-primary"
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
          <div className="w-px h-4 mx-2 bg-border"></div>
          <MainButton
            text="Mulai Buat Undangan"
            variant="primary"
            to="/#pricing"
          />
        </nav>

        {/* Mobile Nav Toggle */}
        <button
          className="p-2 -mr-2 md:hidden text-foreground"
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
            className="absolute left-0 flex flex-col w-full gap-6 p-6 border-b shadow-xl top-full bg-background border-border/40 md:hidden"
          >
            {navLinks.map((link) => {
              const isHash = link.href.includes("#");
              return isHash ? (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-lg transition-colors font-jakarta-medium text-foreground hover:text-primary"
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
