import React from "react";
import * as Icons from "lucide-react";

interface IconRendererProps {
  name: string;
  className?: string;
}

export default function IconRenderer({ name, className }: IconRendererProps) {
  // @ts-expect-error - Dynamic import based on string name
  const IconComponent = Icons[name];

  if (!IconComponent) {
    // fallback icon
    return <Icons.Star className={className} />;
  }

  return <IconComponent className={className} />;
}
