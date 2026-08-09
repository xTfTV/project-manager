import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET() {
    try {
        const [rows] = await pool.query(`
                SELECT
                    project_id,
                    project_name,
                    project_due_date
                FROM Projects
                WHERE priority_id = 3
                    AND logical_cancel_value = 0
                    AND project_due_date >= NOW()
                ORDER BY project_due_date ASC
                LIMIT 3
            `);

            return NextResponse.json(rows);
    } catch (error) {
        console.error("Error fetching critical projects:", error);

        return NextResponse.json(
            { message: "Failed to retrieve critical projects" },
            { status: 500 }
        );
    }
}