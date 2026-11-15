import { memo, useEffect } from "react";
import { X, Check, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface PricingBenefitsModalProps {
  isOpen: boolean;
  onClose: () => void;
  guestCount: number;
  storageDays: number;
  shotsPerGuest: number;
}

export const PricingBenefitsModal = memo(function PricingBenefitsModal({
  isOpen,
  onClose,
  guestCount,
  storageDays,
  shotsPerGuest,
}: PricingBenefitsModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Hardcoded comprehensive benefits
  const allBenefits = [
    `Galeri aktif tersimpan aman selama ${storageDays || 7} hari setelah acara`,
    `Akses kamera live hingga ${guestCount >= 500 ? "500+" : guestCount} tamu secara bersamaan`,
    `Jatah jepretan ${shotsPerGuest} foto per tamu dengan filter disposable vintage`,
    "Download satu album penuh foto resolusi original asli tanpa kompresi",
    "Scan QR Code meja langsung di HP tamu tanpa perlu install aplikasi apapun",
    "Tamu dapat saling memberi ucapan doa & likes secara real-time",
    "Dukungan live slideshow foto para tamu di layar proyektor resepsi",
    "Privasi terjamin dengan token enkripsi unik khusus acara pernikahan Anda",
    "Panduan cetak nomor meja & template kartu QR siap pakai",
    "Bantuan teknis responsif sebelum dan selama hari H acara",
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
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#ffbd59]/20 text-[#ffbd59]">
                  <Sparkles size={18} />
                </div>
                <div>
                  <h3 className="font-space-bold text-base text-foreground">
                    Semua Keuntungan Termasuk
                  </h3>
                  <p className="text-xs font-jakarta text-muted-foreground">
                    Estimasi untuk {guestCount >= 500 ? "500+" : guestCount} Tamu Undangan
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
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#ffbd59] to-[#f59e0b] font-jakarta-bold text-xs text-zinc-950 shadow-md transition-transform hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
              >
                Mengerti, Tutup
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
});
