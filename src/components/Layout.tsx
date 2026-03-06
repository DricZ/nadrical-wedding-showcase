import type { ReactNode } from "react";
import { Helmet } from "react-helmet-async";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { SmoothScroll } from "./SmoothScroll";
import { useSettings } from "../contexts/SettingsContext";

export const Layout = ({ children }: { children: ReactNode }) => {
  const { settings } = useSettings();
  const appName = settings?.app_name || "Nadrical.wedding";
  const defaultDesc =
    settings?.default_description ||
    "Undangan pernikahan digital premium dengan desain elegan, fitur lengkap, dan pengalaman yang tak terlupakan untuk momen spesial Anda.";

  // Favicon logic - use specific favicon if exists, fallback to app_logo, then default favicon.ico
  const favicon = settings?.favicon || settings?.app_logo || "/favicon.ico";
  const themeColor = settings?.theme_color || "#c5a47e"; // Fallback to a primary-ish color
  const companyWebsite = settings?.company_website || "https://nadrical.my.id";

  return (
    <SmoothScroll>
      <Helmet>
        <title>{appName}</title>
        <meta name="description" content={defaultDesc} />
        <meta name="theme-color" content={themeColor} />
        <meta name="author" content={appName} />
        <link rel="icon" href={favicon} />
        <link rel="apple-touch-icon" href={favicon} />
        <link rel="canonical" href={companyWebsite} />

        {/* OpenGraph */}
        <meta property="og:title" content={appName} />
        <meta property="og:description" content={defaultDesc} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={companyWebsite} />
        <meta property="og:image" content={favicon} />
        <meta property="og:site_name" content={appName} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={appName} />
        <meta name="twitter:description" content={defaultDesc} />
        <meta name="twitter:image" content={favicon} />
      </Helmet>
      <div className="flex flex-col min-h-screen font-jakarta bg-background text-foreground selection:bg-primary/20 selection:text-primary">
        <Navbar />
        <main className="flex-1 overflow-x-clip">{children}</main>
        <Footer />
      </div>
    </SmoothScroll>
  );
};
