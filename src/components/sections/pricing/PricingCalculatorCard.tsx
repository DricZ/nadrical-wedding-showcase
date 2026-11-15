import { memo, useCallback } from "react";
import { ArrowRight, HelpCircle, Sparkles, CheckCircle2 } from "lucide-react";
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

const PRESET_STOPS = [
  { label: "10", index: 0 },
  { label: "25", index: 1 },
  { label: "50 ⭐", index: 2 },
  { label: "100", index: 3 },
  { label: "150", index: 4 },
  { label: "200", index: 5 },
  { label: "300", index: 6 },
  { label: "500+", index: 7 },
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
  const isPopular = currentGuests === 50;

  // Shots options
  const shotsOptions =
    currentTier.shots_options && currentTier.shots_options.length > 0
      ? currentTier.shots_options.map(Number).filter((n) => !isNaN(n))
      : [10, 15, 25];

  const discountPercent = currentTier.discount_percentage || 35;
  const savings = Math.max(0, normalPrice - price);

  const handleCtaClick = useCallback(() => {
    confetti({
      particleCount: 80,
      spread: 75,
      origin: { y: 0.65 },
      colors: ["#ffbd59", "#f59e0b", "#fbbf24", "#ffffff"],
    });
  }, []);

  const waMessage = encodeURIComponent(
    `Halo Lument! Saya tertarik memesan untuk estimasi *${currentGuests} tamu* dengan jatah *${selectedShots} foto/tamu*. Total investasi: *Rp ${price.toLocaleString(
      "id-ID"
    )}*. Boleh info ketersediaan tanggal dan langkah pemesanannya?`
  );
  const waUrl = `https://wa.me/${waNumber}?text=${waMessage}`;

  return (
    <div className="flex flex-col w-full h-full justify-between p-6 sm:p-8 rounded-[2.5rem] border-2 border-primary/30 bg-card/90 dark:bg-zinc-900/90 backdrop-blur-xl shadow-2xl relative transition-all duration-300">
      {/* Floating Header Badge */}
      <div className="flex items-center justify-between gap-3 pb-5 border-b border-border/60">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-gradient-to-r from-amber-500/20 to-primary/20 border border-primary/30 text-amber-900 dark:text-amber-300 text-xs font-jakarta-bold uppercase tracking-wider">
          <Sparkles size={13} className="text-[#ffbd59]" />
          <span>
            {currentTier.badge ||
              (isPopular ? "Paling Banyak Dipilih ⚡" : "Kalkulator Investasi")}
          </span>
        </div>

        <span className="text-[11px] font-jakarta-medium text-muted-foreground">
          Tanpa Biaya Tersembunyi
        </span>
      </div>

      <div className="py-5 space-y-6">
        {/* Step 1: Guest Count Selection & Interactive Slider */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-jakarta-bold uppercase tracking-wider text-muted-foreground">
              1. Perkiraan Jumlah Undangan
            </label>
            <div className="flex items-baseline gap-1 font-space-bold text-xl text-primary">
              <NumberFlow value={currentGuests} locales="id-ID" />
              <span className="text-xs font-jakarta-bold text-foreground">
                {currentGuests >= 500 ? "+ Tamu" : " Tamu"}
              </span>
            </div>
          </div>

          {/* Radix UI Range Slider */}
          <div className="py-2.5">
            <Slider.Root
              className="relative flex items-center select-none touch-none w-full h-8 cursor-grab active:cursor-grabbing"
              value={[selectedStopIndex]}
              onValueChange={([val]) => onSelectStopIndex(val)}
              max={guestStops.length - 1}
              min={0}
              step={1}
              aria-label="Pilih Jumlah Tamu Undangan"
            >
              <Slider.Track className="bg-secondary relative grow rounded-full h-2.5 overflow-hidden shadow-inner">
                <Slider.Range className="absolute bg-gradient-to-r from-amber-500 via-[#ffbd59] to-amber-400 h-full rounded-full transition-all" />
              </Slider.Track>
              <Slider.Thumb className="block w-6 h-6 bg-white dark:bg-zinc-950 border-[3px] border-[#ffbd59] rounded-full shadow-lg ring-offset-background transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 hover:scale-125 active:scale-95" />
            </Slider.Root>
          </div>

          {/* Preset Buttons Grid */}
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-1.5 mt-2">
            {PRESET_STOPS.map((p) => {
              const isSelected = selectedStopIndex === p.index;
              return (
                <button
                  key={p.label}
                  type="button"
                  onClick={() => onSelectStopIndex(p.index)}
                  className={`py-1.5 px-1 rounded-xl text-xs font-space-bold transition-all cursor-pointer border text-center ${
                    isSelected
                      ? "bg-primary text-primary-foreground border-primary shadow-xs font-bold scale-102"
                      : "bg-secondary/60 text-muted-foreground border-transparent hover:border-border hover:text-foreground"
                  }`}
                >
                  {p.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 2: Jatah Jepretan Per Tamu */}
        <div className="pt-4 border-t border-border/60">
          <div className="flex items-center justify-between mb-2.5">
            <label className="text-xs font-jakarta-bold uppercase tracking-wider text-muted-foreground">
              2. Jatah Jepretan Kamera per Tamu
            </label>
            <span className="text-xs font-jakarta-semibold text-primary">
              {selectedShots} Foto / Tamu
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            {shotsOptions.map((shots) => {
              const isSelected = selectedShots === shots;
              return (
                <button
                  key={shots}
                  type="button"
                  onClick={() => onSelectShots(shots)}
                  className={`py-2.5 px-2 rounded-xl text-xs font-jakarta-bold transition-all cursor-pointer border flex flex-col items-center justify-center gap-0.5 ${
                    isSelected
                      ? "bg-foreground text-background border-foreground shadow-md scale-102"
                      : "bg-secondary/50 text-foreground border-border/60 hover:border-primary/50"
                  }`}
                >
                  <span className="text-sm font-space-bold">{shots} Foto</span>
                  <span className="text-[10px] font-normal opacity-80">
                    {shots === 15 ? "Paling Pas" : shots === 25 ? "Ekstra" : "Hemat"}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 3: Transparent Investment Box */}
        <div className="p-5 rounded-2xl bg-amber-500/5 dark:bg-amber-400/5 border border-primary/20 shadow-inner">
          <div className="flex items-center justify-between text-xs font-jakarta-medium text-muted-foreground">
            <div className="flex items-center gap-2">
              <span>HARGA NORMAL</span>
              <span className="line-through">
                Rp {normalPrice.toLocaleString("id-ID")}
              </span>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-rose-500/15 border border-rose-500/20 text-rose-600 dark:text-rose-400 font-jakarta-bold text-[11px]">
              Hemat {discountPercent}% (Rp {savings.toLocaleString("id-ID")})
            </span>
          </div>

          <div className="flex items-baseline gap-1 mt-2.5 text-foreground font-space-bold">
            <span className="text-2xl sm:text-3xl font-bold">Rp</span>
            <span className="text-4xl sm:text-5xl font-bold tracking-tight">
              <NumberFlow value={price} locales="id-ID" />
            </span>
            <span className="text-xs font-jakarta-normal text-muted-foreground ml-1">
              / seluruh acara
            </span>
          </div>

          <div className="flex items-center justify-between mt-3 pt-3 border-t border-primary/10">
            <span className="text-xs font-jakarta-medium text-muted-foreground">
              Hanya <strong className="text-foreground">Rp {perGuest.toLocaleString("id-ID")}</strong> / tamu
            </span>

            <button
              type="button"
              onClick={onOpenBenefits}
              className="inline-flex items-center gap-1 text-xs font-jakarta-semibold text-primary hover:underline cursor-pointer"
            >
              <HelpCircle size={13} />
              <span>Rincian Benefit Lengkap</span>
            </button>
          </div>
        </div>
      </div>

      {/* Step 4: Grand CTA Button & Booking Confidence */}
      <div className="pt-2">
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleCtaClick}
          className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl bg-gradient-to-r from-[#ffbd59] via-amber-500 to-[#f59e0b] text-zinc-950 font-jakarta-bold text-sm tracking-wide shadow-lg shadow-amber-500/20 transition-all duration-200 hover:opacity-95 hover:scale-[1.01] active:scale-[0.98] cursor-pointer"
        >
          <span>Reservasi Tanggal Acara Sekarang</span>
          <ArrowRight size={17} />
        </a>

        {/* Trust bullet reassurance */}
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 mt-3 text-[11px] text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <CheckCircle2 size={12} className="text-emerald-500" />
            Demo gratis sebelum bayar
          </span>
          <span className="inline-flex items-center gap-1">
            <CheckCircle2 size={12} className="text-emerald-500" />
            Konsultasi desain QR meja
          </span>
        </div>
      </div>
    </div>
  );
});
