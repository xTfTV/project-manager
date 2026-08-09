import { NextResponse } from "next/server";
import pool from '@/lib/db';
import { RowDataPacket } from "mysql2";

interface DueSoonRow extends RowDataPacket {
    due_today: number;
    due_this_week: number;
    due_this_month: number;
    due_this_year: number;
}

export async function GET() {
    try {
        const [rows] = await pool.query<DueSoonRow[]>(`
                SELECT 
                    SUM(
                        DATE(project_due_date) = CURDATE()
                    ) AS due_today,

                    SUM (
                        YEARWEEK(project_due_date, 1) = YEARWEEK(NOW(), 1)
                        AND DATE(project_due_date) >= CURDATE()
                    ) AS due_this_week,

                    SUM (
                        YEAR(project_due_date) = YEAR(CURDATE())
                        AND MONTH(project_due_date) = MONTH(CURDATE())
                        AND DATE(project_due_date) >= CURDATE()
                    ) AS due_this_month,

                    SUM (
                        YEAR(project_due_date) = YEAR(CURDATE())
                        AND DATE(project_due_date) >= CURDATE()
                    ) AS due_this_year
                    
                FROM Projects

                WHERE logical_cancel_value = 0
                    AND project_due_date IS NOT NULL
            `);
            return NextResponse.json(rows[0]);
    } catch (error) {
        console.error("Error fetching due soon projects:", error);

        return NextResponse.json(
            { message: "Failed to retrieve due soon projects" },
            { status: 500 }
        );
    }
}
