"use client";

import { useEffect, useRef, useCallback } from "react";
import { useSession, signIn } from "next-auth/react";
import { usePathname } from "next/navigation";
import Script from "next/script";

declare global {
  interface Window {
    google?: any;
    _googleOneTapInitialized?: boolean;
  }
}

const FALLBACK_CLIENT_ID =
  "520891313576-k0o8k52lliongf8efq6ba30554g1reif.apps.googleusercontent.com";

export default function GoogleOneTap() {
  const { status } = useSession();
  const pathname = usePathname();
  const initializedRef = useRef(false);

  const clientId =
    process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || FALLBACK_CLIENT_ID;

  const initOneTap = useCallback(() => {
    // Only show to unauthenticated users outside /admin and /student portals
    if (status === "authenticated" || status === "loading") return;
    if (!pathname) return;
    if (pathname.startsWith("/admin") || pathname.startsWith("/student")) return;
    if (typeof window === "undefined" || !window.google?.accounts?.id) return;
    if (initializedRef.current) return;

    try {
      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: async (response: { credential?: string }) => {
          if (!response?.credential) return;
          try {
            const res = await signIn("google-one-tap", {
              credential: response.credential,
              redirect: false,
            });

            if (res?.ok) {
              // Successfully signed in! Directly open student dashboard
              window.location.href = "/student/dashboard";
            } else if (res?.error) {
              console.warn("Google One Tap sign in notice:", res.error);
            }
          } catch (err) {
            console.error("Google One Tap sign in error:", err);
          }
        },
        auto_select: true, // Seamless automatic sign-in for returning users
        cancel_on_tap_outside: false,
        itp_support: true,
        context: "signin",
      });

      window.google.accounts.id.prompt((notification: any) => {
        if (notification.isNotDisplayed()) {
          console.debug(
            "Google One Tap not displayed:",
            notification.getNotDisplayedReason?.()
          );
        } else if (notification.isSkippedMoment()) {
          console.debug(
            "Google One Tap skipped:",
            notification.getSkippedReason?.()
          );
        } else if (notification.isDismissedMoment()) {
          console.debug(
            "Google One Tap dismissed:",
            notification.getDismissedReason?.()
          );
        }
      });

      initializedRef.current = true;
    } catch (err) {
      console.error("Error initializing Google One Tap:", err);
    }
  }, [clientId, pathname, status]);

  useEffect(() => {
    if (status === "authenticated") {
      // If user is already logged in, cancel any active One Tap prompt
      try {
        window.google?.accounts?.id?.cancel();
      } catch {}
      return;
    }

    if (window.google?.accounts?.id) {
      initOneTap();
    }
  }, [status, pathname, initOneTap]);

  // Don't render script or prompt on admin or student portal
  if (pathname?.startsWith("/admin") || pathname?.startsWith("/student")) {
    return null;
  }

  // If already authenticated, do not show
  if (status === "authenticated") {
    return null;
  }

  return (
    <>
      <Script
        src="https://accounts.google.com/gsi/client"
        strategy="afterInteractive"
        onLoad={initOneTap}
      />
    </>
  );
}
