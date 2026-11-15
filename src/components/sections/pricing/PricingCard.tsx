import { memo, useCallback } from "react";
import { Check, ArrowRight, Sparkles, HelpCircle, Camera, Clock } from "lucide-react";
import NumberFlow from "@number-flow/react";
import confetti from "canvas-confetti";
import type { WeddingPricingApi } from "../../../services/api";

interface PricingCardProps {
  pkg: WeddingPricingApi;
  currentGuests: number;
  calculatedPrice: number;
  normalPrice: number;
  calculatedPerGuest: number;
  selectedShots: number;
  onSelectShots: (shots: number) => void;
  onOpenBenefits: () => void;
  waNumber: string;
}

export const PricingCard = memo(function PricingCard({
  pkg,
  currentGuests,
  calculatedPrice,
  normalPrice,
  calculatedPerGuest,
  selectedShots,
  onSelectShots,
  onOpenBenefits,
  waNumber,
}: PricingCardProps) {
  const isHeirloom = pkg.slug?.toLowerCase().includes("heirloom") || pkg.name.toLowerCase().includes("heirloom");
  const isFeatured = isHeirloom || pkg.is_popular;

  const discountPercent = pkg.discount_percentage || (isHeirloom ? 30 : 35);
  const shotsOptions = (pkg.shots_options && pkg.shots_options.length > 0
    ? pkg.shots_options.map(Number)
    : isHeirloom
    ? [15, 25, 50]
    : [10, 15, 25]
  ).filter((n) => !isNaN(n));

  const formatIdrText = (val: number) =>
    new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(val);

  const displayPriceText = formatIdrText(calculatedPrice);

  const handleCtaClick = useCallback(() => {
    if (isFeatured) {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.7 },
        colors: ["#ffbd59", "#f59e0b", "#fbbf24", "#ffffff"],
      });
    }
  }, [isFeatured]);

  const waMessage = encodeURIComponent(
    `Halo Nadrical Wedding! Saya tertarik memesan paket *${pkg.name}* untuk estimasi *${currentGuests} tamu* (${selectedShots} foto/tamu). Estimasi investasi: *${displayPriceText}*. Boleh info langkah pendaftarannya?`
  );
  const waUrl = `https://wa.me/${waNumber}?text=${waMessage}`;

  return (
    <div
      className={`relative flex flex-col w-full rounded-[2.5rem] p-7 sm:p-9 transition-all duration-300 ${
        isFeatured
          ? "border-2 border-[#ffbd59] bg-card/95 dark:bg-zinc-900/95 shadow-2xl shadow-[#ffbd59]/15 lg:-translate-y-2 ring-4 ring-[#ffbd59]/10"
          : "border border-border/80 bg-card/80 dark:bg-zinc-900/70 shadow-lg hover:border-border hover:shadow-xl"
      }`}
    >
      {/* Top Floating Badge */}
      {pkg.badge && (
        <div className="absolute -top-3.5 left-8">
          <span
            className={`inline-flex items-center gap-1.5 px-4 py-1 text-xs font-jakarta-bold rounded-full shadow-md uppercase tracking-wider ${
              isFeatured
                ? "bg-gradient-to-r from-amber-500 to-[#ffbd59] text-zinc-950 font-bold"
                : "bg-muted text-muted-foreground border border-border"
            }`}
          >
            <Sparkles size={12} />
            <span>{pkg.badge}</span>
          </span>
        </div>
      )}

      {/* Package Header */}
      <div className="pt-2 mb-6">
        <h4 className="text-2xl sm:text-3xl font-serif font-bold text-foreground tracking-tight">
          Paket {pkg.name}
        </h4>
        <p className="text-xs sm:text-sm text-muted-foreground mt-1.5 leading-relaxed">
          {pkg.description ||
            (isHeirloom
              ? "Pilihan terlengkap untuk pesta pernikahan megah dengan kapasitas foto & masa aktif ekstra."
              : "Pilihan favorit untuk mengabadikan momen intim & interaktif bersama para tamu terdekat.")}
        </p>
      </div>

      {/* Price Section with Animated Rolling Numbers */}
      <div className="p-5 rounded-2xl bg-muted/40 dark:bg-zinc-950/40 border border-border/50 mb-6">
        <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground mb-1">
          <span className="line-through">
            <NumberFlow
              value={normalPrice}
              format={{ style: "currency", currency: "IDR", maximumFractionDigits: 0 }}
              locales="id-ID"
            />
          </span>
          <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-rose-500/15 text-rose-600 dark:text-rose-400">
            -{discountPercent}%
          </span>
        </div>

        <div className="flex items-baseline gap-1 text-3xl sm:text-4xl md:text-5xl font-jakarta-bold text-foreground">
          <NumberFlow
            value={calculatedPrice}
            format={{ style: "currency", currency: "IDR", maximumFractionDigits: 0 }}
            locales="id-ID"
          />
        </div>

        <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
          <span className="font-medium text-amber-700 dark:text-[#ffbd59] flex items-center gap-1">
            Hanya{" "}
            <NumberFlow
              value={calculatedPerGuest}
              format={{ style: "currency", currency: "IDR", maximumFractionDigits: 0 }}
              locales="id-ID"
              className="font-bold inline"
            />{" "}
            / tamu
          </span>
          <button
            onClick={onOpenBenefits}
            className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground underline underline-offset-2 transition-colors cursor-pointer"
          >
            <HelpCircle size={13} />
            <span>Apa saja yang didapat?</span>
          </button>
        </div>
      </div>

      {/* Shots Per Guest Option */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-foreground flex items-center gap-1.5">
            <Camera size={13} className="text-primary" />
            Jatah Jepretan Per Tamu:
          </span>
          <span className="text-xs font-bold text-primary">{selectedShots} foto / tamu</span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {shotsOptions.map((shots) => {
            const isSelected = shots === selectedShots;
            return (
              <button
                key={shots}
                onClick={() => onSelectShots(shots)}
                className={`py-2 px-3 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? "border-[#ffbd59] bg-[#ffbd59]/20 text-foreground shadow-xs font-jakarta-bold scale-102"
                    : "border-border/70 bg-card hover:bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                {shots} Jepretan
              </button>
            );
          })}
        </div>
      </div>

      {/* Key Feature: Storage Badge */}
      <div className="flex items-center gap-2 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs font-semibold text-amber-800 dark:text-amber-200 mb-6">
        <Clock size={15} className="text-[#ffbd59] shrink-0" />
        <span>
          Galeri aktif tersimpan selama <strong>{pkg.storage_days || (isHeirloom ? 30 : 7)} hari</strong> setelah acara
        </span>
      </div>

      {/* Features List */}
      <div className="space-y-3 mb-8 grow">
        <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2">
          Fitur yang disertakan:
        </span>
        {(pkg.features || [
          `Kapasitas hingga ${currentGuests} tamu undangan`,
          `Scan QR instan tanpa perlu download aplikasi`,
          `Download seluruh album foto resolusi tinggi`,
          `Live slide show foto para tamu saat resepsi`,
        ]).map((feature, i) => (
          <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-foreground/90">
            <div className="mt-0.5 rounded-full p-0.5 bg-[#ffbd59]/20 text-[#ffbd59] shrink-0">
              <Check size={13} className="stroke-[3]" />
            </div>
            <span className="leading-snug">{feature}</span>
          </div>
        ))}
      </div>

      {/* CTA Button */}
      <div className="mt-auto pt-2">
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleCtaClick}
          className={`group flex items-center justify-center gap-2 w-full py-4 px-6 rounded-2xl text-sm font-jakarta-bold transition-all duration-300 cursor-pointer shadow-md ${
            isFeatured
              ? "bg-gradient-to-r from-amber-400 via-[#ffbd59] to-amber-500 text-zinc-950 hover:shadow-xl hover:shadow-[#ffbd59]/25 hover:scale-[1.02] active:scale-[0.98]"
              : "bg-foreground text-background hover:bg-foreground/90 hover:scale-[1.01] active:scale-[0.99]"
          }`}
        >
          <span>{pkg.cta_text || `Pilih Paket ${pkg.name}`}</span>
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
        </a>
      </div>
    </div>
  );
});

