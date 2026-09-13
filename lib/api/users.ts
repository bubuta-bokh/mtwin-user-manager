export async function getAllUsers(jwt: string) {
    const base = process.env.NEXT_PUBLIC_USERSERVICE_URL;
    const res = await fetch(`${base}/api/User`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`
        },
        cache: 'no-store'
    });

    if (!res.ok) {
        throw new Error('Не удалось получить список пользователей');
    }

    return res.json();
}