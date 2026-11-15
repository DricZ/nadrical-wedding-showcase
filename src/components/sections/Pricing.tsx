import { useState, useEffect, useMemo } from "react";
import {
  Sparkles,
  ShieldCheck,
  QrCode,
  ImageDown,
  Headphones,
} from "lucide-react";
import { useSettings } from "../../contexts/SettingsContext";
import {
  fetchWeddingPricings,
  type WeddingPricingApi,
} from "../../services/api";
import { PricingLivePreview } from "./pricing/PricingLivePreview";
import { PricingCalculatorCard } from "./pricing/PricingCalculatorCard";
import { PricingBenefitsModal } from "./pricing/PricingBenefitsModal";

const GUEST_STOPS = [10, 50, 100, 150, 200, 500];

const DEFAULT_TIERS: WeddingPricingApi[] = [
  {
    id: 1,
    guest_count: 10,
    price_idr: 0,
    original_price_idr: 0,
    discount_percentage: 0,
    shots_options: [10],
    default_shots: 10,
    storage_days: 7,
    is_active: true,
    sort_order: 1,
  },
  {
    id: 2,
    guest_count: 50,
    badge: "PALING BANYAK DIPILIH ⚡",
    is_popular: true,
    price_idr: 100000,
    original_price_idr: 170000,
    discount_percentage: 41,
    shots_options: [10],
    default_shots: 10,
    storage_days: 7,
    is_active: true,
    sort_order: 2,
  },
  {
    id: 3,
    guest_count: 100,
    price_idr: 200000,
    original_price_idr: 300000,
    discount_percentage: 33,
    shots_options: [10, 20],
    default_shots: 10,
    storage_days: 30,
    is_active: true,
    sort_order: 3,
  },
  {
    id: 4,
    guest_count: 150,
    price_idr: 270000,
    original_price_idr: 449000,
    discount_percentage: 40,
    shots_options: [10, 20, 30],
    default_shots: 10,
    storage_days: 30,
    is_active: true,
    sort_order: 4,
  },
  {
    id: 5,
    guest_count: 200,
    price_idr: 350000,
    original_price_idr: 599000,
    discount_percentage: 42,
    shots_options: [10, 20, 30],
    default_shots: 10,
    storage_days: 30,
    is_active: true,
    sort_order: 5,
  },
  {
    id: 6,
    guest_count: 500,
    badge: "KAPASITAS MAKSIMAL ✨",
    is_popular: false,
    price_idr: 820000,
    original_price_idr: 1020000,
    discount_percentage: 20,
    shots_options: [10, 20, 30],
    default_shots: 10,
    storage_days: 30,
    is_active: true,
    sort_order: 6,
  },
];

export const Pricing = () => {
  const { settings } = useSettings();
  const waNumber = settings?.company_phone
    ? settings.company_phone.replace(/\D/g, "")
    : "6289514930800";

  const [tiers, setTiers] = useState<WeddingPricingApi[]>(DEFAULT_TIERS);
  const [selectedStopIndex, setSelectedStopIndex] = useState<number>(1); // Default 50 tamu
  const [selectedShots, setSelectedShots] = useState<number>(10);
  const [hasLifetimeAddon, setHasLifetimeAddon] = useState<boolean>(false);
  const [isBenefitsOpen, setIsBenefitsOpen] = useState<boolean>(false);

  const LIFETIME_ADDON_PRICE = 50000;

  // Fetch live pricing tiers from nadrical-system API
  useEffect(() => {
    let isMounted = true;
    fetchWeddingPricings()
      .then((res) => {
        if (isMounted && res.success && res.data && res.data.length > 0) {
          setTiers(res.data);
        }
      })
      .catch(() => {
        // Fallback to DEFAULT_TIERS
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const currentGuests = GUEST_STOPS[selectedStopIndex] || 50;

  // Match current tier based on slider selection
  const currentTier = useMemo(() => {
    const matched = tiers.find((t) => Number(t.guest_count) === currentGuests);
    if (matched) return matched;

    const byIndex = tiers[selectedStopIndex];
    if (byIndex) return byIndex;

    return DEFAULT_TIERS[selectedStopIndex] || DEFAULT_TIERS[1];
  }, [tiers, currentGuests, selectedStopIndex]);

  // Available shots options for current tier
  const validShotsOptions = useMemo(() => {
    return currentTier.shots_options && currentTier.shots_options.length > 0
      ? currentTier.shots_options.map(Number).filter((n) => !isNaN(n))
      : [10];
  }, [currentTier.shots_options]);

  // Derive effective shots
  const effectiveShots = validShotsOptions.includes(selectedShots)
    ? selectedShots
    : Number(currentTier.default_shots) || validShotsOptions[0] || 10;

  const basePrice = Number(currentTier.price_idr) || 0;
  const baseNormalPrice = Number(currentTier.original_price_idr) || 0;
  const price = hasLifetimeAddon ? basePrice + LIFETIME_ADDON_PRICE : basePrice;
  const normalPrice = hasLifetimeAddon
    ? (baseNormalPrice > 0 ? baseNormalPrice + LIFETIME_ADDON_PRICE : LIFETIME_ADDON_PRICE)
    : baseNormalPrice;
  const perGuest = currentGuests > 0 ? Math.round(price / currentGuests) : 0;
  const storageDays = currentTier.storage_days || 7;

  return (
    <section
      id="pricing"
      className="py-24 border-t bg-card/30 dark:bg-zinc-950/40 border-border/70 relative overflow-hidden"
    >
      {/* Background Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-primary/10 blur-[140px] pointer-events-none rounded-full" />

      <div className="container px-6 mx-auto md:px-12 relative z-10">
        {/* Editorial Section Header */}
        <div className="max-w-3xl mx-auto mb-16 text-center">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-primary/15 border border-primary/30 text-xs font-jakarta-bold text-amber-800 dark:text-[#ffbd59] mb-4 uppercase tracking-wider shadow-xs">
            <Sparkles size={13} className="text-[#ffbd59]" />
            <span>TRANSPARAN & TANPA BIAYA TERSEMBUNYI</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-foreground tracking-tight leading-tight">
            Kalkulator Investasi{" "}
            <span className="italic font-normal text-primary">
              Momen Bahagiamu
            </span>
          </h2>
          <p className="mt-4 text-sm sm:text-base font-jakarta text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Cukup sesuaikan estimasi tamu undangan dan jatah jepretan kamera
            untuk melihat simulasi kenangan yang terkumpul dan total biaya secara instan.
          </p>
        </div>

        {/* 2-Column Luxury Layout: Live Experience Simulator (Left) & Investment Configurator (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 max-w-6xl mx-auto items-stretch">
          <PricingLivePreview
            guestCount={currentGuests}
            selectedShots={effectiveShots}
            storageDays={storageDays}
            hasLifetimeAddon={hasLifetimeAddon}
          />

          <PricingCalculatorCard
            currentTier={currentTier}
            guestStops={GUEST_STOPS}
            selectedStopIndex={selectedStopIndex}
            onSelectStopIndex={setSelectedStopIndex}
            selectedShots={effectiveShots}
            onSelectShots={setSelectedShots}
            price={price}
            normalPrice={normalPrice}
            perGuest={perGuest}
            hasLifetimeAddon={hasLifetimeAddon}
            onToggleLifetimeAddon={setHasLifetimeAddon}
            onOpenBenefits={() => setIsBenefitsOpen(true)}
            waNumber={waNumber}
          />
        </div>

        {/* Features & Benefits Modal */}
        <PricingBenefitsModal
          isOpen={isBenefitsOpen}
          onClose={() => setIsBenefitsOpen(false)}
          guestCount={currentGuests}
          storageDays={storageDays}
          shotsPerGuest={effectiveShots}
          hasLifetimeAddon={hasLifetimeAddon}
        />

        {/* Trust Badges Bar */}
        <div className="mt-16 pt-12 border-t border-border/60 max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <div className="flex flex-col items-center text-center p-5 rounded-2xl bg-card/60 border border-border/50 shadow-xs">
              <QrCode size={24} className="text-primary mb-2.5" />
              <h5 className="text-xs sm:text-sm font-jakarta-bold text-foreground">
                Tanpa Unduh Aplikasi
              </h5>
              <p className="text-[11px] text-muted-foreground mt-1">
                Scan langsung kamera HP bawaan, terbuka instan di browser.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-5 rounded-2xl bg-card/60 border border-border/50 shadow-xs">
              <ImageDown size={24} className="text-primary mb-2.5" />
              <h5 className="text-xs sm:text-sm font-jakarta-bold text-foreground">
                Resolusi Original HD
              </h5>
              <p className="text-[11px] text-muted-foreground mt-1">
                Unduh album penuh dengan kualitas asli tanpa kompresi.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-5 rounded-2xl bg-card/60 border border-border/50 shadow-xs">
              <ShieldCheck size={24} className="text-primary mb-2.5" />
              <h5 className="text-xs sm:text-sm font-jakarta-bold text-foreground">
                Privasi Terlindungi
              </h5>
              <p className="text-[11px] text-muted-foreground mt-1">
                Akses terenkripsi, hanya tamu undangan yang dapat melihat foto.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-5 rounded-2xl bg-card/60 border border-border/50 shadow-xs">
              <Headphones size={24} className="text-primary mb-2.5" />
              <h5 className="text-xs sm:text-sm font-jakarta-bold text-foreground">
                Dukungan Penuh Hari H
              </h5>
              <p className="text-[11px] text-muted-foreground mt-1">
                Tim standby memastikan slideshow & upload berjalan lancar.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
