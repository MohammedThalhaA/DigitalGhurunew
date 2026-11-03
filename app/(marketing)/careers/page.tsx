import React from "react";
import pool from "@/lib/db";
import CareersClient from "./CareersClient";

import type { Metadata } from "next";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Careers & Open Positions",
  description:
    "Explore career opportunities, digital marketing trainer roles, and staff positions at Digital Ghuru institute and agency.",
  alternates: {
    canonical: "https://digitalghuru.com/careers",
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
