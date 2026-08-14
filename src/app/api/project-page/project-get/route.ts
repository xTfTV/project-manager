import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { RowDataPacket } from "mysql2";

interface ProjectRow extends RowDataPacket {
    project_id: number;
    project_name: string;
    priority_id: number;
    priority_name: string;
    project_status_id: number;
    project_status_name: string;
    project_created_date: string;
    project_due_date: string | null;
    comments: string | null;
    project_complete_date: string | null;
}

interface CountRow extends RowDataPacket {
    total: number;
}

export async function GET(request: Request) {
    try {

        const { searchParams } = new URL(request.url);

        const page = Number(searchParams.get("page")) || 1;

        const limit = 10;

        const offset = (page - 1) * limit;

        // Get the total number of active projects
        const [countRows] = await pool.query<CountRow[]>(`
                SELECT COUNT(*) AS total
                FROM Projects
                WHERE logical_cancel_value = 0
            `);
            
        const totalProjects = countRows[0].total;

        const totalPages = Math.ceil(totalProjects / limit);

        const [rows] = await pool.query<ProjectRow[]>(`
            SELECT
                p.project_id,
                p.project_name,
                p.priority_id,
                pr.priority_name,
                p.project_status_id,
                ps.project_status_name,
                p.project_created_date,
                p.project_due_date,
                p.comments,
                p.project_complete_date
            FROM Projects p
            INNER JOIN Priority pr
                ON p.priority_id = pr.priority_id
            INNER JOIN Project_Status ps
                ON p.project_status_id = ps.project_status_id
            WHERE p.logical_cancel_value = 0
            ORDER BY p.project_created_date DESC
            LIMIT ?
            OFFSET ?
        `, [limit, offset]);

        return NextResponse.json({
            projects: rows,
            currentPage: page,
            totalPages,
            totalProjects
        });
        
    } catch (error) {
        console.error("Error fetching the projects:", error);

        return NextResponse.json(
            { message: "Failed to retrieve projects" },
            { status: 500 }
        );
    }
}
