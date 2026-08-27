import React from "react";
import { MapPin, Phone } from "lucide-react";

interface LocationCardProps {
  name: string;
  address: string;
  phone: string;
  imageUrl?: string;
}

export default function LocationCard({
  name,
  address,
  phone,
  imageUrl,
}: LocationCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-ink-100 shadow-card overflow-hidden hover:shadow-card-hover transition-shadow duration-200">
      {/* Optional Campus Image */}
      {imageUrl && (
        <div className="aspect-video overflow-hidden">
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}

      <div className="p-6 space-y-3">
        <h4 className="font-display text-lg font-bold text-ink-900">{name}</h4>

        <div className="flex items-start gap-2.5 text-ink-500 text-sm">
          <MapPin className="h-4 w-4 shrink-0 mt-0.5 text-brand-blue" />
          <span>{address}</span>
        </div>

        <a
          href={`tel:${phone.replace(/\s/g, "")}`}
          className="flex items-center gap-2.5 text-sm text-ink-500 hover:text-brand-blue transition-colors duration-200"
        >
          <Phone className="h-4 w-4 shrink-0 text-brand-blue" />
          <span>{phone}</span>
        </a>
      </div>
    </div>
  );
}
