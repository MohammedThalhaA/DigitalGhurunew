import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getPublishedBlogs } from "@/lib/actions/blogs";
import StudentBlogListClient from "@/components/student/blog/StudentBlogListClient";

export const dynamic = "force-dynamic";

export default async function StudentBlogPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return null;
  }

  const blogs = await getPublishedBlogs();
  return <StudentBlogListClient initialBlogs={blogs || []} />;
}
