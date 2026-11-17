import React from "react";
import pool from "@/lib/db";
import CareersClient from "./CareersClient";

import type { Metadata } from "next";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Careers & Open Positions",
  description: "Explore career opportunities, digital marketing trainer roles, and staff positions at Digital Ghuru institute and agency.",
  alternates: {
    canonical: "https://digitalghuru.com/careers",
  },
  openGraph: {
    title: "Careers & Open Positions | Digital Ghuru",
    description: "Explore career opportunities, digital marketing trainer roles, and staff positions at Digital Ghuru institute and agency.",
    url: "https://digitalghuru.com/careers",
    siteName: "Digital Ghuru",
    type: "website",
    images: [
      {
        url: "https://digitalghuru.com/images/Hero Image.webp",
        width: 1200,
        height: 630,
        alt: "Careers & Open Positions - Digital Ghuru",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Careers & Open Positions | Digital Ghuru",
    description: "Explore career opportunities, digital marketing trainer roles, and staff positions at Digital Ghuru institute and agency.",
    images: ["https://digitalghuru.com/images/Hero Image.webp"],
  },
};

export default async function CareersPage() {
  let jobs: any[] = [];
  try {
    const res = await pool.query(`SELECT * FROM careers WHERE "isActive" = true ORDER BY "createdAt" DESC`);
    jobs = res.rows;
  } catch (e) {
    console.error("CareersPage DB error:", e);
  }

  return <CareersClient jobs={jobs} />;
}
