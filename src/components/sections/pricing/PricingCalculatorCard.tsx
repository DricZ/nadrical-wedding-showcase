import { memo, useCallback } from "react";
import { ArrowRight, HelpCircle, Sparkles } from "lucide-react";
import * as Slider from "@radix-ui/react-slider";
import NumberFlow from "@number-flow/react";
import confetti from "canvas-confetti";
import type { WeddingPricingApi } from "../../../services/api";

interface PricingCalculatorCardProps {
  currentTier: WeddingPricingApi;
  guestStops: number[];
  selectedStopIndex: number;
  onSelectStopIndex: (index: number) => void;
  selectedShots: number;
  onSelectShots: (shots: number) => void;
  price: number;
  normalPrice: number;
  perGuest: number;
  onOpenBenefits: () => void;
  waNumber: string;
}

const PRESETS = [
  { label: "25 Tamu", index: 1 },
  { label: "50 Tamu (Favorit)", index: 2 },
  { label: "100 Tamu", index: 3 },
  { label: "200 Tamu", index: 5 },
  { label: "500+ Tamu", index: 7 },
];

export const PricingCalculatorCard = memo(function PricingCalculatorCard({
  currentTier,
  guestStops,
  selectedStopIndex,
  onSelectStopIndex,
  selectedShots,
  onSelectShots,
  price,
  normalPrice,
  perGuest,
  onOpenBenefits,
  waNumber,
}: PricingCalculatorCardProps) {
  const currentGuests = guestStops[selectedStopIndex] || 50;

  // Shot options from tier or fallback
  const shotsOptions =
    currentTier.shots_options && currentTier.shots_options.length > 0
      ? currentTier.shots_options.map(Number).filter((n) => !isNaN(n))
      : [10, 15, 25];

  const discountPercent = currentTier.discount_percentage || 35;

  const handleCtaClick = useCallback(() => {
    confetti({
      particleCount: 75,
      spread: 70,
      origin: { y: 0.65 },
      colors: ["#ffbd59", "#f59e0b", "#fbbf24", "#ffffff"],
    });
  }, []);

  const waMessage = encodeURIComponent(
    `Halo Nadrical Wedding! Saya tertarik memesan untuk estimasi *${currentGuests} tamu* dengan jatah *${selectedShots} foto/tamu*. Total estimasi investasi: *Rp ${price.toLocaleString(
      "id-ID"
    )}*. Boleh info langkah pendaftarannya?`
  );
  const waUrl = `https://wa.me/${waNumber}?text=${waMessage}`;

  const isFavorite = currentGuests === 50;

  return (
    <div className="relative flex flex-col w-full max-w-lg mx-auto rounded-[2.5rem] border-2 border-[#ffbd59]/40 bg-card/95 dark:bg-zinc-900/95 p-6 sm:p-8 shadow-2xl backdrop-blur-xl transition-all">
      {/* Top Badge (Only dynamic badge based on guest tier) */}
      <div className="flex items-center justify-between gap-3 pb-4 border-b border-border/60">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-gradient-to-r from-amber-500 to-[#ffbd59] text-zinc-950 font-jakarta-bold text-xs uppercase tracking-wider shadow-sm">
          <Sparkles size={13} />
          <span>
            {currentTier.badge || (isFavorite ? "PALING BANYAK DIPILIH ⚡" : `ESTIMASI ${currentGuests} TAMU`)}
          </span>
        </div>

        <span className="text-xs font-jakarta-medium text-muted-foreground">
          Pilihan Fleksibel
        </span>
      </div>

      {/* Pricing Header: Strikethrough & Big Animated Price */}
      <div className="pt-5 pb-4">
        <div className="flex items-center gap-2 text-xs font-jakarta-medium text-muted-foreground">
          <span>HARGA NORMAL</span>
          <span className="line-through">
            Rp {normalPrice.toLocaleString("id-ID")}
          </span>
          <span className="px-2 py-0.5 rounded-full bg-rose-500/15 border border-rose-500/20 text-rose-600 dark:text-rose-400 font-jakarta-bold text-[11px]">
            -{discountPercent}%
          </span>
        </div>

        <div className="flex items-baseline gap-1 mt-2 text-foreground font-space-bold">
          <span className="text-2xl sm:text-3xl font-bold">Rp</span>
          <span className="text-4xl sm:text-5xl font-bold tracking-tight">
            <NumberFlow value={price} locales="id-ID" />
          </span>
        </div>

        <div className="flex items-center justify-between mt-2.5">
          <span className="text-xs sm:text-sm font-jakarta text-muted-foreground">
            Rp {perGuest.toLocaleString("id-ID")} per tamu
          </span>

          <button
            type="button"
            onClick={onOpenBenefits}
            className="inline-flex items-center gap-1.5 text-xs font-jakarta-semibold text-primary hover:underline cursor-pointer"
          >
            <HelpCircle size={14} />
            <span>Apa aja yang aku dapetin?</span>
          </button>
        </div>
      </div>

      {/* Options: Jatah Jepretan Per-Tamu */}
      <div className="mt-2 pt-4 border-t border-border/60">
        <div className="flex items-center justify-between">
          <label className="text-xs font-jakarta-medium text-foreground/80">
            Berapa jatah jepretan per-tamu?
          </label>
          <span className="text-[11px] font-mono text-muted-foreground">
            {selectedShots} foto / tamu
          </span>
        </div>

        <div className="flex items-center gap-3 mt-2.5">
          {shotsOptions.map((shots) => {
            const isSelected = selectedShots === shots;
            return (
              <button
                key={shots}
                type="button"
                onClick={() => onSelectShots(shots)}
                className={`flex-1 py-2.5 rounded-xl text-xs font-space-bold transition-all cursor-pointer border ${
                  isSelected
                    ? "bg-zinc-900 text-white border-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 shadow-sm scale-102"
                    : "bg-secondary/60 text-foreground border-border hover:border-primary/50"
                }`}
              >
                {shots} Jepretan
              </button>
            );
          })}
        </div>
      </div>

      {/* Big CTA Button */}
      <div className="mt-6">
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleCtaClick}
          className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl bg-gradient-to-r from-[#ffbd59] to-[#f59e0b] text-zinc-950 font-jakarta-bold text-sm tracking-wide shadow-lg shadow-amber-500/25 transition-all hover:opacity-95 hover:scale-[1.01] active:scale-[0.98] cursor-pointer"
        >
          <span>Buat event kamu sekarang</span>
          <ArrowRight size={17} />
        </a>
      </div>

      {/* Guest Count Range Slider (Directly Integrated) */}
      <div className="mt-7 pt-5 border-t border-border/60">
        <div className="flex items-center justify-between text-xs font-jakarta-medium text-foreground/80 mb-3">
          <span>Pilih Jumlah Tamu:</span>
          <div className="flex items-baseline gap-1 font-space-bold text-base text-primary">
            <NumberFlow value={currentGuests} locales="id-ID" />
            <span className="text-xs font-jakarta-bold">
              {currentGuests >= 500 ? "+ Tamu" : " Tamu"}
            </span>
          </div>
        </div>

        {/* Radix UI Slider */}
        <div className="py-2">
          <Slider.Root
            className="relative flex items-center select-none touch-none w-full h-8 cursor-grab active:cursor-grabbing"
            value={[selectedStopIndex]}
            onValueChange={([val]) => onSelectStopIndex(val)}
            max={guestStops.length - 1}
            min={0}
            step={1}
            aria-label="Pilih Jumlah Tamu"
          >
            <Slider.Track className="bg-muted relative grow rounded-full h-2.5 overflow-hidden shadow-inner">
              <Slider.Range className="absolute bg-gradient-to-r from-amber-500 via-[#ffbd59] to-amber-400 h-full rounded-full transition-all" />
            </Slider.Track>
            <Slider.Thumb className="block w-6 h-6 bg-white dark:bg-zinc-950 border-[3px] border-[#ffbd59] rounded-full shadow-lg ring-offset-background transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 hover:scale-125 active:scale-95" />
          </Slider.Root>
        </div>

        {/* Slider Tick Stops */}
        <div className="flex justify-between text-[11px] font-mono text-muted-foreground mt-0.5 px-0.5 select-none">
          {guestStops.map((stop, idx) => (
            <button
              key={stop}
              type="button"
              onClick={() => onSelectStopIndex(idx)}
              className={`hover:text-primary transition-colors cursor-pointer ${
                idx === selectedStopIndex ? "font-bold text-primary scale-110" : ""
              }`}
            >
              {stop >= 500 ? "500+" : stop}
            </button>
          ))}
        </div>

        {/* Quick Recommendation Chips */}
        <div className="flex flex-wrap items-center gap-1.5 mt-4 pt-3 border-t border-border/40">
          <span className="text-[11px] text-muted-foreground font-medium mr-1">
            Pilihan Populer:
          </span>
          {PRESETS.map((p) => {
            const isActive = selectedStopIndex === p.index;
            return (
              <button
                key={p.label}
                type="button"
                onClick={() => onSelectStopIndex(p.index)}
                className={`px-2.5 py-0.5 text-[11px] rounded-full font-medium transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#ffbd59] text-zinc-950 font-bold shadow-xs scale-105"
                    : "bg-muted/70 text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                {p.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
});

