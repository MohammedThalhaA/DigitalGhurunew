"use client";

import { useEffect, useRef } from "react";

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<any>(null);

  useEffect(() => {
    let isMounted = true;
    let cleanup: (() => void) | undefined;

    Promise.all([
      import("@studio-freight/lenis"),
      import("gsap"),
      import("gsap/ScrollTrigger"),
    ]).then(([lenisMod, gsapMod, scrollTriggerMod]) => {
      if (!isMounted) return;

      const Lenis = lenisMod.default;
      const gsap = gsapMod.gsap || gsapMod.default;
      const ScrollTrigger = scrollTriggerMod.ScrollTrigger;

      if (gsap && ScrollTrigger) {
        gsap.registerPlugin(ScrollTrigger);
      }

      const lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });

      lenisRef.current = lenis;
      (window as any).lenis = lenis;

      if (ScrollTrigger) {
        lenis.on("scroll", ScrollTrigger.update);
      }

      const rafCallback = (time: number) => {
        lenis.raf(time * 1000);
      };

      if (gsap) {
        gsap.ticker.add(rafCallback);
        gsap.ticker.lagSmoothing(0);
      }

      cleanup = () => {
        lenis.destroy();
        if (gsap) gsap.ticker.remove(rafCallback);
        if (ScrollTrigger) {
          ScrollTrigger.getAll().forEach((trigger: any) => trigger.kill());
        }
      };
    }).catch((err) => {
      console.warn("Smooth scroll initialization skipped:", err);
    });

    return () => {
      isMounted = false;
      cleanup?.();
    };
  }, []);

  return <>{children}</>;
}
