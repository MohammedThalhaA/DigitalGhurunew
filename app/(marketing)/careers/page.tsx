import React from "react";
import pool from "@/lib/db";
import CareersClient from "./CareersClient";

import type { Metadata } from "next";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Careers & Open Positions",
  description:
    "Explore career opportunities, digital marketing trainer roles, and staff positions at Digital Ghuru institute and agency.",
};

export default async function CareersPage() {
  const res = await pool.query(`SELECT * FROM careers WHERE "isActive" = true ORDER BY "createdAt" DESC`);
  const jobs = res.rows;

  return <CareersClient jobs={jobs} />;
}
