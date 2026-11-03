import React from "react";
import type { Metadata } from "next";
import { getPublishedBlogs } from "@/lib/actions/blogs";
import BlogListClient from "./BlogListClient";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Blog & Digital Marketing Guides | Digital Ghuru",
  description:
    "Explore actionable digital marketing playbooks, SEO strategies, generative AI tutorials, and career roadmaps from industry mentors at Digital Ghuru.",
  alternates: {
    canonical: "https://digitalghuru.com/blog",
  },
  openGraph: {
    title: "Blog & Digital Marketing Guides | Digital Ghuru",
    description:
      "Explore actionable digital marketing playbooks, SEO strategies, generative AI tutorials, and career roadmaps from industry mentors at Digital Ghuru.",
    url: "https://digitalghuru.com/blog",
    siteName: "Digital Ghuru",
    type: "website",
  },
};

export default async function BlogIndexPage() {
  const blogs = await getPublishedBlogs();
  return <BlogListClient initialBlogs={blogs} />;
}
