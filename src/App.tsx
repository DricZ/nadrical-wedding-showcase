import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { SettingsProvider } from "./contexts/SettingsContext";

// Lazy loading pages for code splitting & faster FCP
const LandingPage = lazy(() => import("./pages/LandingPage").then(module => ({ default: module.LandingPage })));
const ThemeShowcase = lazy(() => import("./pages/ThemeShowcase").then(module => ({ default: module.ThemeShowcase })));

function App() {
  return (
    <SettingsProvider>
      <Layout>
        <Suspense fallback={<div className="min-h-screen w-full flex items-center justify-center bg-background text-foreground">Loading...</div>}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/themes" element={<ThemeShowcase />} />
          </Routes>
        </Suspense>
      </Layout>
    </SettingsProvider>
  );
}

export default App;
