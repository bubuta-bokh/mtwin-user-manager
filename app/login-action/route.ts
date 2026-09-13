import { cookies } from 'next/headers';

export async function POST(req: Request) {
    const form = await req.formData();
    const login = form.get('login');
    const password = form.get('password');

    // const isValid = login === 'admin' && password === 'admin';
    // if (!isValid) {
    //     return new Response('Invalid login or password', { status: 401 });
    // }
    const res = await fetch(`${process.env.NEXT_PUBLIC_USERSERVICE_URL}/api/User/login`, {
        method: 'POST',
        body: JSON.stringify({ login, password }),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!res.ok) {
        return new Response('Invalid login or password', { status: 401 });
    }

    const { token } = await res.json();

    const cookieStore = await cookies();

    //cookieStore.set('auth', 'mock', { httpOnly: true, secure: false, path: '/' });
    cookieStore.set('jwt', token, { httpOnly: true, secure: false, path: '/' });

    return new Response('OK');

}