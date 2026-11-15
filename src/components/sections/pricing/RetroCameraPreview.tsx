import { memo } from "react";
import { Check, QrCode, Camera, Images, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

interface RetroCameraPreviewProps {
  guestCount: number | string;
  selectedShots: number;
  storageDays: number;
  features?: string[] | null;
}

export const RetroCameraPreview = memo(function RetroCameraPreview({
  guestCount,
  selectedShots,
  storageDays,
  features,
}: RetroCameraPreviewProps) {
  const displayFeatures = features && features.length > 0 ? features.slice(0, 4) : [
    `Galeri tersimpan ${storageDays} hari setelah acara`,
    `Sampai ${guestCount} tamu bisa ikut motret`,
    "Download satu album penuh foto & video HD",
    "Scan QR meja tanpa perlu instal aplikasi",
  ];

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-lg mx-auto">
      {/* Disposable Camera Frame */}
      <div className="relative w-full aspect-16/10 rounded-[2.5rem] bg-gradient-to-br from-zinc-900 via-zinc-950 to-neutral-900 border-4 border-zinc-800/80 shadow-2xl overflow-hidden p-3 sm:p-4 select-none">
        {/* Subtle camera texture highlight */}
        <div className="absolute inset-0 bg-radial from-amber-500/5 via-transparent to-black/40 pointer-events-none" />

        {/* Top Camera Hardware: Flash, Eyepiece & Frame Counter Wheel */}
        <div className="relative z-10 flex items-center justify-between px-3 pt-1 pb-2">
          {/* Eyepiece / Lens Sensor */}
          <div className="flex items-center gap-2">
            <div className="flex h-5 w-8 rounded-md bg-zinc-800 border border-zinc-700/80 shadow-inner items-center justify-center">
              <div className="h-2 w-3 rounded-xs bg-amber-400/80 shadow-xs shadow-amber-400/50" />
            </div>
            <span className="text-[10px] tracking-widest text-zinc-400 font-mono font-bold uppercase">
              NADRICAL CAM
            </span>
          </div>

          {/* Flash Bulb with warm glow */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-zinc-800/90 border border-amber-500/30 text-[10px] font-mono text-amber-300 shadow-xs">
              <Sparkles size={11} className="text-[#ffbd59]" />
              <span>FLASH ON</span>
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
        <div className="relative z-10 w-full h-[calc(100%-2.5rem)] rounded-2xl bg-zinc-900/90 border-2 border-zinc-800 overflow-hidden shadow-inner flex flex-col justify-between p-3 sm:p-4">
          {/* Festive Background Artwork / Warm Lighting */}
          <div className="absolute inset-0 bg-gradient-to-b from-amber-100/10 via-amber-900/10 to-black/80 pointer-events-none" />
          
          {/* Couple & Guests Silhouette Illustration */}
          <div className="absolute inset-x-0 bottom-0 h-28 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-amber-200/20 via-black/40 to-transparent pointer-events-none" />

          {/* Top Status inside Viewfinder */}
          <div className="relative z-10 flex items-center justify-between text-[11px] text-zinc-300 font-medium">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-black/50 backdrop-blur-md border border-white/10">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              LIVE EVENT READY
            </span>
            <span className="text-[10px] tracking-wider text-zinc-400 font-mono">
              3:2 4K RES
            </span>
          </div>

          {/* Center Dynamic Counter Display */}
          <div className="relative z-10 flex flex-col items-center justify-center my-auto text-center py-2">
            <motion.div
              key={String(guestCount)}
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              className="px-6 py-2 rounded-2xl bg-black/65 backdrop-blur-md border border-[#ffbd59]/40 shadow-xl shadow-amber-500/10 flex flex-col items-center"
            >
              <span className="font-space-bold text-4xl sm:text-5xl text-white tracking-tight">
                {guestCount}
              </span>
              <span className="text-xs sm:text-sm font-jakarta-bold tracking-widest text-[#ffbd59] uppercase mt-0.5">
                TAMU
              </span>
            </motion.div>
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

        {/* Right Camera Grip Ribs */}
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col gap-1.5 pointer-events-none opacity-40">
          <div className="h-6 w-1 rounded-full bg-zinc-600" />
          <div className="h-6 w-1 rounded-full bg-zinc-600" />
          <div className="h-6 w-1 rounded-full bg-zinc-600" />
        </div>
      </div>

      {/* Feature Checkmarks Below the Camera Frame */}
      <div className="w-full mt-6 space-y-2.5 px-2">
        {displayFeatures.map((item, index) => (
          <div key={index} className="flex items-start gap-3">
            <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#ffbd59]/20 text-[#ffbd59] mt-0.5">
              <Check size={13} strokeWidth={3} />
            </div>
            <span className="text-sm font-jakarta text-foreground/85 leading-snug">
              {item}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
});

