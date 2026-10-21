import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Life at Digital Ghuru - Culture & Campus Experience",
  description:
    "Take a look inside the Digital Ghuru classroom experience, live agency workshops, masterclasses, and student community events.",
  alternates: {
    canonical: "https://digitalghuru.com/life-at-digitalghuru",
  },
};

export default function LifeAtDigitalGhuruLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
