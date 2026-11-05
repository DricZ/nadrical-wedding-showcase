import { motion } from "framer-motion";
import { MainButton } from "../ui/MainButton";
import { ArrowRight, Heart } from "lucide-react";

export const HeroSection = () => {
  return (
    <section className="relative flex items-center justify-center min-h-screen pt-24 overflow-hidden bg-background">
      {/* Background Decorations */}
      <div className="absolute rounded-full pointer-events-none top-1/4 left-1/4 w-96 h-96 bg-primary/5 blur-3xl" />
      <div className="absolute rounded-full pointer-events-none bottom-1/4 right-1/4 w-120 h-120 bg-secondary/20 blur-3xl" />

      <div className="container relative z-10 flex flex-col items-center px-6 mx-auto text-center md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-4 py-2 mb-8 text-sm border rounded-full bg-secondary text-secondary-foreground font-jakarta-medium border-border/50"
        >
          <Heart size={16} className="text-primary" />
          <span>Your life wedding album</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
          className="text-5xl md:text-7xl font-space-bold tracking-tight text-foreground max-w-4xl leading-[1.1]"
        >
          Collect More Photos from Your{" "}
          <span className="font-serif italic text-primary">Wedding Guest</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="max-w-2xl mt-6 text-lg leading-relaxed md:text-xl text-muted-foreground font-jakarta"
        >
          Simple QR code scanning lets your guests share candid moments and
          heartfelt wishes in real-time
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
          className="flex flex-col items-center gap-4 mt-10 sm:flex-row"
        >
          <MainButton
            text="Get Started"
            icon={<ArrowRight size={18} />}
            variant="primary"
            href="/#pricing"
          />
          <MainButton
            text="See How It Works"
            variant="outline"
            to="/#howto"
          />
        </motion.div>

        {/* Hero Image / Mockup Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
          className="relative w-full max-w-5xl mt-16 overflow-hidden border shadow-2xl aspect-video md:aspect-21/9 rounded-2xl md:rounded-4xl border-border/50 group"
        >
          <picture>
            <source srcSet="/images/hero-showcase.webp" type="image/webp" />
            <img
              src="/images/hero-showcase.jpg"
              alt="Nadrical Wedding Live Guest Photo Album and QR Code Showcase"
              className="object-cover w-full h-full transition-transform duration-700 ease-out group-hover:scale-105"
              loading="eager"
            />
          </picture>

          {/* Subtle overlay gradient and glass rim highlight */}
          <div className="absolute inset-0 pointer-events-none bg-linear-to-t from-background/40 via-transparent to-black/10" />
          <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-white/10 rounded-2xl md:rounded-4xl" />
        </motion.div>
      </div>
    </section>
  );
};
