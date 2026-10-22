"use client";

import React, { useEffect, useState } from "react";

interface ObfuscatedEmailProps {
  user?: string;
  domain?: string;
  className?: string;
  showArrow?: boolean;
  icon?: React.ReactNode;
  label?: string;
  children?: React.ReactNode;
}

export default function ObfuscatedEmail({
  user = "contact",
  domain = "digitalghuru.com",
  className = "",
  showArrow = false,
  icon,
  label,
  children,
}: ObfuscatedEmailProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // During SSR (and before hydration), render a spam-proof representation
  // that completely avoids '@' and raw email addresses in the page source HTML
  if (!isMounted) {
    return (
      <span className={className}>
        {icon && <span className="inline-flex shrink-0 mr-1.5">{icon}</span>}
        {label ? (
          label
        ) : children ? (
          children
        ) : (
          <span>
            {user} [at] {domain.replace(/\./g, " [dot] ")}
          </span>
        )}
        {showArrow && <span className="ml-1">→</span>}
      </span>
    );
  }

  const email = `${user}@${domain}`;

  return (
    <a href={`mailto:${email}`} className={className}>
      {icon && <span className="inline-flex shrink-0 mr-1.5">{icon}</span>}
      {label ? label : children ? children : email}
      {showArrow && (
        <span className="group-hover:translate-x-1 transition-transform ml-1">
          →
        </span>
      )}
    </a>
  );
}
