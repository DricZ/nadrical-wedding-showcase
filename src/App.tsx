import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { LandingPage } from "./pages/LandingPage";
import { ThemeShowcase } from "./pages/ThemeShowcase";

import { SettingsProvider } from "./contexts/SettingsContext";

function App() {
  return (
    <SettingsProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/themes" element={<ThemeShowcase />} />
        </Routes>
      </Layout>
    </SettingsProvider>
  );
}

export default App;
