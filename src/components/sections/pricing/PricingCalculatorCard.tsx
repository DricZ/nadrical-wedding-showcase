import { memo, useCallback, useState, useEffect, startTransition } from "react";
import { ArrowRight, HelpCircle, Sparkles, CheckCircle2 } from "lucide-react";
import NumberFlow from "@number-flow/react";
import confetti from "canvas-confetti";
import { Slider } from "@/components/ui/slider";
import type { WeddingPricingApi } from "../../../services/api";

interface PricingCalculatorCardProps {
  currentTier: WeddingPricingApi;
  guestStops: number[];
  selectedStopIndex: number;
  onSelectStopIndex: (index: number) => void;
  selectedShots: number;
  onSelectShots: (shots: number) => void;
  price: number;
  normalPrice?: number;
  perGuest: number;
  onOpenBenefits: () => void;
  waNumber: string;
}

export const PricingCalculatorCard = memo(function PricingCalculatorCard({
  currentTier,
  guestStops,
  selectedStopIndex,
  onSelectStopIndex,
  selectedShots,
  onSelectShots,
  price,
  perGuest,
  onOpenBenefits,
  waNumber,
}: PricingCalculatorCardProps) {
  // Local state for instant 60fps slider dragging
  const [localIndex, setLocalIndex] = useState<number>(selectedStopIndex);

  useEffect(() => {
    setLocalIndex(selectedStopIndex);
  }, [selectedStopIndex]);

  // High-performance 60fps slider handler using React 19 startTransition
  const handleSliderChange = useCallback(
    ([val]: number[]) => {
      setLocalIndex(val);
      startTransition(() => {
        onSelectStopIndex(val);
      });
    },
    [onSelectStopIndex]
  );

  const handleTickClick = useCallback(
    (index: number) => {
      setLocalIndex(index);
      startTransition(() => {
        onSelectStopIndex(index);
      });
    },
    [onSelectStopIndex]
  );

  const currentGuests = guestStops[localIndex] || 50;
  const isPopular = currentGuests === 50;

  // Shots options
  const shotsOptions =
    currentTier.shots_options && currentTier.shots_options.length > 0
      ? currentTier.shots_options.map(Number).filter((n) => !isNaN(n))
      : [10, 15, 25];

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
        {/* Step 1: Guest Count Selection with Official shadcn Slider */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="text-xs font-jakarta-bold uppercase tracking-wider text-muted-foreground">
              1. Perkiraan Jumlah Undangan
            </label>
            <div className="flex items-baseline gap-1 font-space-bold text-xl text-primary">
              <NumberFlow
                value={currentGuests}
                locales="id-ID"
                isolate
                willChange
                transformTiming={{ duration: 200, easing: "cubic-bezier(0.16, 1, 0.3, 1)" }}
              />
              <span className="text-xs font-jakarta-bold text-foreground">
                {currentGuests >= 500 ? "+ Tamu" : " Tamu"}
              </span>
            </div>
          </div>

          {/* Official shadcn Slider Component */}
          <div className="relative pt-1 pb-2">
            <Slider
              value={[localIndex]}
              onValueChange={handleSliderChange}
              max={guestStops.length - 1}
              min={0}
              step={1}
              aria-label="Pilih Jumlah Tamu Undangan"
              className="py-2"
            />

            {/* Mathematically Aligned Tick Stops with Direct Snapping */}
            <div className="relative w-full h-8 mt-2 select-none">
              {guestStops.map((stop, idx) => {
                const isSelected = localIndex === idx;
                const percent = (idx / (guestStops.length - 1)) * 100;
                const isFirst = idx === 0;
                const isLast = idx === guestStops.length - 1;

                return (
                  <button
                    key={stop}
                    type="button"
                    onClick={() => handleTickClick(idx)}
                    style={{ left: `${percent}%` }}
                    className={`absolute top-0 flex flex-col items-center transition-all duration-150 cursor-pointer ${
                      isFirst
                        ? "translate-x-0 items-start"
                        : isLast
                        ? "-translate-x-full items-end"
                        : "-translate-x-1/2 items-center"
                    }`}
                  >
                    {/* Small vertical tick indicator */}
                    <span
                      className={`w-1 h-1.5 rounded-full mb-1 transition-colors ${
                        isSelected ? "bg-primary scale-125" : "bg-muted-foreground/30"
                      }`}
                    />
                    {/* Value Badge */}
                    <span
                      className={`text-[11px] font-space-bold px-1.5 py-0.5 rounded-md transition-all ${
                        isSelected
                          ? "bg-primary text-primary-foreground font-bold shadow-xs scale-110"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {stop >= 500 ? "500+" : stop}
                      {stop === 50 ? " ⭐" : ""}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Step 2: Jatah Jepretan Per Tamu */}
        <div className="pt-3 border-t border-border/60">
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

        {/* Step 3: Transparent Investment Box with GPU Isolation */}
        <div className="p-5 rounded-2xl bg-amber-500/5 dark:bg-amber-400/5 border border-primary/20 shadow-inner">
          <div className="flex items-center justify-between text-xs font-jakarta-bold uppercase tracking-wider text-muted-foreground mb-1">
            <span>3. Total Investasi</span>
            <span className="text-[11px] font-jakarta-medium text-emerald-600 dark:text-emerald-400">
              Sekali Bayar · Tanpa Langganan
            </span>
          </div>

          <div className="flex items-baseline gap-1 mt-2 text-foreground font-space-bold">
            <span className="text-2xl sm:text-3xl font-bold">Rp</span>
            <span className="text-4xl sm:text-5xl font-bold tracking-tight">
              <NumberFlow
                value={price}
                locales="id-ID"
                isolate
                willChange
                transformTiming={{ duration: 200, easing: "cubic-bezier(0.16, 1, 0.3, 1)" }}
              />
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
