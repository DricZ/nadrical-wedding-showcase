import { useState, useEffect, useMemo, useCallback } from "react";
import { Sparkles } from "lucide-react";
import { useSettings } from "../../contexts/SettingsContext";
import { fetchWeddingPricings, type WeddingPricingApi } from "../../services/api";
import { RetroCameraPreview } from "./pricing/RetroCameraPreview";
import { PricingCalculatorCard } from "./pricing/PricingCalculatorCard";
import { PricingBenefitsModal } from "./pricing/PricingBenefitsModal";

const DEFAULT_PACKAGES: WeddingPricingApi[] = [
  {
    id: 1,
    name: "Memory",
    slug: "memory",
    badge: "PALING LARIS ⚡",
    is_popular: true,
    original_price_idr: 500000,
    discount_percentage: 35,
    price_idr: 109000,
    price_usd: 15,
    guest_count: 50,
    guest_slider_stops: [5, 10, 25, 50, 100, 150, 200, 500],
    shots_options: [10, 15, 25],
    default_shots: 15,
    storage_days: 7,
    features: [
      "Galeri tersimpan 7 hari setelah acara",
      "Sampai 50 tamu bisa ikut motret",
      "Download satu album penuh foto resolusi tinggi",
      "Scan QR meja tanpa instal aplikasi apapun",
      "Live slide show foto para tamu saat resepsi",
    ],
    cta_text: "Buat event kamu",
    cta_url: null,
    is_active: true,
    sort_order: 1,
  },
  {
    id: 2,
    name: "Heirloom",
    slug: "heirloom",
    badge: "BEST VALUE ✨",
    is_popular: false,
    original_price_idr: 750000,
    discount_percentage: 30,
    price_idr: 189000,
    price_usd: 25,
    guest_count: 150,
    guest_slider_stops: [5, 10, 25, 50, 100, 150, 200, 500],
    shots_options: [15, 25, 50],
    default_shots: 25,
    storage_days: 30,
    features: [
      "Galeri tersimpan 30 hari setelah acara",
      "Hingga 150 tamu bisa ikut motret",
      "Jatah 25 jepretan per tamu",
      "Download zip album original & resolusi tinggi",
      "Filter audio pesan & ucapan tamu",
      "Dukungan kustomisasi QR code meja",
    ],
    cta_text: "Pilih Paket Heirloom",
    cta_url: null,
    is_active: true,
    sort_order: 2,
  },
];

const DEFAULT_STOPS = [5, 10, 25, 50, 100, 150, 200, 500];

export const Pricing = () => {
  const { settings } = useSettings();
  const waNumber = settings?.company_phone
    ? settings.company_phone.replace(/\D/g, "")
    : "6289514930800";

  const [packages, setPackages] = useState<WeddingPricingApi[]>(DEFAULT_PACKAGES);
  const [selectedPackage, setSelectedPackage] = useState<WeddingPricingApi>(DEFAULT_PACKAGES[0]);
  const [currency, setCurrency] = useState<"IDR" | "USD">("IDR");
  const [selectedStopIndex, setSelectedStopIndex] = useState<number>(3); // Default index 3 => 50 tamu
  const [selectedShots, setSelectedShots] = useState<number>(15);
  const [isBenefitsModalOpen, setIsBenefitsModalOpen] = useState(false);

  // Fetch from API in nadrical-system
  useEffect(() => {
    let isMounted = true;
    fetchWeddingPricings()
      .then((res) => {
        if (isMounted && res.success && res.data && res.data.length > 0) {
          setPackages(res.data);
          const popularOrFirst = res.data.find((p) => p.is_popular) || res.data[0];
          setSelectedPackage(popularOrFirst);
          if (popularOrFirst.default_shots) {
            setSelectedShots(popularOrFirst.default_shots);
          }
        }
      })
      .catch(() => {
        // Silently use defaults
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const guestStops = useMemo(() => {
    if (
      selectedPackage.guest_slider_stops &&
      Array.isArray(selectedPackage.guest_slider_stops) &&
      selectedPackage.guest_slider_stops.length > 0
    ) {
      const parsed = selectedPackage.guest_slider_stops.map(Number).filter((n) => !isNaN(n));
      return parsed.length > 0 ? parsed : DEFAULT_STOPS;
    }
    return DEFAULT_STOPS;
  }, [selectedPackage]);

  const currentGuests = guestStops[selectedStopIndex] || 50;

  // Recalculate price dynamically based on guest slider
  const { calculatedPriceIdr, calculatedPriceUsd, calculatedPerGuestIdr, calculatedPerGuestUsd } = useMemo(() => {
    const baseGuests = selectedPackage.guest_count || 50;
    const baseIdr = Number(selectedPackage.price_idr) || 109000;
    const baseUsd = Number(selectedPackage.price_usd) || 15;

    // Sub-linear volume curve for fair scaling
    const ratio = currentGuests / baseGuests;
    const scaleFactor = Math.pow(ratio, 0.72);

    const priceIdr = Math.max(79000, Math.round((baseIdr * scaleFactor) / 1000) * 1000);
    const priceUsd = Math.max(9, Math.round(baseUsd * scaleFactor));

    const perGuestIdr = Math.round(priceIdr / currentGuests);
    const perGuestUsd = Number((priceUsd / currentGuests).toFixed(2));

    return {
      calculatedPriceIdr: priceIdr,
      calculatedPriceUsd: priceUsd,
      calculatedPerGuestIdr: perGuestIdr,
      calculatedPerGuestUsd: perGuestUsd,
    };
  }, [selectedPackage, currentGuests]);

  const handleSelectPackage = useCallback((pkg: WeddingPricingApi) => {
    setSelectedPackage(pkg);
    if (pkg.default_shots) {
      setSelectedShots(pkg.default_shots);
    }
  }, []);

  return (
    <section id="pricing" className="py-24 border-t bg-card/40 border-border/70 relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-primary/8 blur-3xl pointer-events-none rounded-full" />

      <div className="container px-6 mx-auto md:px-12 relative z-10">
        {/* Promo Header Banner */}
        <div className="max-w-2xl mx-auto mb-16 text-center">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#ffbd59]/15 border border-[#ffbd59]/40 text-xs font-jakarta-bold text-amber-700 dark:text-[#ffbd59] mb-4 uppercase tracking-wider shadow-xs">
            <Sparkles size={13} />
            <span>PROMO BULAN INI</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-foreground tracking-tight leading-tight">
            Memory & Heirloom{" "}
            <span className="italic font-normal text-primary">30% OFF</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base font-jakarta text-muted-foreground leading-relaxed">
            Pilih paket dan tentukan estimasi kuota tamu acaramu. Abadikan seluruh momen candid tamu pernikahanmu secara live tanpa ribet.
          </p>
        </div>

        {/* 2-Column Responsive Layout: Retro Camera Viewfinder (Left) & Calculator Card (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-14 items-center max-w-6xl mx-auto">
          {/* Left: Retro Disposable Camera Viewfinder */}
          <RetroCameraPreview
            guestCount={currentGuests >= 500 ? "500+" : currentGuests}
            selectedShots={selectedShots}
            storageDays={selectedPackage.storage_days || 7}
            features={selectedPackage.features}
          />

          {/* Right: Interactive Pricing Calculator Card */}
          <PricingCalculatorCard
            packages={packages}
            selectedPackage={selectedPackage}
            onSelectPackage={handleSelectPackage}
            currency={currency}
            onToggleCurrency={setCurrency}
            guestStops={guestStops}
            selectedStopIndex={selectedStopIndex}
            onSelectStopIndex={setSelectedStopIndex}
            selectedShots={selectedShots}
            onSelectShots={setSelectedShots}
            calculatedPriceIdr={calculatedPriceIdr}
            calculatedPriceUsd={calculatedPriceUsd}
            calculatedPerGuestIdr={calculatedPerGuestIdr}
            calculatedPerGuestUsd={calculatedPerGuestUsd}
            onOpenBenefits={() => setIsBenefitsModalOpen(true)}
            waNumber={waNumber}
          />
        </div>
      </div>

      {/* Benefits Detail Modal */}
      <PricingBenefitsModal
        isOpen={isBenefitsModalOpen}
        onClose={() => setIsBenefitsModalOpen(false)}
        selectedPackage={selectedPackage}
      />
    </section>
  );
};
