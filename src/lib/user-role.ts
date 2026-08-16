import pool from "@/lib/db";
import { RowDataPacket } from "mysql2"

export interface UserRole extends RowDataPacket {
    user_role_id: number;
    role_name: string;
}

export async function getUserRoles(): Promise<UserRole[]> {
    const [rows] = await pool.query<UserRole[]>(`
            SELECT
                user_role_id,
                role_name
            FROM user_role
            WHERE LCV = 0
            ORDER BY user_role_id
        `);
    return rows;
}
