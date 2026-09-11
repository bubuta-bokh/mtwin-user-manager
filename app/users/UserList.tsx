import Link from "next/link";

const mockUsers = [
    { id: 1, name: "Alice Johnson", email: "alice@example.com" },
    { id: 2, name: "Jane Smith", email: "jane@example.com" },
    { id: 3, name: "Bob Johnson", email: "bob@example.com" },
];

export default function UserList() {
    return (
        <div className="space-y-4 p-4">
            {mockUsers.map((user) => (
                <Link
                    key={user.id}
                    href={`/users/${user.id}`}
                    className="block p-4 bg-white rounded-lg shadow hover:bg-gray-100 transition"
                >
                    <p className="text-lg font-medium">{user.name}</p>
                    <p className="text-gray-600">{user.email}</p>
                </Link>

            ))}
        </div>
    );
}