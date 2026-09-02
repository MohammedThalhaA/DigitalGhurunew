"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";

export default function CreateCoursePage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/courses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      });

      if (!res.ok) {
        throw new Error("Failed to create course");
      }

      const data = await res.json();
      router.push(`/instructor/courses/${data.course.id}`);
    } catch (err) {
      setError("Something went wrong");
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-ink-100 max-w-2xl mx-auto mt-10">
      <h1 className="text-2xl font-display font-extrabold text-ink-900 mb-2">Name your course</h1>
      <p className="text-ink-500 text-sm mb-8">What would you like to name your course? Don't worry, you can change this later.</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-bold text-ink-900 mb-2">Course Title</label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-ink-200 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange text-ink-900 transition-colors bg-ink-50 focus:bg-white"
            placeholder="e.g. Advanced Digital Marketing 2026"
          />
        </div>

        {error && <p className="text-red-500 text-sm font-semibold">{error}</p>}

        <div className="flex items-center gap-3">
          <Button type="button" variant="outline" href="/instructor/courses">
            Cancel
          </Button>
          <Button type="submit" variant="primary" disabled={loading}>
            {loading ? "Creating..." : "Continue"}
          </Button>
        </div>
      </form>
    </div>
  );
}
