"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { upsertCareer } from "@/lib/actions/careers";
import Button from "@/components/ui/Button";
import { Plus, Trash2, Save } from "lucide-react";

interface CareerFormProps {
  initialData?: any;
}

export default function CareerForm({ initialData }: CareerFormProps) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [formData, setFormData] = useState({
    slug: initialData?.slug || "",
    title: initialData?.title || "",
    department: initialData?.department || "",
    experience: initialData?.experience || "",
    location: initialData?.location || "",
    type: initialData?.type || "Full-Time",
    description: initialData?.description || "",
    isActive: initialData !== undefined ? initialData.isActive : true,
  });

  const [responsibilities, setResponsibilities] = useState<string[]>(
    initialData?.responsibilities ? (typeof initialData.responsibilities === 'string' ? JSON.parse(initialData.responsibilities) : initialData.responsibilities) : [""]
  );

  const [requirements, setRequirements] = useState<string[]>(
    initialData?.requirements ? (typeof initialData.requirements === 'string' ? JSON.parse(initialData.requirements) : initialData.requirements) : [""]
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const val = type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    setFormData((prev) => ({ ...prev, [name]: val }));
  };

  const handleArrayChange = (setter: React.Dispatch<React.SetStateAction<string[]>>, index: number, value: string) => {
    setter((prev) => {
      const newArr = [...prev];
      newArr[index] = value;
      return newArr;
    });
  };

  const handleAddArrayItem = (setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    setter((prev) => [...prev, ""]);
  };

  const handleRemoveArrayItem = (setter: React.Dispatch<React.SetStateAction<string[]>>, index: number) => {
    setter((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!formData.slug || !formData.title || !formData.department) {
      setErrorMsg("Please fill in the required fields (Slug, Title, Department).");
      return;
    }

    setIsSaving(true);
    
    // Clean up empty array items
    const cleanResponsibilities = responsibilities.filter(r => r.trim() !== "");
    const cleanRequirements = requirements.filter(r => r.trim() !== "");

    const res = await upsertCareer({
      ...formData,
      responsibilities: cleanResponsibilities,
      requirements: cleanRequirements,
    });

    if (res.success) {
      router.push("/admin/careers");
    } else {
      setErrorMsg(res.error || "Failed to save career.");
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {errorMsg && (
        <div className="p-4 rounded-xl bg-red-50 text-red-600 font-medium text-sm border border-red-100">
          {errorMsg}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-bold text-ink-900" htmlFor="title">Job Title *</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-ink-200 rounded-xl bg-white focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue"
            required
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-bold text-ink-900" htmlFor="slug">URL Slug *</label>
          <input
            type="text"
            id="slug"
            name="slug"
            value={formData.slug}
            onChange={handleInputChange}
            disabled={!!initialData} // disable editing slug if it already exists to avoid 404s
            className="w-full px-4 py-3 border border-ink-200 rounded-xl bg-ink-50 focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue disabled:opacity-60"
            required
          />
          {!initialData && <p className="text-xs text-ink-500">Must be unique (e.g. senior-developer)</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-ink-900" htmlFor="department">Department *</label>
          <input
            type="text"
            id="department"
            name="department"
            value={formData.department}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-ink-200 rounded-xl bg-white focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-ink-900" htmlFor="type">Job Type</label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-ink-200 rounded-xl bg-white focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue"
          >
            <option value="Full-Time">Full-Time</option>
            <option value="Part-Time">Part-Time</option>
            <option value="Contract">Contract</option>
            <option value="Internship">Internship</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-ink-900" htmlFor="experience">Experience Required</label>
          <input
            type="text"
            id="experience"
            name="experience"
            value={formData.experience}
            onChange={handleInputChange}
            placeholder="e.g. 2 - 5 Years"
            className="w-full px-4 py-3 border border-ink-200 rounded-xl bg-white focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-ink-900" htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            placeholder="e.g. Main Campus / Remote"
            className="w-full px-4 py-3 border border-ink-200 rounded-xl bg-white focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-bold text-ink-900" htmlFor="description">Job Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          rows={4}
          className="w-full px-4 py-3 border border-ink-200 rounded-xl bg-white focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-ink-100">
        {/* Responsibilities */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-ink-900">Key Responsibilities</h3>
            <button
              type="button"
              onClick={() => handleAddArrayItem(setResponsibilities)}
              className="text-xs font-bold text-brand-blue flex items-center gap-1 hover:underline"
            >
              <Plus className="h-3 w-3" /> Add Item
            </button>
          </div>
          <div className="space-y-3">
            {responsibilities.map((resp, idx) => (
              <div key={idx} className="flex gap-2">
                <input
                  type="text"
                  value={resp}
                  onChange={(e) => handleArrayChange(setResponsibilities, idx, e.target.value)}
                  className="flex-1 px-4 py-2 text-sm border border-ink-200 rounded-lg bg-white focus:outline-none focus:border-brand-blue"
                  placeholder="Responsibility detail"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveArrayItem(setResponsibilities, idx)}
                  className="p-2 text-ink-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Requirements */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-ink-900">Requirements</h3>
            <button
              type="button"
              onClick={() => handleAddArrayItem(setRequirements)}
              className="text-xs font-bold text-brand-blue flex items-center gap-1 hover:underline"
            >
              <Plus className="h-3 w-3" /> Add Item
            </button>
          </div>
          <div className="space-y-3">
            {requirements.map((req, idx) => (
              <div key={idx} className="flex gap-2">
                <input
                  type="text"
                  value={req}
                  onChange={(e) => handleArrayChange(setRequirements, idx, e.target.value)}
                  className="flex-1 px-4 py-2 text-sm border border-ink-200 rounded-lg bg-white focus:outline-none focus:border-brand-blue"
                  placeholder="Requirement detail"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveArrayItem(setRequirements, idx)}
                  className="p-2 text-ink-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="pt-6 border-t border-ink-100 flex items-center justify-between">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            name="isActive"
            checked={formData.isActive}
            onChange={handleInputChange}
            className="w-5 h-5 rounded border-ink-300 text-brand-blue focus:ring-brand-blue"
          />
          <span className="text-sm font-bold text-ink-900">Active (Visible on Website)</span>
        </label>

        <Button type="submit" variant="primary" disabled={isSaving} className="min-w-[140px]">
          {isSaving ? "Saving..." : (
            <span className="flex items-center gap-2">
              <Save className="h-4 w-4" /> Save Job
            </span>
          )}
        </Button>
      </div>
    </form>
  );
}
