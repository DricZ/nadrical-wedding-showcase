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
  const isUnlimited = guestCount >= 500;
  const isEffectiveLifetime = isUnlimited || hasLifetimeAddon;
  const totalPhotos = guestCount * selectedShots;

  return (
    <div className="flex flex-col w-full h-full justify-center p-5 sm:p-6 lg:p-7 rounded-2xl sm:rounded-3xl lg:rounded-[2rem] border border-border/70 bg-card/75 dark:bg-zinc-900/70 backdrop-blur-xl shadow-xl relative overflow-hidden transition-all duration-300">
      {/* Ambient background glow inside card */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#ffbd59]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Vertically centered inner container: eliminates empty void gap */}
      <div className="flex flex-col justify-center w-full my-auto">
        {/* Top Section: Title & Subtitle */}
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-secondary/80 border border-border text-[10px] sm:text-[11px] font-jakarta-bold uppercase tracking-wider text-muted-foreground mb-2">
            <Sparkles size={11} className="text-[#ffbd59]" />
            <span>Preview</span>
          </div>

          <h3 className="font-serif text-xl font-bold leading-tight tracking-tight sm:text-2xl text-foreground">
            Here's{" "}
            <span className="italic font-normal text-primary">
              What You'll Get
            </span>
          </h3>
          <p className="mt-1 text-xs leading-relaxed font-jakarta text-muted-foreground">
            A real look at the candid photos, funny moments, and warm wishes
            your guests will capture during your wedding
          </p>

          {/* Dynamic 3-Column Metric Cards with NumberFlow */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3 my-3.5 sm:my-4">
            {/* Metric 1: Total Photos */}
            <div className="flex flex-col p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl bg-background/80 border border-border/60 shadow-xs">
              <div className="flex items-center gap-1 text-[10px] sm:text-[11px] font-jakarta-medium text-muted-foreground mb-0.5">
                <Camera size={12} className="text-primary" />
                <span className="hidden sm:inline">Total Photos</span>
                <span className="sm:hidden">Photos</span>
              </div>
              <div className="flex items-baseline text-lg font-space-bold sm:text-xl text-foreground">
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
              <span className="text-[9px] sm:text-[10px] text-muted-foreground/80 mt-0.5">
                Collected Moments
              </span>
            </div>

            {/* Metric 2: Guests */}
            <div className="flex flex-col p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl bg-background/80 border border-border/60 shadow-xs">
              <div className="flex items-center gap-1 text-[10px] sm:text-[11px] font-jakarta-medium text-muted-foreground mb-0.5">
                <Users size={12} className="text-primary" />
                <span>Guests</span>
              </div>
              <div className="flex items-baseline text-lg font-space-bold sm:text-xl text-foreground">
                {guestCount >= 500 ? (
                  <span className="text-base font-bold text-amber-500 sm:text-lg">
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
                    <span className="text-xs font-jakarta ml-0.5">
                      {guestCount === 1 ? "Guest" : "Guests"}
                    </span>
                  </>
                )}
              </div>
              <span className="text-[9px] sm:text-[10px] text-muted-foreground/80 mt-0.5">
                {guestCount >= 500
                  ? "Unlimited Guests"
                  : "Guests can capture photos"}
              </span>
            </div>

            {/* Metric 3: Storage */}
            <div className="flex flex-col p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl bg-background/80 border border-border/60 shadow-xs">
              <div className="flex items-center gap-1 text-[10px] sm:text-[11px] font-jakarta-medium text-muted-foreground mb-0.5">
                <Calendar size={12} className="text-primary" />
                <span>Gallery</span>
              </div>
              <div className="flex items-baseline text-lg font-space-bold sm:text-xl text-foreground">
                {isEffectiveLifetime ? (
                  <span className="text-sm font-bold text-amber-500 sm:text-base">
                    Forever
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
                    <span className="text-xs font-jakarta ml-0.5">Days</span>
                  </>
                )}
              </div>
              <span className="text-[9px] sm:text-[10px] text-muted-foreground/80 mt-0.5">
                {isEffectiveLifetime ? "Lifetime Access" : "Cloud Storage Active"}
              </span>
            </div>
          </div>
        </div>

        {/* Feature Highlights Grid: Perfectly integrated without big gaps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 pt-3.5 sm:pt-4 border-t border-border/60">
          <div className="flex items-start gap-2.5">
            <div className="flex h-5 w-5 sm:h-6 sm:w-6 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary mt-0.5">
              <QrCode size={12} className="sm:size-3.5" />
            </div>
            <div>
              <h5 className="text-[11px] sm:text-xs font-jakarta-bold text-foreground">
                Instant QR Scan
              </h5>
              <p className="text-[10px] sm:text-[11px] text-muted-foreground leading-snug">
                Opens directly in your guests' phone browser—no app download
                needed.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <div className="flex h-5 w-5 sm:h-6 sm:w-6 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary mt-0.5">
              <MonitorPlay size={12} className="sm:size-3.5" />
            </div>
            <div>
              <h5 className="text-[11px] sm:text-xs font-jakarta-bold text-foreground">
                Live Gallery
              </h5>
              <p className="text-[10px] sm:text-[11px] text-muted-foreground leading-snug">
                Guest photos appear instantly in your digital wedding feed in
                real time.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <div className="flex h-5 w-5 sm:h-6 sm:w-6 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary mt-0.5">
              <Download size={12} className="sm:size-3.5" />
            </div>
            <div>
              <h5 className="text-[11px] sm:text-xs font-jakarta-bold text-foreground">
                Download Files
              </h5>
              <p className="text-[10px] sm:text-[11px] text-muted-foreground leading-snug">
                Download the entire album in full high resolution without
                quality loss.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <div className="flex h-5 w-5 sm:h-6 sm:w-6 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary mt-0.5">
              <ShieldCheck size={12} className="sm:size-3.5" />
            </div>
            <div>
              <h5 className="text-[11px] sm:text-xs font-jakarta-bold text-foreground">
                Media Privacy
              </h5>
              <p className="text-[10px] sm:text-[11px] text-muted-foreground leading-snug">
                Guests can choose to share photos on the public feed or send
                them privately just for the couple.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
