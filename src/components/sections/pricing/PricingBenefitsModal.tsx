import { memo, useEffect } from "react";
import { createPortal } from "react-dom";
import { X, Check, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface PricingBenefitsModalProps {
  isOpen: boolean;
  onClose: () => void;
  guestCount: number;
  storageDays: number;
  shotsPerGuest: number;
  hasLifetimeAddon?: boolean;
}

export const PricingBenefitsModal = memo(function PricingBenefitsModal({
  isOpen,
  onClose,
  guestCount,
  storageDays,
  shotsPerGuest,
  hasLifetimeAddon,
}: PricingBenefitsModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    // Freeze body scroll & pause Lenis smooth scroll while modal is visible
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    if (window.__lenis) {
      window.__lenis.stop();
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
      if (window.__lenis) {
        window.__lenis.start();
      }
    };
  }, [isOpen, onClose]);

  const isUnlimited = guestCount >= 500;
  const isEffectiveLifetime = isUnlimited || hasLifetimeAddon;

  // Hardcoded comprehensive benefits
  const allBenefits = [
    isEffectiveLifetime
      ? "Gallery active & securely preserved forever (Lifetime) with no expiration"
      : `Gallery active & securely stored for ${storageDays || 7} days post-event`,
    `Instant camera access for up to ${guestCount >= 500 ? "Unlimited" : guestCount} guests simultaneously`,
    `Allocation of ${shotsPerGuest} photos per guest with vintage disposable film filters`,
    "Full wedding album download with uncompressed original resolution",
    "Instant table QR code scanning directly in phone browsers—zero app install required",
    "Guests can exchange real-time congratulatory wishes & heart reactions",
    "Live reception projector slideshow support for streaming moments in real time",
    "Enterprise-grade privacy secured with a unique encrypted event access token",
    "Print-ready table standee and QR card templates included",
    "Dedicated technical assistance before and throughout your special day",
  ];

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div
          data-lenis-prevent
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 overscroll-contain"
        >
          {/* Backdrop covering 100% of viewport including navbar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/65 backdrop-blur-sm z-0"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 15 }}
            data-lenis-prevent
            className="relative w-full max-w-md rounded-[2rem] border border-border bg-card p-6 sm:p-7 shadow-2xl z-10 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-border">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#ffbd59]/20 text-[#ffbd59]">
                  <Sparkles size={18} />
                </div>
                <div>
                  <h3 className="font-space-bold text-base text-foreground">
                    All Inclusions & Benefits
                  </h3>
                  <p className="text-xs font-jakarta text-muted-foreground">
                    Estimated for {guestCount >= 500 ? "Unlimited" : guestCount} Guests
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="p-1.5 rounded-full text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            {/* Benefit List with direct scrolling & mousewheel capability */}
            <div
              data-lenis-prevent
              className="py-4 space-y-3 max-h-[50vh] sm:max-h-[55vh] overflow-y-auto overscroll-contain touch-pan-y pr-2 select-text"
              style={{
                WebkitOverflowScrolling: "touch",
              }}
            >
              {allBenefits.map((benefit, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#ffbd59]/20 text-[#ffbd59] mt-0.5">
                    <Check size={12} strokeWidth={3} />
                  </div>
                  <span className="text-xs sm:text-sm font-jakarta text-foreground/90 leading-relaxed">
                    {benefit}
                  </span>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="pt-4 border-t border-border">
              <button
                type="button"
                onClick={onClose}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#ffbd59] to-[#f59e0b] font-jakarta-bold text-xs text-zinc-950 shadow-md transition-transform hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
              >
                Got It, Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
});
