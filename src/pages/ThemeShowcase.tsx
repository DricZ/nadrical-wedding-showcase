import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Filter } from "lucide-react";

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
  {
    id: 6,
    name: "Pure White",
    category: "Minimalist",
    image:
      "https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=800&auto=format&fit=crop",
    aspect: "aspect-[4/3]",
  },
  {
    id: 7,
    name: "Royal Magenta",
    category: "Luxury",
    image:
      "https://images.unsplash.com/photo-1478146896981-b80fe463b330?q=80&w=800&auto=format&fit=crop",
    aspect: "aspect-[3/4]",
  },
  {
    id: 8,
    name: "Terracotta Love",
    category: "Bohemian",
    image:
      "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=800&auto=format&fit=crop",
    aspect: "aspect-square",
  },
  {
    id: 9,
    name: "Urban Tech",
    category: "Modern",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800&auto=format&fit=crop",
    aspect: "aspect-[4/5]",
  },
];

import { Helmet } from "react-helmet-async";
import { useSettings } from "../contexts/SettingsContext";

export const ThemeShowcase = () => {
  const [activeCategory, setActiveCategory] = useState("Semua");
  const { settings } = useSettings();
  const appName = settings?.app_name || "Nadrical";

  const categories = [
    "Semua",
    "Modern",
    "Classic",
    "Minimalist",
    "Luxury",
    "Bohemian",
  ];

  const filteredTemplates = useMemo(() => {
    if (activeCategory === "Semua") return templates;
    return templates.filter((t) => t.category === activeCategory);
  }, [activeCategory]);

  return (
    <>
      <Helmet>
        <title>Katalog Tema | {appName}</title>
        <meta
          name="description"
          content={`Jelajahi berbagai pilihan desain tema premium untuk menyempurnakan cerita pernikahan Anda bersama ${appName}.`}
        />
      </Helmet>
      <div className="min-h-screen pt-32 pb-24 bg-background">
        <div className="container px-6 mx-auto md:px-12">
          {/* Header section */}
          <div className="flex flex-col justify-between gap-8 mb-16 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 text-4xl md:text-6xl font-space-bold text-foreground"
              >
                Katalog{" "}
                <span className="font-serif italic text-primary">Tema</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-lg font-jakarta text-muted-foreground"
              >
                Jelajahi berbagai pilihan desain tema premium untuk
                menyempurnakan cerita pernikahan Anda.
              </motion.p>
            </div>
          </div>

          {/* Filters */}
          <div className="pb-4 mb-12 overflow-x-auto border-b border-border/50 hide-scrollbar">
            <div className="flex items-center gap-6 min-w-max">
              <span className="flex items-center gap-2 mr-2 text-sm text-muted-foreground font-jakarta-medium">
                <Filter size={16} /> Filter:
              </span>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`text-sm font-jakarta-medium transition-all duration-300 relative pb-1 ${
                    activeCategory === category
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {category}
                  {activeCategory === category && (
                    <motion.div
                      layoutId="activeFilter"
                      className="absolute left-0 right-0 -bottom-[17px] h-0.5 bg-primary"
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Masonry Gallery Grid */}
          <motion.div
            layout
            className="gap-6 columns-1 sm:columns-2 lg:columns-3"
          >
            <AnimatePresence mode="popLayout">
              {filteredTemplates.length > 0 ? (
                filteredTemplates.map((template) => (
                  <motion.div
                    key={template.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    className={`break-inside-avoid mb-6 ${template.aspect}`}
                  >
                    <Link
                      to={`/themes/${template.id}`}
                      className="relative block w-full h-full overflow-hidden border cursor-pointer group rounded-2xl border-border"
                    >
                      {/* Immersive Background */}
                      <div
                        className="absolute inset-0 transition-transform duration-700 ease-out bg-center bg-cover group-hover:scale-105"
                        style={{ backgroundImage: `url(${template.image})` }}
                      />

                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 transition-opacity duration-500 bg-gradient-to-t from-black/95 via-black/40 to-transparent opacity-70 group-hover:opacity-90" />

                      <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                        <p className="text-white/70 font-jakarta-medium text-xs mb-2 uppercase tracking-[0.2em]">
                          {template.category}
                        </p>
                        <div className="flex items-center justify-between">
                          <h3 className="text-2xl tracking-tight text-white font-space-bold md:text-3xl">
                            {template.name}
                          </h3>
                          <div className="flex items-center justify-center w-10 h-10 text-white transition-all duration-500 ease-out transform translate-y-4 border rounded-full shadow-2xl opacity-0 md:w-12 md:h-12 bg-white/10 backdrop-blur-md border-white/20 group-hover:opacity-100 group-hover:translate-y-0">
                            <ArrowRight size={20} />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))
              ) : (
                <div className="py-24 text-center col-span-full">
                  <p className="font-jakarta text-muted-foreground">
                    Tidak ada tema yang cocok dengan filter saat ini.
                  </p>
                </div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </>
  );
};
