import { useState, useEffect, useMemo } from "react";
import { Sparkles } from "lucide-react";
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
    ? baseNormalPrice > 0
      ? baseNormalPrice + LIFETIME_ADDON_PRICE
      : LIFETIME_ADDON_PRICE
    : baseNormalPrice;
  const perGuest = currentGuests > 0 ? Math.round(price / currentGuests) : 0;
  const storageDays = currentTier.storage_days || 7;

  return (
    <section
      id="pricing"
      className="relative flex flex-col justify-center border-t bg-card/30 dark:bg-zinc-950/40 border-border/70 overflow-hidden min-h-screen lg:h-[100dvh] lg:max-h-[100dvh] py-16 sm:py-20 lg:py-0"
    >
      {/* Background Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-primary/10 blur-[140px] pointer-events-none rounded-full" />

      <div className="container relative z-10 flex flex-col justify-center w-full px-4 mx-auto sm:px-6 md:px-12 lg:pt-16 lg:pb-4">
        {/* Compact Editorial Section Header */}
        <div className="max-w-2xl mx-auto mb-3 text-center sm:mb-4 lg:mb-5 shrink-0">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/15 border border-primary/30 text-[10px] sm:text-xs font-jakarta-bold text-amber-800 dark:text-[#ffbd59] mb-1.5 uppercase tracking-wider shadow-xs">
            <Sparkles size={11} className="text-[#ffbd59]" />
            <span>CLEAN PRICING</span>
          </div>

          <h2 className="font-serif text-2xl leading-tight tracking-tight sm:text-3xl lg:text-3xl text-foreground">
            Plan Your{" "}
            <span className="italic font-normal text-primary">
              Wedding Album
            </span>
          </h2>
          <p className="hidden max-w-xl mx-auto mt-1 text-xs leading-snug sm:text-sm font-jakarta text-muted-foreground sm:block">
            Slide to pick your guest count and photos per guest to see how many
            memories you will get and the total cost
          </p>
        </div>

        {/* 2-Column Luxury Layout: Live Experience Simulator (Left) & Investment Configurator (Right) */}
        <div className="grid items-stretch w-full max-w-5xl grid-cols-1 gap-4 mx-auto lg:grid-cols-2 sm:gap-6 lg:gap-6 xl:gap-8 xl:max-w-6xl">
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
      </div>
    </section>
  );
};
