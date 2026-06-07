import { Helmet } from "react-helmet-async";
import { useSettings } from "../contexts/SettingsContext";

interface SEOProps {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
  schema?: Record<string, unknown>;
}

export function SEO({ title, description, url, image, schema }: SEOProps) {
  const { settings } = useSettings();
  const appName = settings?.app_name || "Nadrical";
  
  const siteUrl = "https://wedding.nadrical.my.id";
  const fullUrl = url ? `${siteUrl}${url}` : siteUrl;
  const imageUrl = image ? `${siteUrl}${image}` : `${siteUrl}/logo.png`;
  
  const defaultTitle = `${appName} | Wedding Showcase`;
  const finalTitle = title ? `${title} | ${appName}` : defaultTitle;
  
  const defaultDesc = `Jelajahi berbagai pilihan desain tema premium untuk menyempurnakan cerita pernikahan Anda bersama ${appName}.`;
  const finalDesc = description || defaultDesc;

  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{finalTitle}</title>
      <meta name="description" content={finalDesc} />
      
      {/* Canonical */}
      <link rel="canonical" href={fullUrl} />
      
      {/* OpenGraph tags */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDesc} />
      <meta property="og:image" content={imageUrl} />
      
      {/* Twitter tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDesc} />
      <meta name="twitter:image" content={imageUrl} />
      
      {/* Schema.org JSON-LD */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
}
