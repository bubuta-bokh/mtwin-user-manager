import { cookies } from "next/headers";

export interface SessionUser {
    userId: string;
    fullUserName: string;
    department: string;
    office: string;
}

function decodeJwtPayload(token: string): Record<string, any> | null {
    try {
        const payloadBase64 = token.split('.')[1];
        const json = Buffer.from(payloadBase64, 'base64').toString('utf-8');
        return JSON.parse(json);
    }
    catch (error) {
        console.error('Failed to decode JWT payload:', error);
        return null;
    }

}

export async function getSessionUser(): Promise<SessionUser | null> 
{
    const cookieStore = await cookies();
    const token = cookieStore.get('jwt')?.value;

    if (!token) {
        return null;
    }

    const payload = decodeJwtPayload(token);
    if(!payload?.userId) {
        return null;
    }
//console.log('!@!@!@payload is', payload);
    return {
        userId: payload.userId,
        fullUserName: payload.fullUserName,
        department: payload.department,
        office: payload.office
    };  
}