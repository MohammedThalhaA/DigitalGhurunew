import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us - Campuses in Chennai & Hyderabad",
  description:
    "Get in touch with Digital Ghuru admissions. Visit our branches in Anna Nagar, Chennai and Ameerpet, Hyderabad or book a free demo session today.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
