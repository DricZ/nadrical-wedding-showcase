import { useState, useEffect, useCallback } from "react";
import { fetchWeddingTemplates } from "../services/api";
import { templates as staticTemplates, type TemplateFormData } from "../data/templates";

const aspectRatios = [
  "aspect-[3/4]",
  "aspect-[4/3]",
  "aspect-[4/5]",
  "aspect-[5/4]",
  "aspect-square",
  "aspect-[3/5]",
];

export function useTemplateGallery(limit: number = 6) {
  const [templates, setTemplates] = useState<TemplateFormData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [useFallback, setUseFallback] = useState(false);

  const loadTemplates = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetchWeddingTemplates(1, undefined, limit);

      const mapped: TemplateFormData[] = res.data.map((t, i) => ({
        id: String(t.id),
        name: t.name,
        category: t.category || "Others",
        image: t.image || "",
        aspect: aspectRatios[i % aspectRatios.length],
        demoUrl: t.demo_url || undefined,
      }));

      setTemplates(mapped);
      setUseFallback(false);
    } catch (err) {
      console.error("Failed to load templates for gallery:", err);
      setError("Gagal memuat data dari server. Menampilkan katalog bawaan.");
      setUseFallback(true);
      // Fallback to static templates
      setTemplates(staticTemplates.slice(0, limit));
    } finally {
      setIsLoading(false);
    }
  }, [limit]);

  useEffect(() => {
    loadTemplates();
  }, [loadTemplates]);

  return { templates, isLoading, error, useFallback, retry: loadTemplates };
}
