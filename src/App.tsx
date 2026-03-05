import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { LandingPage } from "./pages/LandingPage";
import { ThemeShowcase } from "./pages/ThemeShowcase";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/themes" element={<ThemeShowcase />} />
      </Routes>
    </Layout>
  );
}

export default App;
