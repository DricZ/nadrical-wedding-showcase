import { memo } from "react";
import { ArrowRight, HelpCircle } from "lucide-react";
import { motion } from "framer-motion";
import type { WeddingPricingApi } from "../../../services/api";

interface PricingCalculatorCardProps {
  packages: WeddingPricingApi[];
  selectedPackage: WeddingPricingApi;
  onSelectPackage: (pkg: WeddingPricingApi) => void;
  currency: "IDR" | "USD";
  onToggleCurrency: (c: "IDR" | "USD") => void;
  guestStops: number[];
  selectedStopIndex: number;
  onSelectStopIndex: (index: number) => void;
  selectedShots: number;
  onSelectShots: (shots: number) => void;
  calculatedPriceIdr: number;
  calculatedPriceUsd: number;
  calculatedPerGuestIdr: number;
  calculatedPerGuestUsd: number;
  onOpenBenefits: () => void;
  waNumber: string;
}

export const PricingCalculatorCard = memo(function PricingCalculatorCard({
  packages,
  selectedPackage,
  onSelectPackage,
  currency,
  onToggleCurrency,
  guestStops,
  selectedStopIndex,
  onSelectStopIndex,
  selectedShots,
  onSelectShots,
  calculatedPriceIdr,
  calculatedPriceUsd,
  calculatedPerGuestIdr,
  calculatedPerGuestUsd,
  onOpenBenefits,
  waNumber,
}: PricingCalculatorCardProps) {
  const currentGuests = guestStops[selectedStopIndex] || 50;
  const shotsOptions = (selectedPackage.shots_options && selectedPackage.shots_options.length > 0
    ? selectedPackage.shots_options.map(Number)
    : [10, 15, 25]).filter((n) => !isNaN(n));

  const discountPercent = selectedPackage.discount_percentage || 35;
  const normalPriceIdr = Math.round(calculatedPriceIdr / (1 - discountPercent / 100));
  const normalPriceUsd = Math.round(calculatedPriceUsd / (1 - discountPercent / 100));

  const formatIdr = (val: number) =>
    new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(val);
  const formatUsd = (val: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(val);

  const displayPrice = currency === "IDR" ? formatIdr(calculatedPriceIdr) : formatUsd(calculatedPriceUsd);
  const displayNormal = currency === "IDR" ? formatIdr(normalPriceIdr) : formatUsd(normalPriceUsd);
  const displayPerGuest =
    currency === "IDR"
      ? `${formatIdr(calculatedPerGuestIdr)} per tamu`
      : `${formatUsd(calculatedPerGuestUsd)} per tamu`;

  // WhatsApp prefilled message
  const waMessage = encodeURIComponent(
    `Halo Nadrical Wedding! Saya tertarik memesan paket *${selectedPackage.name}* untuk estimasi *${currentGuests} tamu* dengan jatah *${selectedShots} foto/tamu*. Total estimasi: *${displayPrice}*. Boleh info langkah pendaftarannya?`
  );
  const waUrl = `https://wa.me/${waNumber}?text=${waMessage}`;

  return (
    <div className="relative flex flex-col w-full max-w-lg mx-auto rounded-[2.5rem] border border-border/80 bg-card/95 p-6 sm:p-8 shadow-2xl backdrop-blur-xl transition-all">
      {/* Top Header Row: Package Selector Tabs, Badges & Currency Toggle */}
      <div className="flex items-center justify-between gap-3 pb-5 border-b border-border/60">
        <div className="flex flex-wrap items-center gap-2">
          {packages.map((pkg) => {
            const isSelected = pkg.id === selectedPackage.id;
            return (
              <button
                key={pkg.id}
                type="button"
                onClick={() => onSelectPackage(pkg)}
                className={`px-3 py-1 rounded-full text-xs font-jakarta-bold transition-all cursor-pointer ${
                  isSelected
                    ? "bg-[#ffbd59] text-zinc-950 shadow-xs"
                    : "bg-secondary text-muted-foreground hover:text-foreground"
                }`}
              >
                {pkg.name.toUpperCase()}
              </button>
            );
          })}

          {selectedPackage.badge && (
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/15 border border-[#ffbd59]/40 text-[11px] font-jakarta-bold text-amber-600 dark:text-[#ffbd59] uppercase tracking-wide">
              {selectedPackage.badge}
            </span>
          )}
        </div>

        {/* Currency Switcher Toggle */}
        <div className="flex items-center p-0.5 rounded-full bg-secondary border border-border/60 text-xs font-jakarta-bold shrink-0">
          <button
            type="button"
            onClick={() => onToggleCurrency("IDR")}
            className={`px-2.5 py-1 rounded-full transition-all cursor-pointer ${
              currency === "IDR"
                ? "bg-background text-foreground shadow-xs"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            IDR
          </button>
          <button
            type="button"
            onClick={() => onToggleCurrency("USD")}
            className={`px-2.5 py-1 rounded-full transition-all cursor-pointer ${
              currency === "USD"
                ? "bg-background text-foreground shadow-xs"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            USD
          </button>
        </div>
      </div>

      {/* Pricing Header: Strikethrough & Big Price */}
      <div className="pt-6 pb-4">
        <div className="flex items-center gap-2 text-xs font-jakarta-medium text-muted-foreground">
          <span>HARGA NORMAL</span>
          <span className="line-through">{displayNormal}</span>
          <span className="px-1.5 py-0.2 rounded bg-rose-500/15 text-rose-600 dark:text-rose-400 font-bold text-[11px]">
            -{discountPercent}%
          </span>
        </div>

        <div className="flex items-baseline gap-2 mt-2">
          <motion.span
            key={`${displayPrice}-${currency}`}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-4xl sm:text-5xl font-space-bold tracking-tight text-foreground"
          >
            {displayPrice}
          </motion.span>
        </div>

        <div className="flex items-center justify-between mt-2">
          <span className="text-xs font-jakarta text-muted-foreground">
            {displayPerGuest}
          </span>

          <button
            type="button"
            onClick={onOpenBenefits}
            className="inline-flex items-center gap-1 text-xs font-jakarta-semibold text-primary hover:underline cursor-pointer"
          >
            <HelpCircle size={13} />
            <span>Apa aja yang aku dapetin?</span>
          </button>
        </div>
      </div>

      {/* Options: Jatah Jepretan Per-Tamu */}
      <div className="mt-4 pt-4 border-t border-border/60">
        <label className="text-xs font-jakarta-medium text-foreground/80">
          Berapa jatah jepretan per-tamu?
        </label>
        <div className="flex items-center gap-3 mt-2">
          {shotsOptions.map((shots) => {
            const isSelected = selectedShots === shots;
            return (
              <button
                key={shots}
                type="button"
                onClick={() => onSelectShots(shots)}
                className={`flex-1 py-2 rounded-xl text-xs font-space-bold transition-all cursor-pointer border ${
                  isSelected
                    ? "bg-zinc-900 text-white border-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 shadow-sm"
                    : "bg-secondary/60 text-foreground border-border hover:border-primary/50"
                }`}
              >
                {shots}
              </button>
            );
          })}
        </div>
      </div>

      {/* CTA Button: Buat Event Kamu */}
      <div className="mt-6">
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl bg-gradient-to-r from-[#ffbd59] to-[#f59e0b] text-zinc-950 font-jakarta-bold text-sm tracking-wide shadow-lg shadow-amber-500/25 transition-all hover:opacity-95 hover:scale-[1.01] active:scale-[0.98] cursor-pointer"
        >
          <span>{selectedPackage.cta_text || "Buat event kamu"}</span>
          <ArrowRight size={17} />
        </a>
      </div>

      {/* Guest Count Range Slider */}
      <div className="mt-8 pt-6 border-t border-border/60">
        <div className="flex items-center justify-between text-xs font-jakarta-medium text-foreground/80 mb-3">
          <span>Estimasi Jumlah Tamu:</span>
          <span className="font-space-bold text-sm text-primary">
            {currentGuests} Tamu
          </span>
        </div>

        {/* Custom Slider Input */}
        <div className="relative w-full py-2">
          <input
            type="range"
            min={0}
            max={guestStops.length - 1}
            step={1}
            value={selectedStopIndex}
            onChange={(e) => onSelectStopIndex(Number(e.target.value))}
            className="w-full h-2 rounded-lg bg-secondary accent-[#ffbd59] cursor-pointer"
            aria-label="Slider estimasi jumlah tamu"
          />
        </div>

        {/* Slider Tick Stops */}
        <div className="flex justify-between text-[11px] font-mono text-muted-foreground mt-1 px-1 select-none">
          {guestStops.map((stop, idx) => (
            <button
              key={stop}
              type="button"
              onClick={() => onSelectStopIndex(idx)}
              className={`hover:text-primary transition-colors cursor-pointer ${
                idx === selectedStopIndex ? "font-bold text-primary" : ""
              }`}
            >
              {stop >= 500 ? "500+" : stop}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
});

