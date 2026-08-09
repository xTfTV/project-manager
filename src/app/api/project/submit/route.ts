import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { getSession } from "@/lib/session";
import { ResultSetHeader } from "mysql2";

export async function POST(request: Request) {
    try {
        const session = await getSession();

        if (!session) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }
        const body = await request.json();

        const { 
            projectName, 
            priorityId,
            projectDueDate,
            comments
        } = body;

        // Required fields
        if (!projectName?.trim()) {
            return NextResponse.json(
                { message: "Project name is required" },
                { status: 401 }
            );
        }

        if (!priorityId) {
            return NextResponse.json(
                { message: "Priority is required" },
                { status: 401 }
            );
        }

        const [result] = await pool.execute<ResultSetHeader>(
            `
                INSERT INTO Projects
                (
                    project_name,
                    priority_id,
                    project_status_id,
                    project_due_date,
                    comments,
                    created_by_user_id,
                    logical_cancel_value,
                    project_complete_date
                )
                VALUES (?,?,1,?,?,?,0,NULL)
            `,
            [
                projectName.trim(),
                priorityId,
                projectDueDate || null,
                comments?.trim() || null,
                session.userId
            ]
        );
        return NextResponse.json(
            {
                message: "Project Created Successfully",
                projectId: result.insertId
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error Creating Project:", error);

        return NextResponse.json(
            { message: "Failed to create project" },
            { status: 500 }
        );
    }
}
