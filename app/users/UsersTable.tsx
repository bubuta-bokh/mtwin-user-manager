'use client'

import { useMemo, useState } from "react";
import UserSearch from "./UserSearch";
import UserList from "./UserList";
import {User} from "./types";
import { useToolbarTitle } from "@/components/ToolbarContext";

interface UserTableProps {
    initialUsers: User[];
}

export default function UsersTable({initialUsers}: UserTableProps)
{
    useToolbarTitle('Пользователи MtWin');
    const [query, setQuery] = useState("");
    const filteredUsers = useMemo(() => {
        const q = query.trim().toLowerCase();
        if(!q) return initialUsers;
        return initialUsers.filter((u) => u.fullUserName.toLowerCase().includes(q) || u.userId.toLowerCase().includes(q));
    },[initialUsers, query]);

    return (
        <>
        <UserSearch value={query} onChange={setQuery}></UserSearch>
        <UserList users={filteredUsers}></UserList>
        </>
    );
}
