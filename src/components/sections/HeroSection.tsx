import { motion } from "framer-motion";
import { MainButton } from "../ui/MainButton";
import { ArrowRight, Heart } from "lucide-react";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 overflow-hidden bg-background">
      {/* Background Decorations */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-secondary/20 rounded-full blur-3xl pointer-events-none" />

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

        {/* Hero Image / Mockup Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
          className="mt-16 w-full max-w-5xl relative aspect-[16/9] md:aspect-[21/9] rounded-2xl md:rounded-[2rem] overflow-hidden border border-border/50 shadow-2xl"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-card to-background z-10 opacity-80 mix-blend-overlay" />
          {/* Abstract pattern as placeholder for a real mockup */}
          <div className="absolute inset-0 flex items-center justify-center bg-card">
            <div className="grid grid-cols-3 gap-4 w-full h-full p-8 opacity-20 transform -rotate-6 scale-110">
              <div className="bg-primary/20 rounded-xl w-full h-full"></div>
              <div className="bg-muted rounded-xl w-full h-full"></div>
              <div className="bg-primary/10 rounded-xl w-full h-full"></div>
              <div className="bg-secondary rounded-xl w-full h-full"></div>
              <div className="bg-primary/30 rounded-xl w-full h-full"></div>
            </div>
            <p className="absolute z-20 font-space-bold text-2xl text-muted-foreground">
              App Mockup Showcase
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
