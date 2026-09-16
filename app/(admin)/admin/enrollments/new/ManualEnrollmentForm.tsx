"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, UserCircle, BookOpen, IndianRupee, CheckCircle2, Sparkles } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Button from "@/components/ui/Button";
import { createEnrollment } from "../actions";
import { motion } from "framer-motion";

// Helper to get initials
function getInitials(name: string) {
  if (!name) return "U";
  return name.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase();
}

interface User {
  id: number;
  name: string;
  email: string;
  image?: string | null;
}

interface Course {
  id: number;
  title: string;
  price: string;
  imageUrl?: string | null;
}

interface ManualEnrollmentFormProps {
  users: User[];
  courses: Course[];
}

export default function ManualEnrollmentForm({ users, courses }: ManualEnrollmentFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // State to hold selected IDs instead of using native select fields
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    u.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (!selectedUserId || !selectedCourseId) {
      setError("Please select both a student and a course.");
      setIsLoading(false);
      return;
    }

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
    <form onSubmit={handleSubmit} className="space-y-10">
      {/* Hidden inputs to bridge React state with standard FormData submission */}
      <input type="hidden" name="userId" value={selectedUserId || ""} required />
      <input type="hidden" name="courseId" value={selectedCourseId || ""} required />

      {error && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl text-sm font-bold flex items-center gap-2"
        >
          {error}
        </motion.div>
      )}

      {/* Student Selection */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-bold text-ink-900">Select Student</h3>
          <p className="text-sm text-ink-500">Choose the student who will receive access.</p>
        </div>

        <div className="relative">
          <input 
            type="text"
            placeholder="Search students by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-ink-200 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all bg-white mb-4"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
          {filteredUsers.length === 0 && (
            <p className="text-ink-400 text-sm italic col-span-full">No students found matching your search.</p>
          )}
          {filteredUsers.map((user) => {
            const isSelected = selectedUserId === user.id;
            return (
              <motion.div
                key={user.id}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => setSelectedUserId(user.id)}
                className={`cursor-pointer p-4 rounded-xl border-2 transition-all duration-200 flex items-start gap-4 ${
                  isSelected 
                    ? "border-brand-blue bg-blue-50/50 shadow-sm" 
                    : "border-ink-100 bg-white hover:border-ink-200 hover:shadow-sm"
                }`}
              >
                <div className={`relative h-12 w-12 rounded-full overflow-hidden flex-shrink-0 ${isSelected ? "ring-2 ring-brand-blue ring-offset-2" : "border border-ink-200"}`}>
                  {user.image ? (
                    <Image src={user.image} alt={user.name} fill className="object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-bold text-sm tracking-wider shadow-inner">
                      {getInitials(user.name)}
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`font-bold truncate ${isSelected ? "text-brand-blue" : "text-ink-900"}`}>
                    {user.name}
                  </p>
                  <p className="text-xs text-ink-500 truncate">{user.email}</p>
                </div>
                {isSelected && (
                  <CheckCircle2 className="h-5 w-5 text-brand-blue flex-shrink-0" />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Course Selection */}
      <div className="space-y-4 pt-6 border-t border-ink-100">
        <div>
          <h3 className="text-lg font-bold text-ink-900">Select Course</h3>
          <p className="text-sm text-ink-500">Which course should they be enrolled in?</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {courses.map((course) => {
            const isSelected = selectedCourseId === course.id;
            return (
              <motion.div
                key={course.id}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedCourseId(course.id)}
                className={`cursor-pointer p-5 rounded-2xl border-2 transition-all duration-200 relative overflow-hidden ${
                  isSelected 
                    ? "border-brand-orange bg-orange-50/30 shadow-md" 
                    : "border-ink-100 bg-white hover:border-ink-200 hover:shadow-md"
                }`}
              >
                {/* Background decorative blob */}
                {isSelected && (
                  <div className="absolute -right-4 -top-4 w-20 h-20 bg-brand-orange/10 rounded-full blur-xl pointer-events-none" />
                )}
                
                <div className="flex items-start justify-between gap-4 relative z-10">
                  <div className={`relative h-12 w-16 rounded-xl overflow-hidden flex-shrink-0 ${isSelected ? "ring-2 ring-brand-orange ring-offset-2" : "border border-ink-200"}`}>
                    {course.imageUrl ? (
                      <Image src={course.imageUrl} alt={course.title} fill className="object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 relative">
                        {/* Background Grid Pattern */}
                        <div
                          className="absolute inset-0 opacity-20 pointer-events-none"
                          style={{
                            backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.4) 1px, transparent 0)",
                            backgroundSize: "6px 6px"
                          }}
                        />
                        <Sparkles className="w-5 h-5 text-brand-orange relative z-10" />
                      </div>
                    )}
                  </div>
                  {isSelected && (
                    <div className="bg-brand-orange text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full">
                      Selected
                    </div>
                  )}
                </div>
                
                <div className="mt-4 relative z-10">
                  <h4 className={`font-bold leading-tight ${isSelected ? "text-ink-900" : "text-ink-700"}`}>
                    {course.title}
                  </h4>
                  <p className="mt-1 text-sm font-medium text-ink-400 flex items-center gap-1">
                    Value: ₹{parseFloat(course.price).toLocaleString()}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Price Input */}
      <div className="space-y-4 pt-6 border-t border-ink-100">
        <div>
          <h3 className="text-lg font-bold text-ink-900">Price Details</h3>
          <p className="text-sm text-ink-500">Record the amount paid for this enrollment.</p>
        </div>
        
        <div className="max-w-md">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <IndianRupee className="h-5 w-5 text-ink-400" />
            </div>
            <input
              id="pricePaid"
              name="pricePaid"
              type="number"
              min="0"
              step="0.01"
              defaultValue="0"
              required
              className="w-full pl-12 pr-4 py-4 rounded-xl border border-ink-200 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all font-bold text-lg text-ink-900 bg-white shadow-sm"
            />
          </div>
          <p className="mt-2 text-xs font-medium text-ink-400 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-orange"></span>
            Enter 0 if this is a free grant or offline payment already accounted for.
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="pt-8 flex items-center justify-end gap-4">
        <Link
          href="/admin/enrollments"
          className="px-6 py-3 rounded-xl font-bold text-ink-600 hover:bg-ink-100 transition-colors"
        >
          Cancel
        </Link>
        <Button variant="primary" type="submit" className="min-w-[180px] shadow-lg" disabled={isLoading || !selectedUserId || !selectedCourseId}>
          {isLoading ? (
            <Loader2 className="h-5 w-5 animate-spin mx-auto" />
          ) : (
            "Grant Access Now"
          )}
        </Button>
      </div>
    </form>
  );
}
