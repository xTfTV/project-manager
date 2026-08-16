import { NextResponse } from "next/server";
import pool from '@/lib/db';
import { RowDataPacket } from "mysql2";
import { getSession } from "@/lib/session";

interface ProjectDueRow extends RowDataPacket {
    project_id: number;
    project_name: string;
    project_due_date: string;
    priority_name: string;
}

export async function GET() {

    const session = await getSession();
    if (!session) {
        return NextResponse.json(
            { message: "Unauthorized" },
            { status: 401 }
        )
    }

    try {
        const [rows] = await pool.query<ProjectDueRow[]>(`
            SELECT
                p.project_id,
                p.project_name,
                p.project_due_date,
                pr.priority_name
            FROM Projects p
            INNER JOIN Priority pr
                ON p.priority_id = pr.priority_id
            WHERE p.logical_cancel_value = 0
                AND p.project_due_date IS NOT NULL
                AND DATE(p.project_due_date) >= CURDATE()
                AND p.created_by_user_id = ?
            ORDER BY p.project_due_date ASC
            LIMIT 3
        `, [session.userId]);
        return NextResponse.json(rows);
    } catch (error) {
        console.error("Error fetching projects due:", error);

        return NextResponse.json(
            { message: "Failed to retrieve projects due" },
            { status: 500 }
        );
    }
}
