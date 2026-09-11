"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { createEnrollment } from "../actions";

interface User {
  id: number;
  name: string;
  email: string;
}

interface Course {
  id: number;
  title: string;
  price: string;
}

interface ManualEnrollmentFormProps {
  users: User[];
  courses: Course[];
}

export default function ManualEnrollmentForm({ users, courses }: ManualEnrollmentFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const result = await createEnrollment(formData);

    if (result.success) {
      router.push("/admin/enrollments");
      router.refresh();
    } else {
      setError(result.error || "Something went wrong.");
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl text-sm font-medium">
          {error}
        </div>
      )}

      <div className="space-y-2">
        <label htmlFor="userId" className="block text-sm font-bold text-ink-900">
          Select Student
        </label>
        <select
          id="userId"
          name="userId"
          required
          className="w-full px-4 py-3 rounded-xl border border-ink-200 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all bg-white"
        >
          <option value="">-- Choose a student --</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name} ({user.email})
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label htmlFor="courseId" className="block text-sm font-bold text-ink-900">
          Select Course
        </label>
        <select
          id="courseId"
          name="courseId"
          required
          className="w-full px-4 py-3 rounded-xl border border-ink-200 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all bg-white"
        >
          <option value="">-- Choose a course --</option>
          {courses.map((course) => (
            <option key={course.id} value={course.id}>
              {course.title}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label htmlFor="pricePaid" className="block text-sm font-bold text-ink-900">
          Price Paid (₹)
        </label>
        <input
          id="pricePaid"
          name="pricePaid"
          type="number"
          min="0"
          step="0.01"
          defaultValue="0"
          required
          className="w-full px-4 py-3 rounded-xl border border-ink-200 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all"
        />
        <p className="text-xs text-ink-400">Enter 0 if this is a free grant or offline payment already accounted for.</p>
      </div>

      <div className="pt-6 border-t border-ink-100 flex items-center justify-end gap-4">
        <Link
          href="/admin/enrollments"
          className="px-6 py-3 rounded-xl font-bold text-ink-600 hover:bg-ink-50 transition-colors"
        >
          Cancel
        </Link>
        <Button variant="primary" type="submit" className="min-w-[140px]" disabled={isLoading}>
          {isLoading ? (
            <Loader2 className="h-5 w-5 animate-spin mx-auto" />
          ) : (
            "Grant Access"
          )}
        </Button>
      </div>
    </form>
  );
}
