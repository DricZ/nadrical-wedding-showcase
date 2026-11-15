import { memo, useCallback, useState, useEffect, startTransition } from "react";
import { ArrowRight, HelpCircle, Check } from "lucide-react";
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
  hasLifetimeAddon: boolean;
  onToggleLifetimeAddon: (checked: boolean) => void;
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
  hasLifetimeAddon,
  onToggleLifetimeAddon,
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
    [onSelectStopIndex],
  );

  const handleTickClick = useCallback(
    (index: number) => {
      setLocalIndex(index);
      startTransition(() => {
        onSelectStopIndex(index);
      });
    },
    [onSelectStopIndex],
  );

  const currentGuests = guestStops[localIndex] || 50;

  // Shots options
  const shotsOptions =
    currentTier.shots_options && currentTier.shots_options.length > 0
      ? currentTier.shots_options.map(Number).filter((n) => !isNaN(n))
      : [10];

  const handleCtaClick = useCallback(() => {
    confetti({
      particleCount: 80,
      spread: 75,
      origin: { y: 0.65 },
      colors: ["#ffbd59", "#f59e0b", "#fbbf24", "#ffffff"],
    });
  }, []);

  // WhatsApp Order URL Generation
  const waMessage = encodeURIComponent(
    `Hello Lument, I'd like to consult and reserve a live wedding gallery package:\n\n` +
      `• Estimated Guests: ${currentGuests >= 500 ? "Unlimited (500+)" : `${currentGuests} Guests`}\n` +
      `• Camera Allocation: ${selectedShots} Photos/Guest\n` +
      `• Total Investment: Rp ${price.toLocaleString("id-ID")}\n` +
      `• Lifetime Add-on: ${hasLifetimeAddon ? "Yes (+Rp 50,000)" : "No"}\n\n` +
      `Please let me know your date availability and next steps. Thank you!`,
  );
  const waUrl = `https://wa.me/${waNumber}?text=${waMessage}`;

  return (
    <div className="flex flex-col justify-between p-5 sm:p-6 lg:p-7 rounded-2xl sm:rounded-3xl lg:rounded-[2rem] border border-border/70 bg-card/85 dark:bg-zinc-900/80 backdrop-blur-xl shadow-2xl relative overflow-hidden transition-all duration-300">
      {/* Ambient background glow inside calculator */}
      <div className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none bg-primary/10 blur-3xl" />

      <div className="space-y-3 sm:space-y-3.5 lg:space-y-4">
        {/* Step 1: Guest Stops Slider with Direct Clickable Ticks */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-[11px] sm:text-xs tracking-wider uppercase font-jakarta-bold text-muted-foreground">
              Guest Count
            </label>
            <div className="flex items-baseline gap-1 text-lg sm:text-xl font-space-bold text-primary">
              {currentGuests >= 500 ? (
                <span>Unlimited</span>
              ) : (
                <NumberFlow
                  value={currentGuests}
                  locales="id-ID"
                  isolate
                  willChange
                  transformTiming={{
                    duration: 200,
                    easing: "cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                />
              )}
              <span className="text-[11px] sm:text-xs font-jakarta-bold text-foreground">
                Guests
              </span>
            </div>
          </div>

          {/* Official shadcn Slider Component */}
          <div className="relative pt-0.5 pb-1">
            <Slider
              value={[localIndex]}
              onValueChange={handleSliderChange}
              max={guestStops.length - 1}
              min={0}
              step={1}
              aria-label="Select Estimated Guest Count"
              className="py-1.5"
            />

            {/* Mathematically Aligned Tick Stops with Direct Snapping */}
            <div className="relative h-6 mx-2.5 mt-1 select-none">
              {guestStops.map((stop, idx) => {
                const isSelected = localIndex === idx;
                const percent = (idx / (guestStops.length - 1)) * 100;

                return (
                  <button
                    key={stop}
                    type="button"
                    onClick={() => handleTickClick(idx)}
                    style={{ left: `${percent}%` }}
                    className="absolute top-0 flex flex-col items-center transition-all duration-150 -translate-x-1/2 cursor-pointer"
                  >
                    <span
                      className={`w-1 h-1.5 rounded-full mb-0.5 transition-colors ${
                        isSelected
                          ? "bg-primary scale-125"
                          : "bg-muted-foreground/30"
                      }`}
                    />
                    <span
                      className={`text-[10px] sm:text-[11px] font-space-bold px-1 py-0.2 rounded transition-all whitespace-nowrap ${
                        isSelected
                          ? "bg-primary text-primary-foreground font-bold shadow-xs scale-105"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {stop >= 500 ? "Unlimited" : stop}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Step 2: Camera Shots Per Guest */}
        <div className="pt-2 sm:pt-2.5 border-t border-border/60">
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-[11px] sm:text-xs tracking-wider uppercase font-jakarta-bold text-muted-foreground">
              Camera Shots per Guest
            </label>
          </div>

          <div
            className={`grid gap-2 sm:gap-2.5 ${
              shotsOptions.length === 1
                ? "grid-cols-1"
                : shotsOptions.length === 2
                  ? "grid-cols-2"
                  : "grid-cols-3"
            }`}
          >
            {shotsOptions.map((shots) => {
              const isSelected = selectedShots === shots;
              return (
                <button
                  key={shots}
                  type="button"
                  onClick={() => onSelectShots(shots)}
                  className={`py-2 px-2 rounded-xl text-xs font-jakarta-bold transition-all cursor-pointer border flex flex-col items-center justify-center gap-0.5 ${
                    isSelected
                      ? "bg-foreground text-background border-foreground shadow-sm scale-101"
                      : "bg-secondary/50 text-foreground border-border/60 hover:border-primary/50"
                  }`}
                >
                  <span className="text-xs sm:text-sm font-space-bold">
                    {shots} Photos
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 3: Transparent Investment Box */}
        <div className="p-3.5 sm:p-4 border shadow-inner rounded-xl sm:rounded-2xl bg-amber-500/5 dark:bg-amber-400/5 border-primary/20">
          <div className="flex items-center justify-between mb-0.5 text-[10px] sm:text-[11px] tracking-wider uppercase font-jakarta-bold text-muted-foreground">
            <span>Total Price</span>
          </div>

          <div className="flex items-baseline gap-1 mt-1 text-foreground font-space-bold">
            {price === 0 ? (
              <span className="text-2xl font-bold sm:text-3xl text-emerald-600 dark:text-emerald-400">
                FREE
              </span>
            ) : (
              <>
                <span className="text-xl font-bold sm:text-2xl">Rp</span>
                <span className="text-3xl font-bold tracking-tight sm:text-4xl">
                  <NumberFlow
                    value={price}
                    locales="id-ID"
                    isolate
                    willChange
                    transformTiming={{
                      duration: 200,
                      easing: "cubic-bezier(0.16, 1, 0.3, 1)",
                    }}
                  />
                </span>
                <span className="ml-1 text-[11px] sm:text-xs font-jakarta-normal text-muted-foreground">
                  / event
                </span>
              </>
            )}
          </div>

          <div className="flex items-center justify-between pt-2 mt-2 border-t border-primary/10">
            <span className="text-[11px] sm:text-xs font-jakarta-medium text-muted-foreground">
              {price === 0 ? (
                <strong className="text-emerald-600 dark:text-emerald-400">
                  100% Free Trial
                </strong>
              ) : (
                <>
                  Only{" "}
                  <strong className="text-foreground">
                    Rp {perGuest.toLocaleString("id-ID")}
                  </strong>{" "}
                  / guest
                </>
              )}
            </span>

            <button
              type="button"
              onClick={onOpenBenefits}
              className="inline-flex items-center gap-1 text-[11px] sm:text-xs cursor-pointer font-jakarta-semibold text-primary hover:underline"
            >
              <HelpCircle size={12} />
              <span>View Full Benefits</span>
            </button>
          </div>
        </div>

        {/* Step 3.5: Lifetime Website Addon Option */}
        <div
          onClick={() => onToggleLifetimeAddon(!hasLifetimeAddon)}
          role="checkbox"
          aria-checked={hasLifetimeAddon}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === " " || e.key === "Enter") {
              e.preventDefault();
              onToggleLifetimeAddon(!hasLifetimeAddon);
            }
          }}
          className={`p-3 sm:p-3.5 rounded-xl sm:rounded-2xl border transition-all duration-200 cursor-pointer select-none flex items-center justify-between gap-2.5 sm:gap-3 ${
            hasLifetimeAddon
              ? "bg-amber-500/10 dark:bg-amber-400/10 border-primary shadow-sm ring-1 ring-primary/40"
              : "bg-secondary/40 border-border/70 hover:border-primary/40 hover:bg-secondary/60"
          }`}
        >
          <div className="flex items-center gap-2.5">
            <div
              className={`w-4 h-4 sm:w-5 sm:h-5 rounded-md flex items-center justify-center transition-colors shrink-0 ${
                hasLifetimeAddon
                  ? "bg-primary text-primary-foreground font-bold shadow-xs"
                  : "border-2 border-muted-foreground/40 bg-background"
              }`}
            >
              {hasLifetimeAddon && <Check size={12} strokeWidth={3} />}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs leading-tight sm:text-sm font-jakarta-bold text-foreground">
                  Lifetime Gallery Access
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-muted-foreground mt-0.5 leading-snug">
                Keep all your guest photos, videos, and wishes online forever.
              </p>
            </div>
          </div>

          <div className="text-right shrink-0">
            <span className="text-xs sm:text-sm font-space-bold text-primary">
              +Rp 50.000
            </span>
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
          className="flex items-center justify-center gap-2 w-full py-3 sm:py-3.5 rounded-xl sm:rounded-2xl bg-gradient-to-r from-[#ffbd59] via-amber-500 to-[#f59e0b] text-zinc-950 font-jakarta-bold text-xs sm:text-sm tracking-wide shadow-lg shadow-amber-500/20 transition-all duration-200 hover:opacity-95 hover:scale-[1.01] active:scale-[0.98] cursor-pointer"
        >
          <span>{price === 0 ? "Try Free Demo Now" : "Reserve Now"}</span>
          <ArrowRight size={15} />
        </a>
      </div>
    </div>
  );
});
