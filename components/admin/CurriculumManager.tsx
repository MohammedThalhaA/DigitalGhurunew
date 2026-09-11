"use client";

import { useState } from "react";
import { GripVertical, Video, FileVideo, Plus, Check, X, Pencil } from "lucide-react";
import Button from "@/components/ui/Button";

import { useToast } from "@/components/ui/Toast";

interface Module {
  id: number;
  title: string;
}

interface Chapter {
  id: number;
  moduleId: number;
  title: string;
  videoUrl: string | null;
}

export default function CurriculumManager({
  courseId,
  initialModules,
  initialChapters
}: {
  courseId: number;
  initialModules: Module[];
  initialChapters: Chapter[];
}) {
  const toast = useToast();
  const [chapters, setChapters] = useState<Chapter[]>(initialChapters);
  const [editingChapterId, setEditingChapterId] = useState<number | null>(null);
  const [videoUrlInput, setVideoUrlInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSaveVideo = async (chapterId: number) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/chapters/${chapterId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ videoUrl: videoUrlInput })
      });

      if (res.ok) {
        setChapters(chapters.map(c => c.id === chapterId ? { ...c, videoUrl: videoUrlInput } : c));
        setEditingChapterId(null);
        toast.success("Video Link Saved", "The lesson video link has been updated successfully.");
      } else {
        toast.error("Failed to Save Link", "Server was unable to save the video link. Please try again.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Connection Error", "Could not connect to the server to update the video link.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4 mt-6">
      {initialModules.length === 0 ? (
        <div className="p-8 text-center bg-ink-50/50 rounded-2xl border border-ink-100 border-dashed">
          <p className="font-body text-ink-500 italic">No modules added yet. Start by adding a module.</p>
        </div>
      ) : (
        initialModules.map((mod) => {
          const modChapters = chapters.filter((c) => c.moduleId === mod.id);
          return (
            <div key={mod.id} className="border border-ink-200 rounded-2xl overflow-hidden bg-white shadow-sm hover:border-brand-blue/30 transition-colors">
              <div className="bg-ink-50 p-4 border-b border-ink-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <GripVertical className="h-5 w-5 text-ink-300 cursor-grab" />
                  <h3 className="font-display text-base font-bold text-ink-900">{mod.title}</h3>
                </div>
              </div>
              
              <div className="p-2 space-y-1">
                {modChapters.length === 0 ? (
                  <p className="p-4 text-center font-body text-sm text-ink-400 italic">No videos in this module</p>
                ) : (
                  modChapters.map((chapter) => (
                    <div key={chapter.id} className="flex flex-col gap-2 p-3 rounded-xl hover:bg-ink-50 group transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <FileVideo className={`h-4 w-4 ${chapter.videoUrl ? "text-brand-blue" : "text-ink-300"}`} />
                          <p className="font-body text-sm font-medium text-ink-700">{chapter.title}</p>
                        </div>
                        
                        {editingChapterId !== chapter.id && (
                          <button
                            onClick={() => {
                              setEditingChapterId(chapter.id);
                              setVideoUrlInput(chapter.videoUrl || "");
                            }}
                            className="text-xs font-body font-medium flex items-center gap-1 text-ink-400 hover:text-brand-blue px-2 py-1 rounded-md bg-ink-100 hover:bg-blue-50 transition-colors"
                          >
                            <Pencil className="h-3 w-3" />
                            {chapter.videoUrl ? "Edit Link" : "Add Link"}
                          </button>
                        )}
                      </div>

                      {editingChapterId === chapter.id && (
                        <div className="ml-7 mt-2 flex items-center gap-2">
                          <input
                            type="url"
                            value={videoUrlInput}
                            onChange={(e) => setVideoUrlInput(e.target.value)}
                            placeholder="Paste Google Drive Link here..."
                            className="flex-1 text-sm font-body px-3 py-2 rounded-lg border border-ink-200 focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue/30"
                          />
                          <button
                            onClick={() => handleSaveVideo(chapter.id)}
                            disabled={loading}
                            className="bg-emerald-500 hover:bg-emerald-600 text-white p-2 rounded-lg transition-colors"
                          >
                            <Check className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => setEditingChapterId(null)}
                            disabled={loading}
                            className="bg-ink-200 hover:bg-ink-300 text-ink-700 p-2 rounded-lg transition-colors"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      )}

                      {chapter.videoUrl && editingChapterId !== chapter.id && (
                        <div className="ml-7">
                          <a href={chapter.videoUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-brand-blue hover:underline truncate inline-block max-w-[300px] md:max-w-[500px]">
                            {chapter.videoUrl}
                          </a>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
