import Link from "next/link";
import { User } from "./types";
import UserAvatar from "./UserAvatar";

interface UserListProps {
    users: User[]
}

export default function UserList({ users }: UserListProps) {
    if (users.length == 0) { return (<p className="p-4 text-gray-500">Пользователи не найдены</p>) }

    return (
        <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="w-full text-left">
                <thead className="bg-gray-100 border-b">
                    <tr>
                        <th className="px-4 py-3 font-medium text-gray-700">Имя</th>
                        <th className="px-4 py-3 font-medium text-gray-700">Логин</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map((user) => (
                            <tr key={user.userId} className="border-b last:border-0 hover:bg-gray-50">
                                <td className="px-4 py-3">
                                    <Link href={`/users/${encodeURIComponent(user.userId)}`} className="text-blue-600 hover:underline">
                                    <UserAvatar firstName={user.firstName} lastName={user.lastName} seed={user.userId}></UserAvatar>
                                    <span className="ml-3">{user.fullUserName}</span>
                                    </Link> 
                                </td>
                                <td className="px-4 py-3 text-gray-600">{user.userId}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}