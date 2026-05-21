import { useState } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { Maximize2 } from "lucide-react";
import type { TemplateFormData } from "../../data/templates";
import { Dialog, DialogContent, DialogTrigger } from "./dialog";
import { Skeleton } from "./skeleton";

interface TemplateCardProps extends HTMLMotionProps<"div"> {
  template: TemplateFormData;
  index: number;
}

export function TemplateCard({ template, index, ...motionProps }: TemplateCardProps) {
  const [iframeLoaded, setIframeLoaded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`break-inside-avoid mb-6 ${template.aspect}`}
      {...motionProps}
    >
      <Dialog onOpenChange={(open) => !open && setIframeLoaded(false)}>
        <DialogTrigger asChild>
          <div className="group relative overflow-hidden rounded-3xl border border-border cursor-pointer block w-full h-full shadow-sm hover:shadow-xl transition-shadow duration-500 bg-muted">
            {/* Immersive Image Background or Iframe Fallback */}
            {template.image ? (
              <img
                src={template.image}
                alt={template.name}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            ) : template.demoUrl ? (
              <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105 pointer-events-none opacity-80 overflow-hidden">
                <iframe 
                  src={template.demoUrl} 
                  loading="lazy"
                  className="w-[400%] h-[400%] origin-top-left scale-[0.25] border-none" 
                  tabIndex={-1} 
                  aria-hidden="true" 
                  sandbox="allow-same-origin allow-scripts"
                />
              </div>
            ) : (
              <div className="absolute inset-0 bg-muted transition-transform duration-700 ease-out group-hover:scale-105" />
            )}

            {/* Refined Gradient Overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-black/10 opacity-70 group-hover:opacity-90 transition-opacity duration-500" />

            <div className="absolute inset-0 p-8 flex flex-col justify-end">
              <p className="text-white/70 font-jakarta-medium text-xs mb-3 uppercase tracking-[0.2em]">
                {template.category}
              </p>
              <div className="flex items-center justify-between">
                <h3 className="font-space-bold text-3xl text-white tracking-tight">
                  {template.name}
                </h3>
                <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 ease-out shadow-2xl">
                  <Maximize2 size={20} />
                </div>
              </div>
            </div>
          </div>
        </DialogTrigger>
        <DialogContent className="max-w-[95vw] w-full h-[90vh] p-2 sm:p-4 overflow-hidden border-border bg-background rounded-2xl">
          {template.demoUrl ? (
            <div className="w-full h-full rounded-xl overflow-hidden relative bg-muted">
              {!iframeLoaded && (
                <Skeleton className="w-full h-full absolute inset-0 z-10" />
              )}
              <iframe
                src={template.demoUrl}
                onLoad={() => setIframeLoaded(true)}
                className={`w-full h-full border-none absolute inset-0 transition-opacity duration-500 ${iframeLoaded ? 'opacity-100 z-20' : 'opacity-0 z-0'}`}
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
}
