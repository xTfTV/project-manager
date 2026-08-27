import { SignJWT, jwtVerify, JWTPayload } from "jose";
import { cookies } from 'next/headers';

function getSecret() {
    const secret = process.env.SESSION_SECRET;

    if (!secret) {
        throw new Error("SESSION_SECRET is not defined");
    }

    return new TextEncoder().encode(secret);

}
export interface SessionPayload extends JWTPayload {
    userId: number;
    email: string;
    roleId: number;
}

export async function createSessionToken (
    payload: SessionPayload
) : Promise<string> {
    return new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("1h")
        .sign(getSecret());
}

export async function verifySessionToken (
    token: string
) : Promise<SessionPayload | null> {
    try {
        const { payload } = await jwtVerify(token, getSecret());

        return {
            userId: Number(payload.userId),
            email: String(payload.email),
            roleId: Number(payload.roleId),
        };
    } catch {
        return null;
    }
}

// Reusable session reader

export async function getSession(): Promise<SessionPayload | null> {
    const cookieStore = await cookies();
    const token = cookieStore.get("session")?.value;

    if (!token) {
        return null;
    }
    
    return verifySessionToken(token);
}