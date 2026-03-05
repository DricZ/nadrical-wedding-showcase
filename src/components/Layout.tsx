import type { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { SmoothScroll } from "./SmoothScroll";

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <SmoothScroll>
      <div className="flex flex-col min-h-screen font-jakarta bg-background text-foreground selection:bg-primary/20 selection:text-primary">
        <Navbar />
        <main className="flex-1 overflow-x-clip">{children}</main>
        <Footer />
      </div>
    </SmoothScroll>
  );
};
