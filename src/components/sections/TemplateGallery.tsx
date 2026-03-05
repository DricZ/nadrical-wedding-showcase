import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MainButton } from "../ui/MainButton";
import { ArrowRight } from "lucide-react";

export const TemplateGallery = () => {
  const templates = [
    {
      id: 1,
      name: "Elegance Minimal",
      category: "Modern",
      image:
        "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop",
      aspect: "aspect-[3/4]",
    },
    {
      id: 2,
      name: "Vintage Floral",
      category: "Classic",
      image:
        "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800&auto=format&fit=crop",
      aspect: "aspect-[4/3]",
    },
    {
      id: 3,
      name: "Midnight Gold",
      category: "Luxury",
      image:
        "https://images.unsplash.com/photo-1505932794465-147d1f1b2c97?q=80&w=800&auto=format&fit=crop",
      aspect: "aspect-[4/5]",
    },
    {
      id: 4,
      name: "Rustic Earth",
      category: "Bohemian",
      image:
        "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?q=80&w=800&auto=format&fit=crop",
      aspect: "aspect-square",
    },
    {
      id: 5,
      name: "Ocean Breeze",
      category: "Minimalist",
      image:
        "https://images.unsplash.com/photo-1532712938730-4e36ccdd42f2?q=80&w=800&auto=format&fit=crop",
      aspect: "aspect-[3/5]",
    },
  ];

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
          {templates.map((template, index) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`break-inside-avoid mb-6 ${template.aspect}`}
            >
              <Link
                to={`/themes/${template.id}`}
                className="group relative overflow-hidden rounded-3xl border border-border cursor-pointer block w-full h-full"
              >
                {/* Immersive Image Background */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
                  style={{ backgroundImage: `url(${template.image})` }}
                />

                {/* Refined Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10 opacity-70 group-hover:opacity-90 transition-opacity duration-500" />

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
              </Link>
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
