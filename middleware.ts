import { NextRequest, NextResponse } from "next/server";

const REFRESH_BUFFER_SECONDS = 60;

interface JwtPayload {
    exp?: number;
    [key: string]: unknown;
}

function decodeJwtPayload(token: string): JwtPayload | null {
    try {
        const payload = token.split(".")[1];
        const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
        const padded = base64 + "=".repeat((4 - (base64.length % 4)) % 4);
        return JSON.parse(atob(padded));
    }
    catch {
        return null;
    }
}

function isExpiredOrExpiringSoon(jwt: string): boolean {
    const payload = decodeJwtPayload(jwt);
    if (!payload?.exp) return true;
    const nowSeconds = Date.now() / 1000;
    return payload.exp - nowSeconds < REFRESH_BUFFER_SECONDS;
}

async function refreshTokens(refreshToken: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_USERSERVICE_URL}/api/User/refresh`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ RefreshToken: refreshToken }),
    })
    if (!res.ok) return null;
    const data: { token: string; refreshToken: string } = await res.json();
    return data;
}

export async function middleware(request: NextRequest) {
    const jwt = request.cookies.get("jwt")?.value;
    const refreshToken = request.cookies.get("refreshToken")?.value;

    if (!jwt) return NextResponse.redirect(new URL("/login", request.url));

    if (!isExpiredOrExpiringSoon(jwt)) return NextResponse.next();

    if (!refreshToken) {
        const response = NextResponse.redirect(new URL("/login", request.url));
        response.cookies.delete("jwt");
        return response;
    }

    const refreshed = await refreshTokens(refreshToken);

    if (!refreshed) {
        const response = NextResponse.redirect(new URL("/login", request.url));
        response.cookies.delete("jwt");
        response.cookies.delete("refreshToken");
        return response;
    }

    request.cookies.set("jwt", refreshed.token);
    request.cookies.set("refreshToken", refreshed.refreshToken);

    const response = NextResponse.next({ request });

    response.cookies.set("jwt", refreshed.token, { httpOnly: true, secure: false, path: "/" });
    response.cookies.set("refreshToken", refreshed.token, { httpOnly: true, secure: false, path: "/" });

    return response;
}

export const config = { matcher: ["users/:path*"], }