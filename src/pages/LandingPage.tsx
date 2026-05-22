import { Helmet } from "react-helmet-async";
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
      <Helmet>
        <title>{appName} - Buat Undangan Digital Premium</title>
        <meta
          name="description"
          content={`Buat undangan pernikahan digital premium dengan ${appName}. Desain elegan, fitur lengkap, dan kemudahan dalam hitungan menit.`}
        />
      </Helmet>
      <HeroSection />
      <FeatureHighlight />
      <TemplateGallery />
      {/* <Pricing /> */}
    </>
  );
};
