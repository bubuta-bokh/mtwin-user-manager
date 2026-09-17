'use client'

interface UserSearchProps {
    value: string;
    onChange: (value: string) => void;
}

export default function UserSearch({ value, onChange }: UserSearchProps) {

    return (
        <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">Найти пользователя</h2>
            <input
                type="text"
                placeholder="Введите имя пользователя..."
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full p-3 mb-6 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
    );
}