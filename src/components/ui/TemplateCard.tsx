import { useState, memo, useRef, useEffect } from "react";
import { motion, type HTMLMotionProps, useInView } from "framer-motion";
import { Maximize2, MonitorPlay, Loader2 } from "lucide-react";
import type { TemplateFormData } from "../../data/templates";
import { Dialog, DialogContent, DialogTrigger } from "./dialog";

interface TemplateCardProps extends HTMLMotionProps<"div"> {
  template: TemplateFormData;
  index: number;
}

export const TemplateCard = memo(function TemplateCard({ template, index, ...motionProps }: TemplateCardProps) {
  const [iframeLoaded, setIframeLoaded] = useState(false);
  
  // Ref for intersection observer to mount/unmount iframe
  const cardRef = useRef<HTMLDivElement>(null);
  // Only trigger when card is actually visible on screen. Unmounts when off-screen.
  const isCardInView = useInView(cardRef, { margin: "0px", amount: 0.1 }); 

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "200px" }}
      transition={{ duration: 0.5, delay: (index % 10) * 0.05 }}
      className={`break-inside-avoid mb-6 ${template.aspect}`}
      style={{ contentVisibility: "auto" }}
      {...motionProps}
    >
      <Dialog onOpenChange={(open) => !open && setIframeLoaded(false)}>
        <DialogTrigger asChild>
          <div 
            ref={cardRef}
            className="group relative overflow-hidden rounded-3xl border border-border cursor-pointer block w-full h-full shadow-sm hover:shadow-xl transition-shadow duration-500 bg-muted/30"
          >
            {/* Immersive Image Background or Iframe Fallback */}
            {template.image ? (
              <img
                src={template.image}
                alt={template.name}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            ) : template.demoUrl ? (
              <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105 pointer-events-none opacity-90 overflow-hidden bg-background flex items-center justify-center">
                
                {/* Render iframe ONLY when the card is in view to save CPU/RAM. Unmounts automatically when off-screen. */}
                {isCardInView ? (
                  <IframePreview 
                    demoUrl={template.demoUrl} 
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center gap-3 text-muted-foreground opacity-50 z-10">
                    <MonitorPlay size={32} />
                    <span className="font-jakarta text-xs uppercase tracking-wider">Pratinjau Dihentikan</span>
                  </div>
                )}
              </div>
            ) : (
              <div className="absolute inset-0 bg-muted transition-transform duration-700 ease-out group-hover:scale-105" />
            )}

            {/* Refined Gradient Overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500 z-20 pointer-events-none" />

            <div className="absolute inset-0 p-8 flex flex-col justify-end z-30 pointer-events-none">
              <p className="text-white/80 font-jakarta-medium text-xs mb-3 uppercase tracking-[0.2em]">
                {template.category}
              </p>
              <div className="flex items-center justify-between">
                <h3 className="font-space-bold text-3xl text-white tracking-tight">
                  {template.name}
                </h3>
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 ease-out shadow-2xl">
                  <Maximize2 size={20} />
                </div>
              </div>
            </div>
          </div>
        </DialogTrigger>
        <DialogContent className="max-w-[95vw] w-full h-[90vh] p-2 sm:p-4 overflow-hidden border-border bg-background rounded-2xl">
          {template.demoUrl ? (
            <div className="w-full h-full rounded-xl overflow-hidden relative bg-muted flex items-center justify-center">
              {!iframeLoaded && (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 bg-muted/50 backdrop-blur-sm">
                   <Loader2 className="animate-spin text-primary w-8 h-8" />
                   <span className="font-jakarta text-sm text-muted-foreground animate-pulse">Memuat Preview Penuh...</span>
                </div>
              )}
              <iframe
                src={template.demoUrl}
                onLoad={() => setIframeLoaded(true)}
                loading="lazy"
                className={`w-full h-full border-none absolute inset-0 transition-opacity duration-700 ${iframeLoaded ? 'opacity-100 z-20' : 'opacity-0 z-0'}`}
                title={`Preview of ${template.name}`}
                sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
              />
            </div>
          ) : (
            <div className="flex items-center justify-center w-full h-full text-muted-foreground font-jakarta text-lg">
              Pratinjau tidak tersedia
            </div>
          )}
        </DialogContent>
      </Dialog>
    </motion.div>
  );
});

// Extracted component to handle individual iframe loading state and timeout
const IframePreview = memo(({ demoUrl }: { demoUrl: string }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Fallback: If iframe doesn't load within 5 seconds, force show it anyway.
    // This handles cases where adblockers or mixed-content block the load event but the iframe might still have some content (or an error) to display.
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, [demoUrl]);

  return (
    <>
      {!loaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-muted/20 z-10">
          <Loader2 className="animate-spin text-primary" size={24} />
          <span className="font-jakarta text-xs uppercase tracking-wider text-muted-foreground">Memuat Tampilan...</span>
        </div>
      )}
      <iframe 
        src={demoUrl} 
        onLoad={() => setLoaded(true)}
        className={`w-[400%] h-[400%] origin-top-left scale-[0.25] border-none transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`} 
        tabIndex={-1} 
        aria-hidden="true" 
        sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-presentation"
      />
    </>
  );
});
