import { motion } from "framer-motion";
import { MainButton } from "../ui/MainButton";
import { ArrowRight } from "lucide-react";
import { templates } from "../../data/templates";

export const TemplateGallery = () => {
  const featuredTemplates = templates.slice(0, 5);

  return (
    <section id="gallery" className="py-24 bg-background">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-space-bold text-foreground mb-6">
            Katalog Tema
          </h2>
          <p className="font-jakarta text-lg text-muted-foreground">
            Pilih dari berbagai koleksi tema premium kami yang dapat disesuaikan
            dengan konsep pernikahan Anda.
          </p>
        </div>

        {/* Pinterest Masonry layout for templates */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6">
          {featuredTemplates.map((template, index) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`break-inside-avoid mb-6 ${template.aspect}`}
            >
              <a
                href={template.demoUrl || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden rounded-3xl border border-border cursor-pointer block w-full h-full"
              >
                {/* Immersive Image Background */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
                  style={{ backgroundImage: `url(${template.image})` }}
                />

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
                      <ArrowRight size={20} />
                    </div>
                  </div>
                </div>
              </a>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <MainButton
            text="Lihat Semua Tema"
            variant="outline"
            className="px-8"
            to="/themes"
          />
        </div>
      </div>
    </section>
  );
};
