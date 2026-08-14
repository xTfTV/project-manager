import pool from "@/lib/db";
import { RowDataPacket } from "mysql2";

export interface ProjectStatus extends RowDataPacket {
    project_status_id: number,
    project_status_name: string,
}

export async function getProjectStatuses(): Promise<ProjectStatus[]> {
    const [rows] = await pool.query<ProjectStatus[]>(`
            SELECT
                project_status_id,
                project_status_name
            FROM Project_Status
            WHERE LCV = 0
            ORDER BY project_status_id
        `);
    return rows;
}
