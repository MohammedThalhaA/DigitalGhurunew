import type { Metadata } from "next";
import AuthCard from "@/components/auth/AuthCard";

export const metadata: Metadata = {
  title: "Sign In to Student Portal",
  description:
    "Sign in to your Digital Ghuru student account to access course modules, live campaigns, assignments, and placement resources.",
};

export default function SignInPage() {
  return <AuthCard initialMode="signin" />;
}
