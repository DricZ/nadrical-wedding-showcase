import { memo } from "react";
import {
  Camera,
  Users,
  Calendar,
  Sparkles,
  QrCode,
  MonitorPlay,
  Download,
  ShieldCheck,
} from "lucide-react";
import NumberFlow from "@number-flow/react";

interface PricingLivePreviewProps {
  guestCount: number;
  selectedShots: number;
  storageDays: number;
  hasLifetimeAddon?: boolean;
}

export const PricingLivePreview = memo(function PricingLivePreview({
  guestCount,
  selectedShots,
  storageDays,
  hasLifetimeAddon,
}: PricingLivePreviewProps) {
  const totalPhotos = guestCount * selectedShots;

  return (
    <div className="flex flex-col w-full h-full justify-between p-6 sm:p-8 rounded-[2.5rem] border border-border/70 bg-card/75 dark:bg-zinc-900/70 backdrop-blur-xl shadow-xl relative overflow-hidden transition-all duration-300">
      {/* Ambient background glow inside card */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#ffbd59]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Section: Title & Subtitle */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/80 border border-border text-[11px] font-jakarta-bold uppercase tracking-wider text-muted-foreground mb-3">
          <Sparkles size={12} className="text-[#ffbd59]" />
          <span>Preview</span>
        </div>

        <h3 className="font-serif text-2xl font-bold tracking-tight sm:text-3xl text-foreground">
          Sudut Pandang Momen yang{" "}
          <span className="italic font-normal text-primary">Tak Terduga</span>
        </h3>
        <p className="mt-2 text-xs leading-relaxed sm:text-sm font-jakarta text-muted-foreground">
          Fotografer utama fokus pada panggung pelaminan, sementara Lument
          mengabadikan tawa hangat, haru, dan keseruan para tamu di setiap meja.
        </p>

        {/* Dynamic 3-Column Metric Cards with NumberFlow */}
        <div className="grid grid-cols-3 gap-3 my-6">
          {/* Metric 1: Total Photos */}
          <div className="flex flex-col p-3.5 sm:p-4 rounded-2xl bg-background/80 border border-border/60 shadow-xs">
            <div className="flex items-center gap-1 text-[11px] font-jakarta-medium text-muted-foreground mb-1">
              <Camera size={13} className="text-primary" />
              <span className="hidden sm:inline">Total Foto</span>
              <span className="sm:hidden">Foto</span>
            </div>
            <div className="flex items-baseline text-xl font-space-bold sm:text-2xl text-foreground">
              <NumberFlow
                value={totalPhotos}
                locales="id-ID"
                isolate
                willChange
                transformTiming={{
                  duration: 200,
                  easing: "cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              />
              <span className="text-xs text-muted-foreground ml-0.5">+</span>
            </div>
            <span className="text-[10px] text-muted-foreground/80 mt-0.5">
              Candid terkumpul
            </span>
          </div>

          {/* Metric 2: Guests */}
          <div className="flex flex-col p-3.5 sm:p-4 rounded-2xl bg-background/80 border border-border/60 shadow-xs">
            <div className="flex items-center gap-1 text-[11px] font-jakarta-medium text-muted-foreground mb-1">
              <Users size={13} className="text-primary" />
              <span>Kapasitas</span>
            </div>
            <div className="flex items-baseline text-xl font-space-bold sm:text-2xl text-foreground">
              {guestCount >= 500 ? (
                <span className="text-lg font-bold text-amber-500 sm:text-xl">
                  Unlimited
                </span>
              ) : (
                <>
                  <NumberFlow
                    value={guestCount}
                    locales="id-ID"
                    isolate
                    willChange
                    transformTiming={{
                      duration: 200,
                      easing: "cubic-bezier(0.16, 1, 0.3, 1)",
                    }}
                  />
                  <span className="text-xs font-jakarta ml-0.5">Tamu</span>
                </>
              )}
            </div>
            <span className="text-[10px] text-muted-foreground/80 mt-0.5">
              {guestCount >= 500 ? "Kapasitas tanpa batas" : "Tamu ikut motret"}
            </span>
          </div>

          {/* Metric 3: Storage */}
          <div className="flex flex-col p-3.5 sm:p-4 rounded-2xl bg-background/80 border border-border/60 shadow-xs">
            <div className="flex items-center gap-1 text-[11px] font-jakarta-medium text-muted-foreground mb-1">
              <Calendar size={13} className="text-primary" />
              <span>Simpan</span>
            </div>
            <div className="flex items-baseline text-xl font-space-bold sm:text-2xl text-foreground">
              {hasLifetimeAddon ? (
                <span className="text-base font-bold text-amber-500 sm:text-lg">
                  Selamanya ♾️
                </span>
              ) : (
                <>
                  <NumberFlow
                    value={storageDays}
                    locales="id-ID"
                    isolate
                    willChange
                    transformTiming={{
                      duration: 200,
                      easing: "cubic-bezier(0.16, 1, 0.3, 1)",
                    }}
                  />
                  <span className="text-xs font-jakarta ml-0.5">Hari</span>
                </>
              )}
            </div>
            <span className="text-[10px] text-muted-foreground/80 mt-0.5">
              {hasLifetimeAddon ? "Akses cloud lifetime" : "Akses cloud aktif"}
            </span>
          </div>
        </div>
      </div>

      {/* Feature Highlights Grid at Bottom */}
      <div className="grid grid-cols-1 gap-3 pt-5 mt-6 border-t sm:grid-cols-2 border-border/60">
        <div className="flex items-start gap-2.5">
          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary mt-0.5">
            <QrCode size={13} />
          </div>
          <div>
            <h5 className="text-xs font-jakarta-bold text-foreground">
              Scan QR Langsung
            </h5>
            <p className="text-[11px] text-muted-foreground leading-snug">
              Kamera aktif di browser HP tamu tanpa perlu install aplikasi.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-2.5">
          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary mt-0.5">
            <MonitorPlay size={13} />
          </div>
          <div>
            <h5 className="text-xs font-jakarta-bold text-foreground">
              Live Slideshow Proyektor
            </h5>
            <p className="text-[11px] text-muted-foreground leading-snug">
              Foto tamu langsung tayang di layar venue secara real-time.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-2.5">
          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary mt-0.5">
            <Download size={13} />
          </div>
          <div>
            <h5 className="text-xs font-jakarta-bold text-foreground">
              Unduh File Original
            </h5>
            <p className="text-[11px] text-muted-foreground leading-snug">
              Download satu album penuh foto resolusi tinggi tanpa kompresi.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-2.5">
          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary mt-0.5">
            <ShieldCheck size={13} />
          </div>
          <div>
            <h5 className="text-xs font-jakarta-bold text-foreground">
              Privasi Spesial Acara
            </h5>
            <p className="text-[11px] text-muted-foreground leading-snug">
              Terkunci dengan token acara, aman dari konsumsi publik luar.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
});
