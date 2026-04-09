// components/ThoughtList.js
"use client";

import { useState } from "react";

export default function ThoughtList({ thoughts = [], loading = false, error = null }) {
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 10;

    if (loading) return <p>Loading thoughts...</p>;
    if (error) return <p className="text-red-500">{error}</p>;
    if (!thoughts.length)
        return (
            <div className="border-[5px] border-[#06064d] bg-[#c8efbb]">
                <div className="bg-[#06064d] px-4 py-4">
                    <h2 className="text-[#c8efbb] text-2xl sm:text-3xl font-bold">Nothing yet</h2>
                </div>
                <div className="px-4 py-5 text-[#222] text-base sm:text-xl leading-relaxed">
                    No thoughts have been posted yet.
                </div>
            </div>
        );

    // Pagination calculations
    const totalPages = Math.ceil(thoughts.length / postsPerPage);
    const startIndex = (currentPage - 1) * postsPerPage;
    const currentThoughts = thoughts.slice(startIndex, startIndex + postsPerPage);

    return (
        <div className="space-y-6">

            {/* Pagination controls above the thoughts */}
            {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mb-4">
                    <span className="px-4 py-2 border rounded bg-[#c8efbb] text-[#06064d] flex items-center justify-center">
                        Current page
                    </span>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`px-4 py-2 border rounded ${currentPage === page
                                ? "bg-[#06064d] text-[#c8efbb] cursor-default"
                                : "bg-white text-[#06064d] hover:bg-[#0b82c4] hover:text-white"
                                }`}
                            disabled={currentPage === page}>
                            {page}
                        </button>
                    ))}
                </div>
            )}
            {/* End Pagination */}

            {currentThoughts.map((thought) => {
                const createdAt = new Date(thought.createdAt);

                // Format date and time in user's local timezone
                const formattedDate = createdAt.toLocaleDateString(undefined, {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                });
                const formattedTime = createdAt.toLocaleTimeString(undefined, {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true, // Optional: show AM/PM
                });

                return (
                    <article
                        key={thought.id}
                        className="border-[5px] border-[#06064d] bg-[#c8efbb]">
                        <div className="bg-[#06064d] text-[#c8efbb] flex flex-col sm:flex-row justify-between items-start sm:items-center px-4 py-4 gap-4">
                            <h2 className="text-2xl sm:text-4xl font-bold leading-tight sm:max-w-[70%] break-words">
                                {thought.title}
                            </h2>
                            <div className="text-right text-sm sm:text-base leading-snug font-medium flex-shrink-0 mt-2 sm:mt-0">
                                <p>
                                    {thought.author} • {formattedDate} {formattedTime}
                                </p>
                            </div>
                        </div>

                        <div className="px-4 py-5 text-[#222] text-base sm:text-xl leading-relaxed max-w-3xl whitespace-pre-wrap break-words">
                            {thought.content}
                        </div>
                    </article>
                );
            })}

        </div>
    );
}