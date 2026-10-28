const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";
console.log("[api.js] API_URL =", API_URL);  

export async function predictEmotion(file) {
    const form = new FormData();
    form.append("file", file);
    const res = await fetch(`${API_URL}/predict`, { method: "POST", body: form });
    if (!res.ok) {
        let detail = `Request failed (${res.status})`;
        try {
            const err = await res.json();
            detail = err.detail || detail;
        } catch { /* keep default message */ }
        throw new Error(detail);
    }
    return res.json();
}

export async function fetchHistory() {
    const res = await fetch(`${API_URL}/predictions`);
    if (!res.ok) throw new Error("Could not load prediction history.");
    return res.json();
}