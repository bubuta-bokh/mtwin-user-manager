'use client';
import { useState } from "react";

export default function ChangePasswordForm() {
const [error, setError] = useState("");
const [newPassword, setNewPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");

const passwordMismatch = newPassword !== confirmPassword && confirmPassword.length > 0;
const passwordLengthNotValid = confirmPassword.length < 6 || newPassword.length < 6;

async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

if(newPassword !== confirmPassword) {
        setError("Новый пароль и подтверждение не совпадают");
        return;
    }

    const formData = new FormData(e.currentTarget);

    const res = await fetch("/api/change-password", {
        method: "POST",
        body: formData,
    });

    if(!res.ok) {
        setError("Failed to change password");
        return;
    }

    // Redirect or update UI on successful password change
    window.location.href = "/users";
}

return (
                
                <form className="bg-white p-8 rounded-xl shadow-md w-96" onSubmit={handleSubmit}>
                    <h1 className="text-2xl font-semibold mb-6 text-center">Изменение пароля</h1>
                    <input
                        name="oldPassword"
                        type="password"
                        placeholder="Старый пароль"
                        className="w-full p-3 mb-4 border rounded"
                        required
                    />
                    <input
                        name="newPassword"
                        type="password"
                        placeholder="Новый пароль"
                        className="w-full p-3 mb-4 border rounded"
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                    <input
                        name="confirmPassword"
                        type="password"
                        placeholder="Подтвердить новый пароль"
                        className="w-full p-3 mb-4 border rounded"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    {error && <p className="text-red-500 mb-4">{error}</p>}
                    
                    {passwordMismatch && (
                        <p className="text-red-500 mb-4">Новый пароль и подтверждение не совпадают.</p>
                    )}
                    {passwordLengthNotValid && (
                        <p className="text-red-500 mb-4">Новый пароль должен содержать не менее 6 символов.</p>
                    )}
                    {!passwordMismatch && !passwordLengthNotValid && <div className="mb-4" />}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition"
                    >
                        Изменить пароль
                    </button>
                </form>
            
);

}