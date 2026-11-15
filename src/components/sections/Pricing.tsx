import { useState, useEffect, useCallback } from "react";
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
import { PricingSlider } from "./pricing/PricingSlider";
import { PricingCard } from "./pricing/PricingCard";
import { PricingBenefitsModal } from "./pricing/PricingBenefitsModal";

const DEFAULT_PACKAGES: WeddingPricingApi[] = [
  {
    id: 1,
    name: "Memory",
    slug: "memory",
    badge: "STARTER FAVORIT",
    is_popular: false,
    original_price_idr: 500000,
    discount_percentage: 35,
    price_idr: 109000,
    min_price_idr: 79000,
    description: "Pilihan favorit untuk mengabadikan momen intim & interaktif bersama para tamu terdekat.",
    guest_count: 50,
    guest_slider_stops: [10, 25, 50, 100, 150, 200, 300, 500],
    shots_options: [10, 15, 25],
    default_shots: 15,
    storage_days: 7,
    features: [
      "Galeri aktif tersimpan 7 hari setelah acara",
      "Kapasitas motret fleksibel sesuai kuota tamu",
      "Scan QR meja tanpa instal aplikasi apapun",
      "Download satu album penuh foto resolusi tinggi",
      "Live slideshow foto tamu di proyektor resepsi",
    ],
    cta_text: "Pilih Paket Memory",
    cta_url: null,
    is_active: true,
    sort_order: 1,
  },
  {
    id: 2,
    name: "Heirloom",
    slug: "heirloom",
    badge: "BEST VALUE & TERLENGKAP ✨",
    is_popular: true,
    original_price_idr: 750000,
    discount_percentage: 30,
    price_idr: 189000,
    min_price_idr: 99000,
    description: "Pilihan terlengkap untuk pesta pernikahan megah dengan kapasitas foto & masa aktif ekstra.",
    guest_count: 150,
    guest_slider_stops: [10, 25, 50, 100, 150, 200, 300, 500],
    shots_options: [15, 25, 50],
    default_shots: 25,
    storage_days: 30,
    features: [
      "Galeri aktif tersimpan 30 hari (4x lebih lama)",
      "Jatah jepretan melimpah hingga 50 foto per tamu",
      "Kustomisasi desain QR Code & panduan nomor meja",
      "Download arsip zip foto resolusi original asli",
      "Fitur ucapan & audio recording pesan tamu",
      "Prioritas bantuan teknis langsung di hari H",
    ],
    cta_text: "Pilih Paket Heirloom",
    cta_url: null,
    is_active: true,
    sort_order: 2,
  },
];

const GUEST_STOPS = [10, 25, 50, 100, 150, 200, 300, 500];

export const Pricing = () => {
  const { settings } = useSettings();
  const waNumber = settings?.company_phone
    ? settings.company_phone.replace(/\D/g, "")
    : "6289514930800";

  const [packages, setPackages] =
    useState<WeddingPricingApi[]>(DEFAULT_PACKAGES);
  const [selectedStopIndex, setSelectedStopIndex] = useState<number>(2); // Default 50 tamu (index 2)
  const [shotsMap, setShotsMap] = useState<Record<number, number>>({
    1: 15,
    2: 25,
  });
  const [activeModalPackage, setActiveModalPackage] =
    useState<WeddingPricingApi | null>(null);

  // Fetch package settings from nadrical-system API
  useEffect(() => {
    let isMounted = true;
    fetchWeddingPricings()
      .then((res) => {
        if (isMounted && res.success && res.data && res.data.length > 0) {
          setPackages(res.data);
          const initialShots: Record<number, number> = {};
          res.data.forEach((p) => {
            initialShots[p.id] = p.default_shots || 15;
          });
          setShotsMap(initialShots);
        }
      })
      .catch(() => {
        // Graceful fallback to default packages
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const currentGuests = GUEST_STOPS[selectedStopIndex] || 50;

  // Dynamic price calculation with fair sub-linear curve for both tiers
  const calculatePricingForPackage = useCallback(
    (pkg: WeddingPricingApi) => {
      const baseGuests =
        pkg.guest_count || (pkg.slug?.includes("heirloom") ? 150 : 50);
      const baseIdr =
        Number(pkg.price_idr) ||
        (pkg.slug?.includes("heirloom") ? 189000 : 109000);
      const discountPercent =
        pkg.discount_percentage || (pkg.slug?.includes("heirloom") ? 30 : 35);

      const ratio = currentGuests / baseGuests;
      const scaleFactor = Math.pow(ratio, 0.7);

      const minFloor = Number(pkg.min_price_idr) || (pkg.slug?.includes("heirloom") ? 99000 : 79000);
      const calculatedPrice = Math.max(
        minFloor,
        Math.round((baseIdr * scaleFactor) / 1000) * 1000,
      );
      const normalPrice = Math.round(
        calculatedPrice / (1 - discountPercent / 100),
      );
      const calculatedPerGuest = Math.round(calculatedPrice / currentGuests);

      return {
        calculatedPrice,
        normalPrice,
        calculatedPerGuest,
      };
    },
    [currentGuests],
  );

  const handleSelectShots = useCallback((pkgId: number, shots: number) => {
    setShotsMap((prev) => ({
      ...prev,
      [pkgId]: shots,
    }));
  }, []);

  return (
    <section
      id="pricing"
      className="py-24 border-t bg-card/30 dark:bg-zinc-950/40 border-border/70 relative overflow-hidden"
    >
      {/* Background Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-[#ffbd59]/10 blur-[130px] pointer-events-none rounded-full" />

      <div className="container px-6 mx-auto md:px-12 relative z-10">
        {/* Promo Header Banner */}
        <div className="max-w-3xl mx-auto mb-14 text-center">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#ffbd59]/15 border border-[#ffbd59]/40 text-xs font-jakarta-bold text-amber-800 dark:text-[#ffbd59] mb-4 uppercase tracking-wider shadow-xs">
            <Sparkles size={13} className="text-[#ffbd59]" />
            <span>HARGA SPESIAL TAHUN INI</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-foreground tracking-tight leading-tight">
            Investasi Abadi untuk{" "}
            <span className="italic font-normal text-primary">
              Momen Bahagiamu
            </span>
          </h2>
          <p className="mt-4 text-sm sm:text-base font-jakarta text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Semua paket mencakup galeri online live, filter disposable camera
            interaktif, dan unduhan album penuh tanpa batasan tamu tersembunyi.
          </p>
        </div>

        {/* Central Guest Estimator Slider with Radix UI + NumberFlow */}
        <PricingSlider
          stops={GUEST_STOPS}
          currentIndex={selectedStopIndex}
          onIndexChange={setSelectedStopIndex}
          guestCount={currentGuests}
        />

        {/* Side-by-Side Dual Pricing Cards Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 max-w-5xl mx-auto items-stretch">
          {packages.slice(0, 2).map((pkg) => {
            const pricing = calculatePricingForPackage(pkg);
            const currentShots = shotsMap[pkg.id] || pkg.default_shots || 15;

            return (
              <PricingCard
                key={pkg.id}
                pkg={pkg}
                currentGuests={currentGuests}
                calculatedPrice={pricing.calculatedPrice}
                normalPrice={pricing.normalPrice}
                calculatedPerGuest={pricing.calculatedPerGuest}
                selectedShots={currentShots}
                onSelectShots={(shots) => handleSelectShots(pkg.id, shots)}
                onOpenBenefits={() => setActiveModalPackage(pkg)}
                waNumber={waNumber}
              />
            );
          })}
        </div>

        {/* Trust Badges & Value Guarantee Bar */}
        <div className="mt-16 pt-12 border-t border-border/60 max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex flex-col items-center text-center p-4 rounded-2xl bg-muted/30 border border-border/40">
              <QrCode size={24} className="text-[#ffbd59] mb-2" />
              <h5 className="text-xs sm:text-sm font-jakarta-bold text-foreground">
                Tanpa Instal Aplikasi
              </h5>
              <p className="text-[11px] text-muted-foreground mt-1">
                Cukup scan kamera HP biasa langsung terbuka di browser.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-4 rounded-2xl bg-muted/30 border border-border/40">
              <ImageDown size={24} className="text-[#ffbd59] mb-2" />
              <h5 className="text-xs sm:text-sm font-jakarta-bold text-foreground">
                Resolusi Penuh Asli
              </h5>
              <p className="text-[11px] text-muted-foreground mt-1">
                Download seluruh file foto dalam ukuran aslinya tanpa kompresi.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-4 rounded-2xl bg-muted/30 border border-border/40">
              <ShieldCheck size={24} className="text-[#ffbd59] mb-2" />
              <h5 className="text-xs sm:text-sm font-jakarta-bold text-foreground">
                Privasi Terjaga
              </h5>
              <p className="text-[11px] text-muted-foreground mt-1">
                Akses khusus tamu undangan Anda, aman dari publik luar.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-4 rounded-2xl bg-muted/30 border border-border/40">
              <Headphones size={24} className="text-[#ffbd59] mb-2" />
              <h5 className="text-xs sm:text-sm font-jakarta-bold text-foreground">
                Bantuan Hari H
              </h5>
              <p className="text-[11px] text-muted-foreground mt-1">
                Tim teknis stand by memastikan live slideshow berjalan mulus.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Detail Modal */}
      {activeModalPackage && (
        <PricingBenefitsModal
          isOpen={!!activeModalPackage}
          onClose={() => setActiveModalPackage(null)}
          selectedPackage={activeModalPackage}
        />
      )}
    </section>
  );
};
