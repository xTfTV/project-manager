import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { getSession } from "@/lib/session";
import { ResultSetHeader, RowDataPacket } from "mysql2";

interface StatusRow extends RowDataPacket {
    project_status_name: string;
}

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
        if (!projectName?.trim()) {
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

        const [statusRow] = await pool.execute<StatusRow[]>(
            `
                SELECT project_status_name
                FROM Project_Status
                WHERE project_status_id = ?
                    AND LCV = 0
            `,
            [projectStatusId]
        );

        if (statusRow.length === 0) {
            return NextResponse.json(
                { message: "Invalid project status" },
                { status: 400 }
            );
        }

        const isCompleted = statusRow[0].project_status_name.toLowerCase() === "completed";
        const isCancelled = statusRow[0].project_status_name.toLowerCase() === "cancelled";

        const [result] = await pool.execute<ResultSetHeader> (
            `
                UPDATE Projects
                SET
                    project_name = ?,
                    priority_id = ?,
                    project_status_id = ?,
                    project_due_date = ?,
                    comments = ?,
                    project_complete_date = 
                        CASE
                            WHEN ? = 1 AND project_complete_date IS NULL
                                 THEN CURRENT_TIMESTAMP
                            WHEN ? = 0
                                THEN NULL
                            ELSE project_complete_date
                        END,
                    logical_cancel_value = 
                        CASE
                            WHEN ? = 1 THEN 1
                            ELSE logical_cancel_value
                        END
                WHERE project_id = ?
                    AND logical_cancel_value = 0
            `,
            [
                projectName.trim(),
                priorityId,
                projectStatusId,
                projectDueDate || null,
                comments?.trim() || null,
                isCompleted ? 1 : 0,
                isCompleted ? 1 : 0,
                isCancelled ? 1 : 0,
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
