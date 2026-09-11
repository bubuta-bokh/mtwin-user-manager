'use client'
import { useState } from "react";

export default function UserSearch() {
    const [query, setQuery] = useState("");

    return (
        <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">Search Users</h2>
            <input
                type="text"
                placeholder="Enter user name..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full p-3 mb-6 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
    );
}