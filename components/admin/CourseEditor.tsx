"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2, Sparkles, Video } from "lucide-react";
import Button from "@/components/ui/Button";
import CurriculumManager from "./CurriculumManager";
import CourseWizard from "./CourseWizard";
import { courseMap } from "@/lib/courseData";
import { useToast } from "@/components/ui/Toast";
import ConfirmModal from "@/components/ui/ConfirmModal";

export default function CourseEditor({
  course,
  initialModules,
  initialChapters
}: {
  course: any;
  initialModules: any[];
  initialChapters: any[];
}) {
  const router = useRouter();
  const toast = useToast();
  const [activeTab, setActiveTab] = useState<"wizard" | "curriculum" | "danger">("wizard");
  const [loading, setLoading] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Merge DB marketing data with static fallback so the form isn't empty for old courses
  const staticCourseFallback = courseMap[course.slug] || {};
  const mergedMarketingData = {
    ...staticCourseFallback,
    ...(course.marketing_data || {})
  };

  const initialWizardData = {
    title: course.title || "",
    slug: course.slug || "",
    description: course.description || "",
    price: course.price,
    isPublished: course.isPublished || false,
    marketing_data: mergedMarketingData,
    initialModules: initialModules,
    initialChapters: initialChapters
  };

  const handleWizardSave = async (wizardData: any) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/courses/${course.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(wizardData)
      });

      if (res.ok) {
        toast.success(
          "Course Updated Successfully!",
          "All changes have been saved to the database and are live."
        );
        router.refresh();
      } else {
        toast.error(
          "Failed to Save Course",
          "There was an error updating the course. Please check your data and try again."
        );
      }
    } catch (err) {
      console.error(err);
      toast.error(
        "Connection Error",
        "Could not communicate with the server to save changes."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmDelete = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/courses/${course.id}`, {
        method: "DELETE"
      });

      if (res.ok) {
        setIsDeleteModalOpen(false);
        toast.success(
          "Course Deleted",
          `"${course.title}" has been permanently removed.`
        );
        router.push("/admin/courses");
        router.refresh();
      } else {
        toast.error("Failed to delete course", "Server returned an error. Please try again.");
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      toast.error("Error deleting course", "Could not connect to the server.");
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Tabs */}
      <div className="bg-white rounded-2xl border border-ink-100 shadow-sm p-1.5 flex gap-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab("wizard")}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl font-heading text-sm font-semibold whitespace-nowrap transition-all ${
            activeTab === "wizard" 
              ? "bg-brand-blue text-white shadow-sm" 
              : "text-ink-600 hover:text-ink-900 hover:bg-ink-50"
          }`}
        >
          <Sparkles className="h-4 w-4" />
          Course Wizard (Step-by-Step)
        </button>
        <button
          onClick={() => setActiveTab("curriculum")}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl font-heading text-sm font-semibold whitespace-nowrap transition-all ${
            activeTab === "curriculum" 
              ? "bg-brand-blue text-white shadow-sm" 
              : "text-ink-600 hover:text-ink-900 hover:bg-ink-50"
          }`}
        >
          <Video className="h-4 w-4" />
          Curriculum & Video Links
        </button>
        <button
          onClick={() => setActiveTab("danger")}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl font-heading text-sm font-semibold whitespace-nowrap transition-all ${
            activeTab === "danger" 
              ? "bg-red-500 text-white shadow-sm" 
              : "text-red-500 hover:bg-red-50"
          }`}
        >
          <Trash2 className="h-4 w-4" />
          Danger Zone
        </button>
      </div>

      {/* Tab Contents */}
      <div>
        {activeTab === "wizard" && (
          <CourseWizard 
            initialData={initialWizardData} 
            isEditMode={true}
            onComplete={handleWizardSave} 
            isSaving={loading}
          />
        )}

        {activeTab === "curriculum" && (
          <div className="bg-white rounded-3xl border border-ink-100 shadow-card p-6 md:p-8">
            <div className="mb-6">
              <h2 className="font-display text-lg font-bold text-ink-900 flex items-center gap-2">
                <Video className="h-5 w-5 text-brand-blue" />
                Curriculum & Videos
              </h2>
              <p className="font-body text-sm text-ink-500 mt-1">Organize your course and add Google Drive video links to your topics.</p>
            </div>
            <CurriculumManager 
              courseId={course.id} 
              initialModules={initialModules} 
              initialChapters={initialChapters} 
            />
          </div>
        )}

        {activeTab === "danger" && (
          <div className="bg-white rounded-3xl border border-ink-100 shadow-card p-6 md:p-8">
            <div className="space-y-4 max-w-lg border border-red-200 bg-red-50 p-6 rounded-2xl">
              <h3 className="font-display text-lg font-bold text-red-600 flex items-center gap-2">
                <Trash2 className="h-5 w-5" />
                Delete Course
              </h3>
              <p className="font-body text-sm text-red-800">
                Once you delete a course, there is no going back. All associated modules, chapters, and records will be removed. Please be certain.
              </p>
              <Button 
                variant="primary" 
                onClick={() => setIsDeleteModalOpen(true)} 
                disabled={loading} 
                className="!bg-red-500 hover:!bg-red-600"
              >
                Delete Course Permanently
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Custom Themed Confirmation Modal */}
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Course Permanently?"
        description={`Are you sure you want to permanently delete "${course.title}"? This will completely remove all curriculum topics, lesson video links, and course data from the system. This action cannot be reversed.`}
        confirmText="Yes, Delete Course"
        cancelText="Cancel"
        variant="danger"
        isLoading={loading}
      />
    </div>
  );
}
