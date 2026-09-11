import UserSearch from "./UserSearch";
import UserList from "./UserList";

export default function UsersPage() {
    return (
        <div className="min-h-screen p-10 bg-gray-50">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-3xl font-semibold mb-8">Users</h1>
                <UserSearch />
                <UserList />
            </div>
        </div>
    );
}