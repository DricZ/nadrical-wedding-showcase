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
            "name": "How do guests upload photos to our wedding gallery?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Guests simply scan the QR code placed on reception tables or invitations. Without installing any app, they instantly access the mobile web camera to take photos/videos and share heartfelt wishes."
            }
          },
          {
            "@type": "Question",
            "name": "Are guest photos preserved in full original resolution?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, all photos and videos are securely stored in uncompressed high resolution, allowing the couple to download the complete original archive after the celebration."
            }
          },
          {
            "@type": "Question",
            "name": "Do guests need an account or login to participate?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No app download or account creation is required. Guests simply enter their name and can instantly capture and share happy moments in real time."
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
        description="Real-time wedding photo sharing & digital live guest gallery platform. Capture candid guest moments, heartfelt wishes, and display live slideshows on your special day."
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
