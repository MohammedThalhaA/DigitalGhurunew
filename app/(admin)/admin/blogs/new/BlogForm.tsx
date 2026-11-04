"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { upsertBlog } from "@/lib/actions/blogs";
import Button from "@/components/ui/Button";
import {
  Save,
  Upload,
  RefreshCw,
  Eye,
  FileEdit,
  Sparkles,
  Link as LinkIcon,
  HelpCircle,
  GraduationCap,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Bold,
  Quote,
  Minus,
  AlignLeft,
  Info,
} from "lucide-react";

interface BlogFormProps {
  initialData?: any;
}

const CATEGORY_OPTIONS = [
  "Strategy & Guides",
  "AI & Automation",
  "SEO & Growth",
  "Social Media",
  "Paid Advertising",
  "Career Roadmap",
  "Full Stack Development",
  "Case Studies",
  "General",
];

const COURSE_OPTIONS = [
  {
    slug: "ai-powered-digital-marketing",
    label: "AI-Powered Digital Marketing Course (Recommended for SEO, Ads & Marketing)",
  },
  {
    slug: "react-js-full-stack-development",
    label: "React JS Full Stack Development Course (Recommended for Coding & Web Dev)",
  },
  {
    slug: "ai-super-kids",
    label: "AI Super Kids - AI Innovators Grade 7-8",
  },
  {
    slug: "ai-super-kids-grade-11-12",
    label: "AI Super Kids - AI Future Leaders Grade 11-12",
  },
  {
    slug: "ai-super-kids-creators-grades-5-6",
    label: "AI Super Kids - AI Creators Grades 5-6",
  },
];

export default function BlogForm({ initialData }: BlogFormProps) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");

  const [formData, setFormData] = useState({
    slug: initialData?.slug || "",
    title: initialData?.title || "",
    category: initialData?.category || "Strategy & Guides",
    related_course_slug:
      initialData?.related_course_slug || "ai-powered-digital-marketing",
    read_time: initialData?.read_time || "",
    excerpt: initialData?.excerpt || "",
    content: initialData?.content || "",
    cover_image: initialData?.cover_image || "",
    author_name: initialData?.author_name || "Digital Ghuru Mentors",
    author_role: initialData?.author_role || "Senior Marketing Strategist",
    author_image: initialData?.author_image || "/logo-final dG.webp",
    is_published: initialData?.is_published ?? true,
  });

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setFormData((prev) => ({
      ...prev,
      title,
      // Only auto-update slug if it wasn't already set or matched old title
      slug: !initialData ? generateSlug(title) : prev.slug,
    }));
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const cat = e.target.value;
    setFormData((prev) => {
      let relatedCourse = prev.related_course_slug;
      if (!initialData) {
        if (cat === "Full Stack Development") {
          relatedCourse = "react-js-full-stack-development";
        } else if (
          cat !== "Full Stack Development" &&
          relatedCourse === "react-js-full-stack-development"
        ) {
          relatedCourse = "ai-powered-digital-marketing";
        }
      }
      return {
        ...prev,
        category: cat,
        related_course_slug: relatedCourse,
      };
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const val = type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    setFormData((prev) => ({ ...prev, [name]: val }));
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    setErrorMsg("");

    const data = new FormData();
    data.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: data,
      });
      const json = await res.json();
      if (res.ok && json.url) {
        setFormData((prev) => ({ ...prev, cover_image: json.url }));
      } else {
        setErrorMsg(json.error || "Failed to upload image. Please try again.");
      }
    } catch (err) {
      setErrorMsg("Error uploading image. Please check connection.");
    } finally {
      setUploadingImage(false);
    }
  };

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const applyFormat = (
    formatType:
      | "h2"
      | "h3"
      | "bold"
      | "bullet"
      | "numbered"
      | "quote"
      | "divider"
      | "paragraphs"
  ) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart ?? 0;
    const end = textarea.selectionEnd ?? 0;
    const current = formData.content;
    const selectedText = current.substring(start, end);

    let replacement = "";
    let newCursorPos = start;

    switch (formatType) {
      case "h2": {
        const text = (selectedText || "Section Heading Here")
          .trim()
          .replace(/^#+\s*/, "");
        replacement = `\n\n## ${text}\n\n`;
        newCursorPos = start + replacement.length;
        break;
      }
      case "h3": {
        const text = (selectedText || "Subheading Title Here")
          .trim()
          .replace(/^#+\s*/, "");
        replacement = `\n\n### ${text}\n\n`;
        newCursorPos = start + replacement.length;
        break;
      }
      case "bold": {
        const text = selectedText || "bold text";
        replacement = `**${text}**`;
        newCursorPos = start + replacement.length;
        break;
      }
      case "quote": {
        const text = (selectedText || "Add key takeaway or highlighted advice here.")
          .trim()
          .replace(/^>\s*/gm, "");
        replacement = `\n\n> ${text}\n\n`;
        newCursorPos = start + replacement.length;
        break;
      }
      case "bullet": {
        const text = (selectedText || "First key point\nSecond key point\nThird key point").trim();
        let items: string[] = [];
        if (text.includes("\n")) {
          items = text.split(/\r?\n/).map((l: string) => l.trim()).filter(Boolean);
        } else if (text.includes(". ")) {
          items = text.split(/(?<=[.!?])\s+/).map((l: string) => l.trim()).filter(Boolean);
        } else {
          items = [text];
        }
        const bulleted = items
          .map((item: string) => `- ${item.replace(/^[-*•\d.]+\s*/, "")}`)
          .join("\n");
        replacement = `\n\n${bulleted}\n\n`;
        newCursorPos = start + replacement.length;
        break;
      }
      case "numbered": {
        const text = (selectedText || "First step\nSecond step\nThird step").trim();
        let items: string[] = [];
        if (text.includes("\n")) {
          items = text.split(/\r?\n/).map((l: string) => l.trim()).filter(Boolean);
        } else if (text.includes(". ")) {
          items = text.split(/(?<=[.!?])\s+/).map((l: string) => l.trim()).filter(Boolean);
        } else {
          items = [text];
        }
        const numbered = items
          .map((item: string, idx: number) => `${idx + 1}. ${item.replace(/^[-*•\d.]+\s*/, "")}`)
          .join("\n");
        replacement = `\n\n${numbered}\n\n`;
        newCursorPos = start + replacement.length;
        break;
      }
      case "divider": {
        replacement = `\n\n---\n\n`;
        newCursorPos = start + replacement.length;
        break;
      }
      case "paragraphs": {
        const target = (selectedText || current).trim();
        if (!target) return;

        // Split single large wall of text into spaced paragraphs (groups of 2-3 sentences)
        const sentences = target.split(/(?<=[.!?])\s+/).filter(Boolean);
        const chunks: string[] = [];
        let currentChunk: string[] = [];

        sentences.forEach((sentence: string, idx: number) => {
          currentChunk.push(sentence);
          if (currentChunk.length >= 2 || idx === sentences.length - 1) {
            chunks.push(currentChunk.join(" "));
            currentChunk = [];
          }
        });

        const formatted = chunks.join("\n\n");

        if (selectedText) {
          replacement = `\n\n${formatted}\n\n`;
          newCursorPos = start + replacement.length;
        } else {
          setFormData((prev) => ({ ...prev, content: formatted }));
          setTimeout(() => {
            textarea.focus();
          }, 0);
          return;
        }
        break;
      }
    }

    const updated =
      current.substring(0, start) + replacement + current.substring(end);
    setFormData((prev) => ({ ...prev, content: updated }));

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  };

  const insertSnippet = (snippet: string) => {
    setFormData((prev) => ({
      ...prev,
      content: prev.content ? `${prev.content}\n\n${snippet}` : snippet,
    }));
  };

  const handleSave = async (forceStatus?: boolean) => {
    if (!formData.title.trim()) {
      setErrorMsg("Article title is required.");
      return;
    }
    if (!formData.excerpt.trim()) {
      setErrorMsg("Article excerpt is required.");
      return;
    }
    if (!formData.content.trim()) {
      setErrorMsg("Article content cannot be empty.");
      return;
    }

    setIsSaving(true);
    setErrorMsg("");

    const isPublished = forceStatus !== undefined ? forceStatus : formData.is_published;

    try {
      const res = await upsertBlog({
        ...formData,
        originalSlug: initialData?.slug,
        is_published: isPublished,
        related_course_slug: formData.related_course_slug,
      });

      if (res.success) {
        router.push("/admin/blogs");
        router.refresh();
      } else {
        setErrorMsg(res.error || "Failed to save blog post.");
      }
    } catch (err: any) {
      setErrorMsg(err.message || "An unexpected error occurred.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        handleSave();
      }}
      className="space-y-8"
    >
      {errorMsg && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm font-medium">
          {errorMsg}
        </div>
      )}

      {/* ── Tabs (Write / Preview) ── */}
      <div className="flex items-center justify-between border-b border-ink-100 pb-4">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveTab("edit")}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors flex items-center gap-2 ${
              activeTab === "edit"
                ? "bg-brand-blue text-white shadow-sm"
                : "text-ink-500 hover:bg-ink-100"
            }`}
          >
            <FileEdit className="h-4 w-4" />
            Article Editor
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("preview")}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors flex items-center gap-2 ${
              activeTab === "preview"
                ? "bg-brand-blue text-white shadow-sm"
                : "text-ink-500 hover:bg-ink-100"
            }`}
          >
            <Eye className="h-4 w-4" />
            Live Preview
          </button>
        </div>

        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 text-sm text-ink-700 cursor-pointer">
            <input
              type="checkbox"
              name="is_published"
              checked={formData.is_published}
              onChange={handleInputChange}
              className="h-4 w-4 rounded text-brand-blue focus:ring-brand-blue border-ink-300"
            />
            <span className="font-medium">Published on public site</span>
          </label>
        </div>
      </div>

      {activeTab === "preview" ? (
        /* ── PREVIEW TAB ── */
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-ink-200 space-y-6">
          <div className="space-y-3">
            <div className="inline-block px-3 py-1 rounded-full bg-brand-blue/10 text-brand-blue text-xs font-bold uppercase tracking-wider">
              {formData.category}
            </div>
            <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-ink-900 leading-tight">
              {formData.title || "Untitled Article"}
            </h1>
            <p className="text-lg text-ink-600 font-medium italic">
              {formData.excerpt || "Article excerpt preview will show here..."}
            </p>
          </div>

          {formData.cover_image && (
            <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border border-ink-200">
              <Image
                src={formData.cover_image}
                alt={formData.title}
                fill
                className="object-cover"
              />
            </div>
          )}

          <div className="flex items-center gap-3 pt-4 border-t border-ink-200">
            <div className="h-10 w-10 rounded-full bg-brand-blue text-white flex items-center justify-center font-bold text-sm">
              DG
            </div>
            <div>
              <p className="font-heading font-bold text-ink-900 text-sm">
                {formData.author_name}
              </p>
              <p className="text-xs text-ink-500">{formData.author_role}</p>
            </div>
          </div>

          <div className="pt-6 border-t border-ink-200 prose prose-ink max-w-none">
            <div className="whitespace-pre-line text-ink-700 leading-relaxed space-y-4">
              {formData.content || "Write some content in the editor to see it here..."}
            </div>
          </div>
        </div>
      ) : (
        /* ── EDITOR TAB ── */
        <div className="space-y-8">
          {/* Row 1: Title & Slug */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-2">
              <label className="block text-sm font-semibold text-ink-700">
                Article Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                required
                value={formData.title}
                onChange={handleTitleChange}
                placeholder="e.g. 10 Proven SEO Strategies That Drive Real Conversions"
                className="w-full bg-white border border-ink-200 rounded-xl px-4 py-3 text-ink-900 focus:outline-none focus:ring-2 focus:ring-brand-blue/50 focus:border-brand-blue transition-all font-heading text-lg font-bold"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-ink-700">
                URL Slug <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="slug"
                required
                value={formData.slug}
                onChange={handleInputChange}
                placeholder="10-seo-strategies"
                className="w-full bg-white border border-ink-200 rounded-xl px-4 py-3 text-ink-900 focus:outline-none focus:ring-2 focus:ring-brand-blue/50 focus:border-brand-blue transition-all text-sm font-mono"
              />
              <p className="text-[11px] text-ink-400">
                Live URL: <code className="text-brand-blue">/blog/{formData.slug || "your-slug"}</code>
              </p>
            </div>
          </div>

          {/* Row 2: Category & Read Time & Author */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-ink-700">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleCategoryChange}
                className="w-full bg-white border border-ink-200 rounded-xl px-4 py-3 text-ink-900 focus:outline-none focus:ring-2 focus:ring-brand-blue/50 focus:border-brand-blue transition-all"
              >
                {CATEGORY_OPTIONS.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-ink-700">
                Estimated Read Time
              </label>
              <input
                type="text"
                name="read_time"
                value={formData.read_time}
                onChange={handleInputChange}
                placeholder="e.g. 8 min read (or leave blank to auto-calculate)"
                className="w-full bg-white border border-ink-200 rounded-xl px-4 py-3 text-ink-900 focus:outline-none focus:ring-2 focus:ring-brand-blue/50 focus:border-brand-blue transition-all text-sm"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-ink-700">
                Author Display Name
              </label>
              <input
                type="text"
                name="author_name"
                value={formData.author_name}
                onChange={handleInputChange}
                placeholder="e.g. Digital Ghuru Mentors"
                className="w-full bg-white border border-ink-200 rounded-xl px-4 py-3 text-ink-900 focus:outline-none focus:ring-2 focus:ring-brand-blue/50 focus:border-brand-blue transition-all text-sm"
              />
            </div>
          </div>

          {/* Row 2.5: Related Course Selector for Sticky Sidebar Card */}
          <div className="p-5 rounded-2xl bg-brand-blue/5 border border-brand-blue/20 space-y-2.5">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-brand-blue text-white">
                <GraduationCap className="h-4 w-4" />
              </div>
              <label className="block text-sm font-bold text-ink-900">
                Related Course (Sticky Sidebar Enrollment Card)
              </label>
            </div>
            <p className="text-xs text-ink-600 leading-relaxed">
              Select which official course card will be displayed in the sticky sidebar alongside this blog article.
              The sidebar card includes live pricing, direct enrollment checkout, key program highlights, and syllabus brochure download.
            </p>
            <select
              name="related_course_slug"
              value={formData.related_course_slug}
              onChange={handleInputChange}
              className="w-full bg-white border border-brand-blue/30 rounded-xl px-4 py-3 text-ink-900 focus:outline-none focus:ring-2 focus:ring-brand-blue/50 focus:border-brand-blue transition-all font-medium text-sm shadow-2xs"
            >
              {COURSE_OPTIONS.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>

          {/* Row 3: Cover Image Upload */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-ink-700">
              Featured Cover Image
            </label>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <input
                type="text"
                name="cover_image"
                value={formData.cover_image}
                onChange={handleInputChange}
                placeholder="Upload image or paste URL (e.g. /uploads/... or https://...)"
                className="flex-1 bg-white border border-ink-200 rounded-xl px-4 py-3 text-ink-900 focus:outline-none focus:ring-2 focus:ring-brand-blue/50 focus:border-brand-blue transition-all text-sm"
              />
              <label className="cursor-pointer bg-gradient-to-r from-brand-blue to-blue-600 hover:brightness-110 text-white font-semibold px-4 py-3 rounded-xl shadow-sm transition-all flex items-center gap-2 shrink-0">
                {uploadingImage ? (
                  <RefreshCw className="h-4 w-4 animate-spin" />
                ) : (
                  <Upload className="h-4 w-4" />
                )}
                <span>Upload Image</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  disabled={uploadingImage}
                  className="hidden"
                />
              </label>
            </div>

            {formData.cover_image && (
              <div className="mt-2 flex items-center gap-4">
                <div className="relative h-20 w-36 rounded-xl overflow-hidden border border-ink-200">
                  <Image
                    src={formData.cover_image}
                    alt="Cover preview"
                    fill
                    className="object-cover"
                  />
                </div>
                <span className="text-xs text-ink-400">Cover preview loaded</span>
              </div>
            )}
          </div>

          {/* Row 4: Short Excerpt */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-ink-700">
              Short Excerpt / Summary <span className="text-red-500">*</span>
            </label>
            <textarea
              name="excerpt"
              required
              rows={2}
              value={formData.excerpt}
              onChange={handleInputChange}
              placeholder="Brief 1-2 sentence overview shown on blog cards and search engine descriptions..."
              className="w-full bg-white border border-ink-200 rounded-xl p-4 text-ink-900 focus:outline-none focus:ring-2 focus:ring-brand-blue/50 focus:border-brand-blue transition-all text-sm leading-relaxed"
            />
          </div>

          {/* Row 5: Article Content with Visual Select & Format Toolbar */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <label className="block text-sm font-semibold text-ink-700">
                Article Body Content <span className="text-red-500">*</span>
              </label>
              <span className="text-xs text-ink-400">
                Tip: Select any line or sentence below, then click a tool to format it.
              </span>
            </div>

            {/* Smart Formatting Toolbar Container */}
            <div className="rounded-2xl border border-ink-200 overflow-hidden bg-white shadow-sm focus-within:ring-2 focus-within:ring-brand-blue/40 focus-within:border-brand-blue transition-all">
              {/* Toolbar Action Buttons */}
              <div className="bg-ink-50/80 border-b border-ink-200 p-2.5 flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-ink-400 mr-1 flex items-center gap-1">
                    <Sparkles className="h-3 w-3 text-brand-blue" />
                    Select & Format:
                  </span>

                  <button
                    type="button"
                    onClick={() => applyFormat("h2")}
                    title="Highlight any text and click to make it a Main Section Heading"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-ink-200 text-ink-700 text-xs font-semibold hover:border-brand-blue hover:text-brand-blue hover:bg-brand-blue/5 transition-all shadow-xs"
                  >
                    <Heading2 className="h-3.5 w-3.5 text-brand-blue" />
                    <span>H2 Heading</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => applyFormat("h3")}
                    title="Highlight any text and click to make it a Subheading"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-ink-200 text-ink-700 text-xs font-semibold hover:border-brand-blue hover:text-brand-blue hover:bg-brand-blue/5 transition-all shadow-xs"
                  >
                    <Heading3 className="h-3.5 w-3.5 text-brand-blue" />
                    <span>H3 Subheading</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => applyFormat("bold")}
                    title="Make highlighted text bold"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-ink-200 text-ink-700 text-xs font-bold hover:border-brand-blue hover:text-brand-blue hover:bg-brand-blue/5 transition-all shadow-xs"
                  >
                    <Bold className="h-3.5 w-3.5" />
                    <span>Bold</span>
                  </button>

                  <div className="h-5 w-px bg-ink-200 mx-1 hidden sm:block" />

                  <button
                    type="button"
                    onClick={() => applyFormat("bullet")}
                    title="Turn selected line(s) into Bullet Points"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-ink-200 text-ink-700 text-xs font-semibold hover:border-brand-blue hover:text-brand-blue hover:bg-brand-blue/5 transition-all shadow-xs"
                  >
                    <List className="h-3.5 w-3.5 text-emerald-600" />
                    <span>Bullet Points</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => applyFormat("numbered")}
                    title="Turn selected line(s) into Numbered List"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-ink-200 text-ink-700 text-xs font-semibold hover:border-brand-blue hover:text-brand-blue hover:bg-brand-blue/5 transition-all shadow-xs"
                  >
                    <ListOrdered className="h-3.5 w-3.5 text-indigo-600" />
                    <span>Numbered List</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => applyFormat("quote")}
                    title="Format selected text as a Standout Quote"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-ink-200 text-ink-700 text-xs font-semibold hover:border-brand-blue hover:text-brand-blue hover:bg-brand-blue/5 transition-all shadow-xs"
                  >
                    <Quote className="h-3.5 w-3.5 text-amber-600" />
                    <span>Callout Quote</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => applyFormat("divider")}
                    title="Insert a horizontal line divider"
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white border border-ink-200 text-ink-700 text-xs font-semibold hover:border-brand-blue hover:text-brand-blue hover:bg-brand-blue/5 transition-all shadow-xs"
                  >
                    <Minus className="h-3.5 w-3.5" />
                    <span>Divider</span>
                  </button>
                </div>

                {/* Auto split big paragraphs */}
                <button
                  type="button"
                  onClick={() => applyFormat("paragraphs")}
                  title="If you pasted a single large wall of text, this splits it into readable spaced paragraphs"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 border border-brand-blue/30 text-brand-blue text-xs font-bold hover:bg-brand-blue/10 transition-all shadow-xs shrink-0"
                >
                  <AlignLeft className="h-3.5 w-3.5 text-brand-blue" />
                  <span>Auto-Split Paragraphs</span>
                </button>
              </div>

              {/* Helpful Inline Banner */}
              <div className="bg-blue-50/50 border-b border-blue-100/60 px-4 py-2 flex items-center justify-between text-xs text-ink-600">
                <span className="flex items-center gap-2">
                  <Info className="h-4 w-4 text-brand-blue shrink-0" />
                  <span>
                    <strong>How it works:</strong> Paste your big paragraph. Highlight any line with your mouse and click <strong>H2 Heading</strong> or <strong>Bullet Points</strong>. Or click <strong>Auto-Split Paragraphs</strong> to separate text automatically.
                  </span>
                </span>
              </div>

              {/* Textarea */}
              <textarea
                ref={textareaRef}
                name="content"
                required
                rows={18}
                value={formData.content}
                onChange={handleInputChange}
                placeholder="Paste your article here. Highlight any line or sentence and click any tool above to convert it into a heading, bullet points, or quote. You can also click the Live Preview tab at the top anytime!"
                className="w-full bg-white p-4 text-ink-900 focus:outline-none font-body text-base leading-relaxed resize-y"
              />
            </div>
          </div>
        </div>
      )}

      {/* ── Action Buttons ── */}
      <div className="pt-6 border-t border-ink-100 flex flex-col sm:flex-row items-center justify-between gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/admin/blogs")}
        >
          Cancel
        </Button>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Button
            type="button"
            variant="outline"
            disabled={isSaving}
            onClick={() => handleSave(false)}
            className="w-full sm:w-auto"
          >
            Save as Draft
          </Button>

          <Button
            type="submit"
            variant="primary"
            disabled={isSaving}
            className="w-full sm:w-auto"
          >
            {isSaving ? (
              <>
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" /> Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                {formData.is_published ? "Publish Live" : "Save Changes"}
              </>
            )}
          </Button>
        </div>
      </div>
    </form>
  );
}
