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
  const appName = settings?.app_name || "Nadrical Wedding";
  
  const siteUrl = "https://wedding.nadrical.my.id";
  const fullUrl = url ? `${siteUrl}${url}` : siteUrl;
  const defaultImage = `${siteUrl}/images/og-wedding-showcase.jpg`;
  const imageUrl = image 
    ? (image.startsWith("http") ? image : `${siteUrl}${image.startsWith("/") ? "" : "/"}${image}`)
    : defaultImage;
  
  const defaultTitle = `${appName} — Live Photo Sharing & Digital Wedding Gallery Platform`;
  const finalTitle = title ? `${title} | ${appName}` : defaultTitle;
  
  const defaultDesc = `Platform galeri foto pernikahan live & pengumpulan momen tamu via scan QR code instan. Abadikan momen candid dan nikmati live gallery di hari bahagia Anda bersama ${appName}.`;
  const finalDesc = description || defaultDesc;

  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{finalTitle}</title>
      <meta name="description" content={finalDesc} />
      
      {/* Canonical */}
      <link rel="canonical" href={fullUrl} />
      
      {/* OpenGraph tags */}
      <meta property="og:site_name" content="Nadrical Wedding Showcase" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDesc} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:secure_url" content={imageUrl} />
      <meta property="og:image:type" content="image/jpeg" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={finalTitle} />
      
      {/* Twitter tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullUrl} />
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
