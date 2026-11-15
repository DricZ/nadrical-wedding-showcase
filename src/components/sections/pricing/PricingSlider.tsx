import { memo } from "react";
import * as Slider from "@radix-ui/react-slider";
import NumberFlow from "@number-flow/react";
import { Users, Sparkles } from "lucide-react";

interface PricingSliderProps {
  stops: number[];
  currentIndex: number;
  onIndexChange: (index: number) => void;
  guestCount: number;
}

const PRESETS = [
  { label: "25 Tamu", index: 2 },
  { label: "50 Tamu (Favorit)", index: 3 },
  { label: "100 Tamu", index: 4 },
  { label: "200 Tamu", index: 6 },
  { label: "500+ Tamu", index: 7 },
];

export const PricingSlider = memo(function PricingSlider({
  stops,
  currentIndex,
  onIndexChange,
  guestCount,
}: PricingSliderProps) {
  const maxIndex = Math.max(0, stops.length - 1);

  return (
    <div className="w-full max-w-4xl mx-auto mb-14 p-6 sm:p-8 rounded-3xl border border-border/80 bg-card/85 dark:bg-zinc-900/80 shadow-xl backdrop-blur-xl relative overflow-hidden transition-all">
      {/* Decorative ambient gradient inside card */}
      <div className="absolute -top-16 -right-16 w-44 h-44 bg-[#ffbd59]/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-44 h-44 bg-primary/10 rounded-full blur-2xl pointer-events-none" />

      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-jakarta-bold uppercase tracking-wider text-amber-700 dark:text-[#ffbd59] mb-1">
            <Users size={14} className="text-[#ffbd59]" />
            <span>Kalkulator Estimasi Tamu</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-serif text-foreground font-bold tracking-tight">
            Berapa perkiraan tamu undangan acaramu?
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            Geser slider untuk melihat penyesuaian biaya investasi di setiap paket secara instan.
          </p>
        </div>

        {/* Live Guest Badge */}
        <div className="inline-flex items-center self-start sm:self-auto gap-2 px-5 py-2.5 rounded-2xl bg-[#ffbd59]/15 border border-[#ffbd59]/35 text-foreground shadow-sm">
          <Sparkles size={16} className="text-[#ffbd59]" />
          <div className="flex items-baseline gap-1.5 font-jakarta-bold text-lg sm:text-xl text-amber-800 dark:text-[#ffbd59]">
            <NumberFlow value={guestCount} locales="id-ID" />
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {guestCount >= 500 ? "Tamu (Maks)" : "Tamu Undangan"}
            </span>
          </div>
        </div>
      </div>

      {/* Radix UI Slider Track */}
      <div className="py-4">
        <Slider.Root
          className="relative flex items-center select-none touch-none w-full h-8 cursor-grab active:cursor-grabbing"
          value={[currentIndex]}
          onValueChange={([val]) => onIndexChange(val)}
          max={maxIndex}
          min={0}
          step={1}
          aria-label="Estimasi Jumlah Tamu"
        >
          <Slider.Track className="bg-muted relative grow rounded-full h-3 overflow-hidden shadow-inner">
            <Slider.Range className="absolute bg-gradient-to-r from-amber-500 via-[#ffbd59] to-amber-400 h-full rounded-full transition-all" />
          </Slider.Track>
          <Slider.Thumb className="block w-7 h-7 bg-white dark:bg-zinc-950 border-[3px] border-[#ffbd59] rounded-full shadow-lg ring-offset-background transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 hover:scale-125 active:scale-95" />
        </Slider.Root>

        {/* Step Ticks */}
        <div className="flex justify-between items-center px-1 mt-2 text-[11px] sm:text-xs font-semibold text-muted-foreground">
          {stops.map((stop, idx) => (
            <button
              key={stop}
              onClick={() => onIndexChange(idx)}
              className={`transition-colors cursor-pointer hover:text-foreground ${
                idx === currentIndex ? "text-primary font-bold scale-110" : ""
              }`}
            >
              {stop >= 500 ? "500+" : stop}
            </button>
          ))}
        </div>
      </div>

      {/* Quick Preset Chips */}
      <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-border/50">
        <span className="text-xs text-muted-foreground font-medium mr-1">Rekomendasi Cepat:</span>
        {PRESETS.map((p) => {
          const isActive = currentIndex === p.index;
          return (
            <button
              key={p.label}
              onClick={() => onIndexChange(p.index)}
              className={`px-3 py-1 text-xs rounded-full font-medium transition-all cursor-pointer ${
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
  );
});

