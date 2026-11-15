import { memo, useEffect } from "react";
import { X, Check, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { WeddingPricingApi } from "../../../services/api";

interface PricingBenefitsModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPackage: WeddingPricingApi;
}

export const PricingBenefitsModal = memo(function PricingBenefitsModal({
  isOpen,
  onClose,
  selectedPackage,
}: PricingBenefitsModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const allBenefits = selectedPackage.features && selectedPackage.features.length > 0
    ? selectedPackage.features
    : [
        `Galeri tersimpan aman selama ${selectedPackage.storage_days || 7} hari setelah acara`,
        `Dapat diakses hingga ${selectedPackage.guest_count || 50} tamu secara bersamaan`,
        `Jatah hingga ${selectedPackage.default_shots || 15} jepretan per-tamu`,
        "Download satu album penuh foto & video resolusi asli (HD)",
        "Scan QR Code meja tanpa perlu instal aplikasi apapun",
        "Tamu dapat saling memberi like dan ucapan selamat secara live",
        "Dukungan tampilan slideshow proyektor resepsi secara real-time",
        "Privasi terjamin dengan token enkripsi unik untuk setiap meja/acara",
      ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 15 }}
            className="relative w-full max-w-md rounded-[2rem] border border-border bg-card p-6 sm:p-7 shadow-2xl z-10 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-border">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#ffbd59]/20 text-[#ffbd59]">
                  <Sparkles size={16} />
                </div>
                <div>
                  <h3 className="font-space-bold text-base text-foreground">
                    Paket {selectedPackage.name}
                  </h3>
                  <p className="text-xs font-jakarta text-muted-foreground">
                    Semua yang kamu dapatkan dalam paket ini
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="p-1.5 rounded-full text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors cursor-pointer"
                aria-label="Tutup"
              >
                <X size={18} />
              </button>
            </div>

            {/* Benefit List */}
            <div className="py-4 space-y-3 max-h-[60vh] overflow-y-auto pr-1">
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
                className="w-full py-2.5 rounded-xl bg-secondary font-jakarta-bold text-xs text-foreground hover:bg-secondary/80 transition-colors cursor-pointer"
              >
                Tutup
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
});

