// components/ThoughtForm.js
"use client";

import { useEffect, useState } from "react";

function decodeJWT(token) {
    try {
        const payload = token.split(".")[1];
        const decoded = JSON.parse(atob(payload));
        return decoded;
    } catch (err) {
        console.error("Failed to decode JWT:", err);
        return null;
    }
}

export default function ThoughtForm({ onAddThought }) {
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) return;
        const decoded = decodeJWT(token);
        if (decoded) setUser(decoded);
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();
        if (!title.trim() || !content.trim()) return;

        try {
            setLoading(true);
            const token = localStorage.getItem("token");
            console.log("Submitting with token:", token);

            const response = await fetch("/api/thoughts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ title, content }),
            });

            const data = await response.json();
            console.log("Response data:", data);

            if (!response.ok) throw new Error(data.error || "Failed to create thought");

            const newThought = {
                ...data, // keep id, title, content, user, createdAt
                author: data.user?.username || "Anonymous",
            };
            
            onAddThought?.(newThought);
            setTitle("");
            setContent("");
        } catch (err) {
            console.error("handleSubmit error:", err);
            alert(err.message);
        } finally {
            setLoading(false);
        }
    }

    if (!user) {
        return (
            <div className="border-[5px] border-[#06064d] bg-[#c8efbb] mb-8">
                <div className="bg-[#06064d] px-4 py-4">
                    <h2 className="text-[#c8efbb] text-2xl sm:text-3xl font-bold">
                        Please log in
                    </h2>
                </div>
                <div className="p-4 text-[#222] text-lg">Please log in to leave a thought.</div>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="border-[5px] border-[#06064d] bg-[#c8efbb] mb-8">
            <div className="bg-[#06064d] px-4 py-4">
                <h2 className="text-[#c8efbb] text-2xl sm:text-3xl font-bold">What's on your mind?</h2>
            </div>
            <div className="p-4 space-y-4">
                <div>
                    <label htmlFor="title" className="block text-[#06064d] font-bold text-lg mb-2">Title</label>
                    <input
                        id="title"
                        type="text"
                        placeholder="Enter a title..."
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full border-[3px] border-[#06064d] px-4 py-3 bg-white text-[#222] outline-none focus:border-[#0b82c4]"
                    />
                </div>
                <div>
                    <label htmlFor="content" className="block text-[#06064d] font-bold text-lg mb-2">Thought</label>
                    <textarea
                        id="content"
                        rows="5"
                        placeholder="Write your thought..."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="w-full border-[3px] border-[#06064d] px-4 py-3 bg-white text-[#222] outline-none resize-none focus:border-[#0b82c4]"
                    />
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-[#06064d] text-[#c8efbb] px-6 py-3 font-bold text-lg border-[3px] border-[#06064d] hover:bg-[#0b82c4] hover:text-white transition cursor-pointer disabled:opacity-50"
                >
                    {loading ? "Posting..." : "Add Thought"}
                </button>
            </div>
        </form>
    );
}