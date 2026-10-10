"use client";

import React, { useEffect, useState } from "react";

interface ObfuscatedEmailProps {
  user?: string;
  domain?: string;
  className?: string;
  children?: React.ReactNode;
}

export default function ObfuscatedEmail({
  user = "contact",
  domain = "digitalghuru.in",
  className = "",
  children,
}: ObfuscatedEmailProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    // Render as plain text spans to avoid mailto: scraping in raw HTML
    return (
      <span className={className}>
        {children || (
          <>
            {user}<span>@</span>{domain}
          </>
        )}
      </span>
    );
  }

  const email = `${user}@${domain}`;
  
  return (
    <a href={`mailto:${email}`} className={className}>
      {children || email}
    </a>
  );
}
