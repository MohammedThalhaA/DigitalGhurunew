import type { Metadata } from "next";
import AuthCard from "@/components/auth/AuthCard";

export const metadata: Metadata = {
  title: "Create Student Account",
  description:
    "Register for a Digital Ghuru student account to enroll in premier digital marketing and AI training programs.",
};

export default function SignUpPage() {
  return <AuthCard initialMode="signup" />;
}
