import pool from '@/lib/db';
import { RowDataPacket } from 'mysql2';

export interface Priority extends RowDataPacket {
    priority_id: number;
    priority_name: string;
}

export async function getPriorities(): Promise<Priority[]> {
    const [rows] = await pool.query<Priority[]>(`
            SELECT priority_id, priority_name
            FROM Priority
            WHERE LCV = 0
            ORDER BY priority_id
        `);
    return rows;
}
