import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { getSession } from "@/lib/session";
import bcrypt from "bcrypt";
import { ResultSetHeader, RowDataPacket } from "mysql2";

interface CreateAccountBody {
    firstName: string;
    lastName: string;
    emailAddress: string;
    password: string;
    userRoleId: number;
}

interface ExistingUser extends RowDataPacket {
    user_id: number;
}

export async function POST(request: Request) {
    try {
        const session = await getSession();

        if (!session) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        if (session.roleId !== 1) {
            return NextResponse.json(
                { message: "Forbidden" },
                { status: 403 }
            );
        }

        const body = (await request.json()) as CreateAccountBody;

        const {
            firstName,
            lastName,
            emailAddress,
            password,
            userRoleId,
        } = body;

        // Making all fields required
        if (!firstName?.trim()) {
            return NextResponse.json(
                { message: "First name is required" },
                { status: 400 }
            );
        }

        if (!lastName?.trim()) {
            return NextResponse.json(
                { message: "Last name is required" },
                { status: 400 }
            );
        }

        if (!emailAddress?.trim()) {
            return NextResponse.json(
                { message: "Email address is required" },
                { status: 400 }
            );
        }

        if (!password) {
            return NextResponse.json(
                { message: "Password is required" },
                { status: 400 }
            );
        }

        if (!userRoleId) {
            return NextResponse.json(
                { message: "User role is required" },
                { status: 400 }
            );
        }

        // Check and make sure that there are no email duplicates
        const [existingUser] = await pool.execute<ExistingUser[]>(
            `
                SELECT user_id
                FROM user_info
                WHERE email_address = ?
                    AND logical_cancel_value = 0
            `,
            [emailAddress.trim()]
        );

        if (existingUser.length > 0) {
            return NextResponse.json(
                { message: "An account already exists with this email" },
                { status: 409 }
            );
        }

        // Hash the password for increased security
        const passwordHash = await bcrypt.hash(password, 10);

        await pool.execute<ResultSetHeader>(
            `
                INSERT INTO usre_info (
                    first_name,
                    last_name,
                    email_address,
                    password_hash,
                    user_role_id,
                    logical_cancel_value
                )
                VALUES (?,?,?,?,?,0)
            `,
            [
                firstName.trim(),
                lastName.trim(),
                emailAddress.trim().toLowerCase(),
                passwordHash,
                userRoleId,
            ]
        );

        return NextResponse.json(
            { message: "Account created successfully" },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error creating account:", error);

        return NextResponse.json(
            { message: "Failed to create the account" },
            { status: 500 }
        );
    }
}
