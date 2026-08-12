import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { getSession } from "@/lib/session";
import { ResultSetHeader } from "mysql2";

interface UpdateProjectBody {
    projectName: string;
    priorityId: number;
    projectStatusId: number;
    projectDueDate: string | null;
    comments: string | null;
}

export async function PATCH(
    request: Request,
    context: {
        params: Promise<{
            projectId: string;
        }>;
    }
) {
    try {
        const session = await getSession();

        if (!session) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        const { projectId } = await context.params;

        const id = Number(projectId);

        if (!id) {
            return NextResponse.json(
                { message: "Invalid project id" },
                { status: 400 }
            );
        }
        
        const body = (await request.json()) as UpdateProjectBody;

        const {
            projectName,
            priorityId,
            projectStatusId,
            projectDueDate,
            comments,
        } = body;

        // Ensuring that the required fields are still there during the update
        if (projectName?.trim()) {
            return NextResponse.json(
                { message: "Project Name is required and cannot be null" },
                { status: 400 }
            )
        }

        if (!priorityId) {
            return NextResponse.json(
                { message: "Project Priority is required and cannot be null" },
                { status: 400 }
            )
        }

        const [result] = await pool.execute<ResultSetHeader> (
            `
                UPDATE Projects
                SET
                    project_name = ?,
                    priority_id = ?,
                    project_status_id = ?,
                    project_due_date = ?,
                    comments = ?,
                WHERE project_id = ?
                    AND logical_cancel_value = 0
            `,
            [
                projectName.trim(),
                priorityId,
                projectStatusId,
                projectDueDate || null,
                comments?.trim() || null,
                id,
            ]
        );

        if (result.affectedRows === 0) {
            return NextResponse.json(
                { message: "Project not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: "Project updated successfully!" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error updating project:", error);

        return NextResponse.json(
            { message: "Failed to update project" },
            { status: 500 }
        );
    }
}
