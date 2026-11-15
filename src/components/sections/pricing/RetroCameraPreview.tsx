import { memo } from "react";
import { Check, QrCode, Camera, Images, Sparkles } from "lucide-react";
import NumberFlow from "@number-flow/react";

interface RetroCameraPreviewProps {
  guestCount: number;
  selectedShots: number;
  storageDays: number;
}

export const RetroCameraPreview = memo(function RetroCameraPreview({
  guestCount,
  selectedShots,
  storageDays,
}: RetroCameraPreviewProps) {
  // Hardcoded standard features based on user requirements
  const features = [
    `Galeri aktif tersimpan ${storageDays || 7} hari setelah acara`,
    `Sampai ${guestCount >= 500 ? "500+" : guestCount} tamu bisa ikut motret`,
    "Download satu album penuh foto resolusi tinggi asli",
    "Scan QR meja langsung tanpa perlu download aplikasi",
  ];

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-lg mx-auto">
      {/* Disposable Camera Body */}
      <div className="relative w-full aspect-16/10 rounded-[2.5rem] bg-gradient-to-br from-zinc-900 via-zinc-950 to-neutral-900 border-4 border-zinc-800/90 shadow-2xl overflow-hidden p-3.5 sm:p-4 select-none">
        {/* Subtle camera lens glare / lighting */}
        <div className="absolute inset-0 bg-radial from-amber-500/10 via-transparent to-black/50 pointer-events-none" />

        {/* Top Hardware Row: Lens / Eyepiece, Brand & Frame Counter */}
        <div className="relative z-10 flex items-center justify-between px-3 pt-1 pb-2">
          {/* Eyepiece / Viewfinder Lens */}
          <div className="flex items-center gap-2">
            <div className="flex h-5 w-8 rounded-md bg-zinc-800 border border-zinc-700/80 shadow-inner items-center justify-center">
              <div className="h-2 w-3 rounded-xs bg-amber-400/80 shadow-xs shadow-amber-400/50" />
            </div>
            <span className="text-[10px] tracking-widest text-zinc-400 font-mono font-bold uppercase">
              NADRICAL CAM
            </span>
          </div>

          {/* Flash & Frame Counter Wheel */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-zinc-800/90 border border-amber-500/30 text-[10px] font-mono text-amber-300 shadow-xs">
              <Sparkles size={11} className="text-[#ffbd59]" />
              <span>FLASH READY</span>
            </div>

            {/* Frame Counter Wheel (Selected Shots) */}
            <div
              className="flex h-7 px-2.5 items-center justify-center rounded-lg bg-zinc-800 border-2 border-zinc-700 text-xs font-mono font-bold text-amber-400 shadow-inner"
              title="Jatah jepretan per-tamu"
            >
              <span>{selectedShots}</span>
            </div>
          </div>
        </div>

        {/* Main Viewfinder Monitor */}
        <div className="relative z-10 w-full h-[calc(100%-2.5rem)] rounded-2xl bg-zinc-900/95 border-2 border-zinc-800 overflow-hidden shadow-inner flex flex-col justify-between p-3.5 sm:p-4">
          {/* Warm background lighting */}
          <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 via-amber-900/10 to-black/85 pointer-events-none" />

          {/* Top Status inside Viewfinder */}
          <div className="relative z-10 flex items-center justify-between text-[11px] text-zinc-300 font-medium">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md border border-white/10 text-[10px]">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              LIVE EVENT MODE
            </span>
            <span className="text-[10px] tracking-wider text-zinc-400 font-mono">
              3:2 4K RES
            </span>
          </div>

          {/* Center Dynamic Counter Display with NumberFlow */}
          <div className="relative z-10 flex flex-col items-center justify-center my-auto text-center py-2">
            <div className="px-6 py-2.5 rounded-2xl bg-black/70 backdrop-blur-md border border-[#ffbd59]/40 shadow-xl shadow-amber-500/10 flex flex-col items-center">
              <div className="font-space-bold text-4xl sm:text-5xl text-white tracking-tight flex items-baseline justify-center">
                <NumberFlow value={guestCount} locales="id-ID" />
                {guestCount >= 500 && <span className="text-2xl text-amber-400 ml-0.5">+</span>}
              </div>
              <span className="text-xs sm:text-sm font-jakarta-bold tracking-widest text-[#ffbd59] uppercase mt-0.5">
                TAMU UNDANGAN
              </span>
            </div>
          </div>

          {/* Step Indicators: 1. Scan QR, 2. Jepret, 3. Lihat Hasil */}
          <div className="relative z-10 grid grid-cols-3 gap-2 pt-2 border-t border-white/10">
            <div className="flex flex-col items-center justify-center p-1.5 rounded-xl bg-black/50 backdrop-blur-md border border-white/10 text-center">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#ffbd59]/20 text-[#ffbd59] mb-1">
                <QrCode size={13} />
              </div>
              <span className="text-[10px] font-semibold text-zinc-200 leading-tight">
                1. Scan QR
              </span>
            </div>

            <div className="flex flex-col items-center justify-center p-1.5 rounded-xl bg-black/50 backdrop-blur-md border border-white/10 text-center">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#ffbd59]/20 text-[#ffbd59] mb-1">
                <Camera size={13} />
              </div>
              <span className="text-[10px] font-semibold text-zinc-200 leading-tight">
                2. Jepret
              </span>
            </div>

            <div className="flex flex-col items-center justify-center p-1.5 rounded-xl bg-black/50 backdrop-blur-md border border-white/10 text-center">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#ffbd59]/20 text-[#ffbd59] mb-1">
                <Images size={13} />
              </div>
              <span className="text-[10px] font-semibold text-zinc-200 leading-tight">
                3. Lihat Hasil
              </span>
            </div>
          </div>
        </div>

        {/* Right Camera Grip Ridges */}
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col gap-1.5 pointer-events-none opacity-40">
          <div className="h-6 w-1 rounded-full bg-zinc-600" />
          <div className="h-6 w-1 rounded-full bg-zinc-600" />
          <div className="h-6 w-1 rounded-full bg-zinc-600" />
        </div>
      </div>

      {/* Feature Checkmarks Below the Camera Frame */}
      <div className="w-full mt-6 space-y-2.5 px-2">
        {features.map((item, index) => (
          <div key={index} className="flex items-start gap-3">
            <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#ffbd59]/20 text-[#ffbd59] mt-0.5">
              <Check size={13} strokeWidth={3} />
            </div>
            <span className="text-xs sm:text-sm font-jakarta text-foreground/85 leading-snug">
              {item}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
});

