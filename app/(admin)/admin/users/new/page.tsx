"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, UserPlus, Loader2 } from "lucide-react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { createUser } from "../actions";

export default function CreateUserPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const result = await createUser(formData);

    if (result.success) {
      router.push("/admin/users");
      router.refresh();
    } else {
      setError(result.error || "Something went wrong.");
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full space-y-6 pb-24">
      <Link 
        href="/admin/users" 
        className="inline-flex items-center text-sm font-medium text-ink-500 hover:text-brand-blue transition-colors"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Users
      </Link>

      <div className="bg-white rounded-3xl border border-ink-100 shadow-card overflow-hidden">
        <div className="p-6 border-b border-ink-100 bg-ink-50/30">
          <h1 className="font-display text-2xl font-bold text-ink-900 flex items-center gap-2">
            <UserPlus className="h-6 w-6 text-brand-blue" />
            Create New User
          </h1>
          <p className="font-body text-ink-500 mt-1">Manually add a student or admin to the platform.</p>
        </div>

        <div className="p-8">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl text-sm font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-bold text-ink-900">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="w-full px-4 py-3 rounded-xl border border-ink-200 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all"
                placeholder="John Doe"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-bold text-ink-900">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full px-4 py-3 rounded-xl border border-ink-200 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all"
                placeholder="john@example.com"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-bold text-ink-900">
                Temporary Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                minLength={6}
                className="w-full px-4 py-3 rounded-xl border border-ink-200 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all"
                placeholder="••••••••"
              />
              <p className="text-xs text-ink-400">The user can change this later in their profile settings.</p>
            </div>

            <div className="space-y-2">
              <label htmlFor="role" className="block text-sm font-bold text-ink-900">
                User Role
              </label>
              <select
                id="role"
                name="role"
                className="w-full px-4 py-3 rounded-xl border border-ink-200 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all bg-white"
              >
                <option value="STUDENT">Student</option>
                <option value="ADMIN">Admin</option>
              </select>
            </div>

            <div className="pt-6 border-t border-ink-100 flex items-center justify-end gap-4">
              <Link
                href="/admin/users"
                className="px-6 py-3 rounded-xl font-bold text-ink-600 hover:bg-ink-50 transition-colors"
              >
                Cancel
              </Link>
              <Button variant="primary" type="submit" className="min-w-[140px]" disabled={isLoading}>
                {isLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin mx-auto" />
                ) : (
                  "Create User"
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
