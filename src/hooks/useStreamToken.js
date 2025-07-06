export async function TokenProvider() {
    const response = await fetch("/api/video/token", { cache: "no-store" });

    const data = await response.json().catch(() => ({}));   

    if (!response.ok) {
        throw new Error(data.error || "Failed to fetch Stream token");
    }

    if (!data.token) {
        throw new Error("No token returned from /api/video/token");
    }

    return data.token;
}