"use client";

import { useEffect } from "react";

export default function PrintInvoice() {
  useEffect(() => {
    // Only trigger print if it hasn't been triggered yet this session (to avoid infinite loops on re-renders)
    const timer = setTimeout(() => {
      window.print();
    }, 1000); // Small delay to ensure images load
    
    return () => clearTimeout(timer);
  }, []);

  return null; // This component doesn't render anything itself
}
