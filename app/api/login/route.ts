import { cookies } from 'next/headers';

export async function POST(req: Request) {
    const form = await req.formData();
    const login = form.get('login');
    const password = form.get('password');

    console.log('Username:', login, 'Password:', password);
    const res = await fetch(`${process.env.NEXT_PUBLIC_USERSERVICE_URL}/api/User/login`, {
        method: 'POST',
        body: JSON.stringify({ Username: login, Password: password }),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    console.log('Login response is', res);
    if (!res.ok) {
        return new Response('Invalid login or password', { status: 401 });
    }
    else {
        console.log('Login successful');
        const cookieStore = await cookies();
        const data: { requiresPasswordChange: boolean, token?: string, refreshToken?: string } = await res.json();
        if (data.requiresPasswordChange) {

            cookieStore.set('pending_username', login as string, { httpOnly: true, secure: false, path: '/', maxAge: 60 * 5 });
            return new Response(JSON.stringify({ requiresPasswordChange: true }), { status: 200, headers: { 'Content-Type': 'application/json' } });
        }

        cookieStore.set('jwt', data.token!, { httpOnly: true, secure: false, path: '/' });
        return new Response(JSON.stringify({ requiresPasswordChange: false }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    }
}