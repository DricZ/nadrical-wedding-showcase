import { SEO } from "../components/SEO";
import { HeroSection } from "../components/sections/HeroSection";
import { FeatureHighlight } from "../components/sections/FeatureHighlight";
import { Pricing } from "../components/sections/Pricing";
import { HowTo } from "@/components/sections/HowTo";

export const LandingPage = () => {
  const showcaseSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://wedding.nadrical.my.id/#website",
        "url": "https://wedding.nadrical.my.id/",
        "name": "Nadrical Wedding Showcase",
        "description": "Live Wedding Photo Sharing & Digital Guest Gallery Platform",
        "publisher": {
          "@type": "Organization",
          "name": "Nadrical",
          "url": "https://nadrical.my.id",
          "logo": "https://wedding.nadrical.my.id/logo.png"
        }
      },
      {
        "@type": "SoftwareApplication",
        "@id": "https://wedding.nadrical.my.id/#app",
        "name": "Nadrical Wedding Live Gallery",
        "operatingSystem": "All (Web Browser, iOS, Android)",
        "applicationCategory": "PhotoSharingApplication",
        "description": "Collect candid photos, videos, and heartfelt congratulations from wedding guests in real-time via instant QR code scanning.",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "IDR"
        }
      },
      {
        "@type": "FAQPage",
        "@id": "https://wedding.nadrical.my.id/#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Bagaimana cara tamu mengunggah foto ke galeri pernikahan?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Tamu cukup memindai (scan) QR Code yang tersedia di meja resepsi atau undangan. Tanpa perlu menginstal aplikasi, tamu langsung masuk ke halaman upload web untuk mengambil foto/video dan memberikan ucapan."
            }
          },
          {
            "@type": "Question",
            "name": "Apakah foto yang diunggah tamu tersimpan dalam resolusi asli?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Ya, seluruh foto dan video kenangan disimpan dengan aman dalam kualitas tinggi sehingga kedua mempelai dapat mengunduh seluruh dokumentasi asli setelah pesta usai."
            }
          },
          {
            "@type": "Question",
            "name": "Apakah tamu perlu login atau membuat akun terlebih dahulu?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Tidak perlu. Tamu hanya cukup memasukkan nama mereka dan langsung dapat membagikan momen bahagia secara instan."
            }
          }
        ]
      }
    ]
  };

  return (
    <>
      <SEO
        title="Collect More Photos & Wishes From Your Wedding Guests"
        description="Platform galeri pernikahan live & pengumpulan momen tamu via scan QR code instan. Abadikan momen candid, bagikan ucapan penuh cinta, dan nikmati live gallery di hari bahagia Anda bersama Nadrical."
        url="/"
        schema={showcaseSchema}
      />
      <HeroSection />
      <HowTo />
      <FeatureHighlight />
      <Pricing />
    </>
  );
};
