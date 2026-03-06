import { motion } from "framer-motion";
import { MainButton } from "../ui/MainButton";
import { ArrowRight, Heart } from "lucide-react";
import { templates } from "../../data/templates";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 overflow-hidden bg-background">
      {/* Background Decorations */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-120 h-120 bg-secondary/20 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-jakarta-medium mb-8 border border-border/50"
        >
          <Heart size={16} className="text-primary" />
          <span>Rayakan momen spesial Anda dengan elegan</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
          className="text-5xl md:text-7xl font-space-bold tracking-tight text-foreground max-w-4xl leading-[1.1]"
        >
          Buat Undangan Pernikahan{" "}
          <span className="text-primary italic font-serif">
            Digital Premium
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="mt-6 text-lg md:text-xl text-muted-foreground font-jakarta max-w-2xl leading-relaxed"
        >
          Desain eksklusif, fitur lengkap, dan kemudahan dalam hitungan menit.
          Bagikan kebahagiaan Anda kepada dunia dengan cara yang paling
          berkesan.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center gap-4"
        >
          <MainButton
            text="Mulai Sekarang"
            icon={<ArrowRight size={18} />}
            variant="primary"
            to="/#pricing"
          />
          <MainButton text="Lihat Katalog" variant="outline" to="/themes" />
        </motion.div>

        {/* Hero Image / Mockup Showcase from Scraped Data */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
          className="mt-16 w-full max-w-5xl relative aspect-video md:aspect-21/9 rounded-2xl md:rounded-4xl overflow-hidden border border-border/50 shadow-2xl"
        >
          <div className="absolute inset-0 bg-linear-to-tr from-card to-background z-10 opacity-60 mix-blend-overlay" />

          <div className="absolute inset-0 flex items-center justify-center bg-card overflow-hidden">
            <div className="grid grid-cols-3 gap-4 md:gap-6 w-[120%] h-[120%] p-4 opacity-70 transform -rotate-3 scale-110">
              {/* Left Column (Staggered up) */}
              <div className="flex flex-col gap-4 md:gap-6 -translate-y-16">
                {templates.slice(1, 4).map((t) => (
                  <div
                    key={t.id}
                    className="rounded-xl md:rounded-2xl w-full h-48 md:h-72 bg-cover bg-top shadow-lg"
                    style={{ backgroundImage: `url(${t.image})` }}
                  />
                ))}
              </div>

              {/* Center Column (Prominent) */}
              <div className="flex flex-col gap-4 md:gap-6 translate-y-8 z-20">
                {templates.slice(8, 11).map((t) => (
                  <div
                    key={t.id}
                    className="rounded-xl md:rounded-2xl w-full h-56 md:h-80 bg-cover bg-top shadow-2xl border border-border/40"
                    style={{ backgroundImage: `url(${t.image})` }}
                  />
                ))}
              </div>

              {/* Right Column (Staggered up) */}
              <div className="flex flex-col gap-4 md:gap-6 -translate-y-8">
                {templates.slice(15, 18).map((t) => (
                  <div
                    key={t.id}
                    className="rounded-xl md:rounded-2xl w-full h-48 md:h-72 bg-cover bg-top shadow-lg"
                    style={{ backgroundImage: `url(${t.image})` }}
                  />
                ))}
              </div>
            </div>
            {/* Soft overlay gradient to ensure text readability globally if needed, and to blend the bottom */}
            <div className="absolute inset-0 bg-linear-to-t from-background via-background/20 to-transparent pointer-events-none z-30" />

            {/* Optional subtle glow overlay */}
            <div className="absolute inset-0 bg-card/10 backdrop-blur-[1px] pointer-events-none z-20" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};
