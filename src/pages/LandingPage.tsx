import { HeroSection } from "../components/sections/HeroSection";
import { FeatureHighlight } from "../components/sections/FeatureHighlight";
import { TemplateGallery } from "../components/sections/TemplateGallery";
import { Pricing } from "../components/sections/Pricing";

export const LandingPage = () => {
  return (
    <>
      <HeroSection />
      <FeatureHighlight />
      <TemplateGallery />
      <Pricing />
    </>
  );
};
