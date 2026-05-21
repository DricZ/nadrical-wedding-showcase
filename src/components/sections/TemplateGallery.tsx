import { MainButton } from "../ui/MainButton";
import { Loader2 } from "lucide-react";
import { TemplateCard } from "../ui/TemplateCard";
import { useTemplateGallery } from "../../hooks/useTemplateGallery";

export const TemplateGallery = () => {
  const { templates: displayTemplates, isLoading, error } = useTemplateGallery(6);

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

        {/* Error banner if using fallback */}
        {error && (
          <div className="px-4 py-3 mb-8 text-sm text-yellow-800 bg-yellow-100 border border-yellow-200 rounded-xl font-jakarta text-center max-w-3xl mx-auto">
            {error}
          </div>
        )}

        {/* Loading State */}
        {isLoading ? (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6">
            {displayTemplates.map((template, index) => (
              <TemplateCard key={template.id} template={template} index={index} />
            ))}
          </div>
        )}

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
