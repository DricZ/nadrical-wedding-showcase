import { useState, useMemo, useEffect, useCallback, useRef, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, Loader2 } from "lucide-react";
import { TemplateCard } from "../components/ui/TemplateCard";
import { templates as staticTemplates, templateCategories, type TemplateFormData } from "../data/templates";
import {
  fetchWeddingTemplates,
  type WeddingCategoryApi,
  type PaginationMeta,
} from "../services/api";

import { Helmet } from "react-helmet-async";
import { useSettings } from "../contexts/SettingsContext";

const aspectRatios = [
  "aspect-[3/4]",
  "aspect-[4/3]",
  "aspect-[4/5]",
  "aspect-[5/4]",
  "aspect-square",
  "aspect-[3/5]",
];

export const ThemeShowcase = () => {
  const { settings } = useSettings();
  const appName = settings?.app_name || "Nadrical";

  // Category state
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [activeCategorySlug, setActiveCategorySlug] = useState<string | undefined>(undefined);
  const [apiCategories, setApiCategories] = useState<WeddingCategoryApi[]>([]);

  // Template / pagination state
  const [templates, setTemplates] = useState<TemplateFormData[]>([]);
  const [meta, setMeta] = useState<PaginationMeta | null>(null);
  const [page, setPage] = useState(1);

  // Loading states
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [useFallback, setUseFallback] = useState(false);

  // Ref for infinite scroll sentinel
  const sentinelRef = useRef<HTMLDivElement>(null);

  const hasMore = meta ? page < meta.last_page : false;

  const loadTemplates = useCallback(
    async (pageNum: number, categorySlug?: string, reset: boolean = false) => {
      if (reset) {
        setIsInitialLoading(true);
      } else {
        setIsLoadingMore(true);
      }

      try {
        const res = await fetchWeddingTemplates(pageNum, categorySlug);

        if (res.categories.length > 0) {
          setApiCategories(res.categories);
        }

        const mapped: TemplateFormData[] = res.data.map((t, i) => ({
          id: String(t.id),
          name: t.name,
          category: t.category || "Others",
          image: t.image || "",
          aspect: aspectRatios[(reset ? i : templates.length + i) % aspectRatios.length],
          demoUrl: t.demo_url || undefined,
        }));

        setTemplates((prev) => (reset ? mapped : [...prev, ...mapped]));
        setMeta(res.meta);
        setPage(pageNum);
        setError(null);
        setUseFallback(false);
      } catch (err) {
        console.error("Failed to load templates:", err);
        if (reset) {
          setError("Gagal memuat data dari server. Menampilkan data offline.");
          setUseFallback(true);
        }
      } finally {
        setIsInitialLoading(false);
        setIsLoadingMore(false);
      }
    },
    [templates.length],
  );

  const [isPending, startTransition] = useTransition();

  // Initial load
  useEffect(() => {
    loadTemplates(1, undefined, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Category change → reset
  const handleCategoryChange = useCallback(
    (name: string, slug?: string) => {
      setActiveCategory(name);
      setActiveCategorySlug(slug);
      
      startTransition(() => {
        setTemplates([]);
        setMeta(null);
        setPage(1);
      });
      loadTemplates(1, slug, true);
    },
    [loadTemplates],
  );

  // Infinite scroll observer
  useEffect(() => {
    if (useFallback || !sentinelRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoadingMore && !isInitialLoading) {
          loadTemplates(page + 1, activeCategorySlug);
        }
      },
      { rootMargin: "200px" },
    );

    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [hasMore, isLoadingMore, isInitialLoading, page, activeCategorySlug, loadTemplates, useFallback]);

  // Categories list for filter bar
  const categories = useMemo(() => {
    if (apiCategories.length > 0) {
      return [
        { name: "Semua", slug: undefined },
        ...apiCategories.map((c) => ({ name: c.name, slug: c.slug })),
      ];
    }
    return templateCategories.map((name) => ({ name, slug: undefined }));
  }, [apiCategories]);

  // Fallback: filter static data by category
  const displayTemplates = useMemo(() => {
    if (useFallback) {
      if (activeCategory === "Semua") return staticTemplates;
      return staticTemplates.filter((t) => t.category === activeCategory);
    }
    return templates;
  }, [useFallback, activeCategory, templates]);

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

          {/* Error banner */}
          {error && (
            <div className="px-4 py-3 mb-8 text-sm text-yellow-800 bg-yellow-100 border border-yellow-200 rounded-xl font-jakarta">
              {error}
            </div>
          )}

          {/* Filters */}
          <div className="pb-4 mb-12 overflow-x-auto border-b border-border/50 hide-scrollbar">
            <div className="flex items-center gap-6 min-w-max">
              <span className="flex items-center gap-2 mr-2 text-sm text-muted-foreground font-jakarta-medium">
                <Filter size={16} /> Filter:
              </span>
              {categories.map((cat) => (
                <button
                  key={cat.name}
                  onClick={() => handleCategoryChange(cat.name, cat.slug)}
                  className={`text-sm font-jakarta-medium transition-all duration-300 relative pb-1 ${
                    activeCategory === cat.name
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {cat.name}
                  {activeCategory === cat.name && (
                    <motion.div
                      layoutId="activeFilter"
                      className="absolute left-0 right-0 h-0.5 bg-primary -bottom-4.25"
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Initial Loading State */}
          {isInitialLoading && (
            <div className="flex items-center justify-center py-24">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          )}

          {/* Masonry Gallery Grid */}
          {!isInitialLoading && (
            <>
              <motion.div
                layout
                className={`gap-6 columns-1 sm:columns-2 lg:columns-3 transition-opacity duration-300 ${isPending ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}
              >
                <AnimatePresence mode="popLayout">
                  {displayTemplates.length > 0 ? (
                    displayTemplates.map((template, index) => (
                      <TemplateCard 
                        key={template.id}
                        template={template} 
                        index={index}
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.4 }}
                      />
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

              {/* Infinite scroll sentinel */}
              {!useFallback && (
                <div ref={sentinelRef} className="flex items-center justify-center py-12">
                  {isLoadingMore && (
                    <Loader2 className="w-6 h-6 animate-spin text-primary" />
                  )}
                  {!hasMore && displayTemplates.length > 0 && (
                    <p className="text-sm text-muted-foreground font-jakarta">
                      Semua tema telah ditampilkan.
                    </p>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};
