import { cookies } from 'next/headers';

export async function POST(req: Request) {
    const form = await req.formData();
    const login = form.get('login');
    const password = form.get('password');

    const isValid = login === 'admin' && password === 'admin';
    if (!isValid) {
        return new Response('Invalid login or password', { status: 401 });
    }
    const cookieStore = await cookies();
    cookieStore.set('auth', 'mock', { httpOnly: true, secure: false, path: '/' });

    return new Response('OK');

}