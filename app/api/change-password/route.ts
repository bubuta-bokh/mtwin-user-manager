import {cookies} from "next/headers";

export async function POST(req: Request) {
    const form = await req.formData();
    const oldPassword = form.get('oldPassword');
    const newPassword = form.get('newPassword');
    
    const cookieStore = await cookies();

    const username = cookieStore.get('pending_username')?.value;
    if(!username) {
        return new Response('Session expired, please log in again', { status: 401 });
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_USERSERVICE_URL}/api/User/makePermanentPassword`, {
        method: 'POST',
        body: JSON.stringify({ Username: username, TempPassword: oldPassword, NewPassword: newPassword }),
        headers: {
            'Content-Type': 'application/json'
        },
    });

    if (!res.ok) {
        return new Response('Failed to change password', { status: 400 });
    }

    const {jwt, refreshToken} = await res.json();
    cookieStore.set('jwt', jwt, { httpOnly: true, secure: false, path: '/' });
    cookieStore.set('refreshToken', refreshToken, { httpOnly: true, secure: false, path: '/' });
    cookieStore.delete('pending_username');
    
    return new Response('Ok');
}