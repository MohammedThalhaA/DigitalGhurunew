import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Verify Student Certificate Credential",
  description:
    "Verify and validate official graduation certificates and credentials issued by Digital Ghuru.",
};

export default function VerifyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
