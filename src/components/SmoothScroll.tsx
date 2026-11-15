import { useEffect } from "react";
import Lenis from "lenis";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

export const SmoothScroll = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    // Initialize Lenis with smooth easing
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    window.__lenis = lenis;

    let rafId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };

    rafId = requestAnimationFrame(raf);

    // Global interceptor for smooth scrolling to anchor targets (e.g. /#features, /#pricing)
    const handleAnchorClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      const hashIndex = href.indexOf("#");
      if (hashIndex === -1) return;

      const pathPart = href.substring(0, hashIndex);
      const hashPart = href.substring(hashIndex); // e.g. "#pricing"

      // Check if hash belongs to the current page
      if (
        pathPart === "" ||
        pathPart === "/" ||
        pathPart === window.location.pathname ||
        pathPart === window.location.origin ||
        pathPart === `${window.location.origin}/`
      ) {
        if (hashPart === "#" || hashPart === "") {
          e.preventDefault();
          lenis.scrollTo(0, { duration: 1.2 });
          history.pushState(null, "", " ");
          return;
        }

        try {
          const targetEl = document.querySelector(hashPart);
          if (targetEl) {
            e.preventDefault();
            lenis.scrollTo(targetEl as HTMLElement, {
              offset: -80,
              duration: 1.2,
            });
            history.pushState(null, "", hashPart);
          }
        } catch {
          // In case of invalid selector, let browser handle normally
        }
      }
    };

    // Smooth scroll if URL already has a hash on initial load
    if (window.location.hash) {
      setTimeout(() => {
        try {
          const initialTarget = document.querySelector(window.location.hash);
          if (initialTarget) {
            lenis.scrollTo(initialTarget as HTMLElement, {
              offset: -80,
              duration: 1.2,
            });
          }
        } catch {
          // Ignore invalid hash
        }
      }, 350);
    }

    document.addEventListener("click", handleAnchorClick, { capture: true });

    return () => {
      document.removeEventListener("click", handleAnchorClick, { capture: true });
      cancelAnimationFrame(rafId);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);

  return <>{children}</>;
};
