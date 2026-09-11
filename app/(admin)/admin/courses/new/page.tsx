"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import CourseWizard from "@/components/admin/CourseWizard";

export default function CreateCoursePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("/api/courses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error("Something went wrong");
      }

      const responseData = await res.json();
      router.push(`/admin/courses/${responseData.course.id}`);
      router.refresh();
    } catch (error) {
      setError("Failed to create course. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full space-y-6">
      <div className="flex items-center gap-4 mb-4">
        <button 
          onClick={() => router.back()}
          className="h-10 w-10 flex items-center justify-center rounded-full border border-ink-200 text-ink-500 hover:bg-ink-50 hover:text-ink-900 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-ink-900 mb-1">Create New Course</h1>
          <p className="font-body text-base text-ink-500">Fill out the details below to generate your course landing page.</p>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-50 text-red-600 font-body text-sm border border-red-100">
          {error}
        </div>
      )}

      <CourseWizard onComplete={onSubmit} isSaving={isLoading} />
    </div>
  );
}
