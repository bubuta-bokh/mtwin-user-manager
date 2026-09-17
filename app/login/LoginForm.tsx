'use client'

import { useState } from "react";

export default function LoginForm() {
    const [error, setError] = useState("");

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const res = await fetch("/api/login", {
            method: "POST",
            body: formData,
        });

        if (!res.ok) {
            setError("Invalid login or password");
        }

        console.log("Login successful");

        const data = await res.json();
        if (data.requiresPasswordChange) {
            //console.log("Password change required");
            window.location.href = "/change-password";
            return;
        }
        window.location.href = "/users";
    }

    return (
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-xl shadow-md w-96"
            >
                <h1 className="text-2xl font-semibold mb-6 text-center">Войти</h1>

                <input
                    name="login"
                    type="text"
                    placeholder="Логин"
                    className="w-full p-3 mb-4 border rounded"
                    required
                />

                <input
                    name="password"
                    type="password"
                    placeholder="Пароль"
                    className="w-full p-3 mb-4 border rounded"
                    required
                />

                {error && <p className="text-red-500 mb-4 ">{error}</p>}

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition"
                >
                    Авторизоваться
                </button>

            </form>
     );
}