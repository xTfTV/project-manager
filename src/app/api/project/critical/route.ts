import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { getSession } from "@/lib/session";

export async function GET() {

    const session = await getSession();
    if (!session) {
        return NextResponse.json(
            { message: "Unauthorized" },
            { status: 401 }
        );
    }

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
                    AND p.created_by_user_id = ?
                ORDER BY project_due_date ASC
                LIMIT 3
            `, [session.userId]);

            return NextResponse.json(rows);
    } catch (error) {
        console.error("Error fetching critical projects:", error);

        return NextResponse.json(
            { message: "Failed to retrieve critical projects" },
            { status: 500 }
        );
    }
}