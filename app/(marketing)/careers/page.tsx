import React from "react";
import pool from "@/lib/db";
import CareersClient from "./CareersClient";

export const dynamic = "force-dynamic";

export default async function CareersPage() {
  const res = await pool.query(`SELECT * FROM careers WHERE "isActive" = true ORDER BY "createdAt" DESC`);
  const jobs = res.rows;

  return <CareersClient jobs={jobs} />;
}
