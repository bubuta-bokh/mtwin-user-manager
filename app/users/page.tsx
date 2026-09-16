//'use client'

import UserSearch from "./UserSearch";
import UserList from "./UserList";
import { cookies } from "next/headers";
import { getAllUsers } from "@/app/api/users/route";
import { useToolbarTitle } from "@/components/ToolbarContext";

export default async function UsersPage() {
    //useToolbarTitle('Пользователи MtWin');
    const cookieStore = await cookies();
    const jwt = cookieStore.get('jwt')?.value;
    if (!jwt) {
        return (
            <div className="min-h-screen p-10 bg-gray-50">
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-3xl font-semibold mb-8">Пользователи MtWin</h1>
                    <p className="text-red-500">Вы не вошли в систему. Пожалуйста, войдите, чтобы просмотреть пользователей.</p>
                </div>
            </div>
        );
    }

    //const users = await getAllUsers(jwt);

    return (
        <div className="min-h-screen p-10 bg-gray-50">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-3xl font-semibold mb-8">Пользователи MtWin</h1>
                <UserSearch />
                <UserList />
            </div>
        </div>
    );
}