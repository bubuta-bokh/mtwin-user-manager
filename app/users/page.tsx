import UsersTable from "./UsersTable";
import { cookies } from "next/headers";
import { getAllUsers } from "@/app/api/users/route";
import { User } from "./types";

export default async function UsersPage() {
    
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

    const rawUsers = await getAllUsers(jwt);
    
    const users: User[] = rawUsers.map((u: any) => ({
        userId: u.userId ?? u.email ?? u.login,
        fullUserName: (u.fullUserName ?? `${u.firstName ?? ""} ${u.lastName ?? ""}`.trim()) || "Unknow user", 
        lastName: u.lastName,
        firstName: u.firstName,
        patronymic: u.patronymic,
        department: u.department,
        passport: u.passport,
        gender: u.gender,
        office: u.officeLocation,
        isAdmin: false,
        hasPermanentPassword: u.hasPermanentPassword ?? false,
        companyId: u.companyId ?? 0
    }));
//console.log('simple_users=',users);

    return (
        <div className="min-h-screen p-10 bg-gray-50">
            <div className="max-w-4xl mx-auto">
                {/* <h1 className="text-3xl font-semibold mb-8">Пользователи MtWin</h1> */}
                <UsersTable initialUsers={users}></UsersTable>
            </div>
        </div>
    );
}