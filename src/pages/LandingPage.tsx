import { SEO } from "../components/SEO";
import { HeroSection } from "../components/sections/HeroSection";
import { FeatureHighlight } from "../components/sections/FeatureHighlight";
import { TemplateGallery } from "../components/sections/TemplateGallery";
// import { Pricing } from "../components/sections/Pricing";
import { useSettings } from "../contexts/SettingsContext";

export const LandingPage = () => {
  const { settings } = useSettings();
  const appName = settings?.app_name || "Nadrical";

  return (
    <>
      <SEO 
        title="Buat Undangan Digital Premium" 
        description={`Buat undangan pernikahan digital premium dengan ${appName}. Desain elegan, fitur lengkap, dan kemudahan dalam hitungan menit.`} 
        url="/"
      />
      <HeroSection />
      <FeatureHighlight />
      <TemplateGallery />
      {/* <Pricing /> */}
    </>
  );
};
