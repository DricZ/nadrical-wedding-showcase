import { SEO } from "../components/SEO";
import { HeroSection } from "../components/sections/HeroSection";
import { FeatureHighlight } from "../components/sections/FeatureHighlight";
// import { TemplateGallery } from "../components/sections/TemplateGallery";
import { Pricing } from "../components/sections/Pricing";
import { HowTo } from "@/components/sections/HowTo";
// import { useSettings } from "../contexts/SettingsContext";

export const LandingPage = () => {
  // const { settings } = useSettings();
  // const appName = settings?.app_name || "Nadrical";

  return (
    <>
      <SEO
        title="Collect more photos from your wedding guest"
        description={`Simple QR code scanning and Let your guests share their candid shots and heartfelt wishes effortlessly in real-time.`}
        url="/"
      />
      <HeroSection />
      <HowTo />
      <FeatureHighlight />
      {/* <TemplateGallery /> */}
      <Pricing />
    </>
  );
};
