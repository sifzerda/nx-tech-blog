// components/ThoughtForm.js
"use client";

import { useState } from "react";

export default function ThoughtForm({ onAddThought }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!title.trim() || !content.trim()) return;

    const newThought = {
      title,
      content,
      author: "You",
      date: new Date().toLocaleDateString("en-AU", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    };

    onAddThought(newThought);

    setTitle("");
    setContent("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="border-[5px] border-[#06064d] bg-[#c8efbb] mb-8"
    >
      <div className="bg-[#06064d] px-4 py-4">
        <h2 className="text-[#c8efbb] text-2xl sm:text-3xl font-bold">
          What's on your mind?
        </h2>
      </div>

      <div className="p-4 space-y-4">
        <div>
          <label
            htmlFor="title"
            className="block text-[#06064d] font-bold text-lg mb-2"
          >
            Title
          </label>
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
          <label
            htmlFor="content"
            className="block text-[#06064d] font-bold text-lg mb-2"
          >
            Thought
          </label>
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
          className="bg-[#06064d] text-[#c8efbb] px-6 py-3 font-bold text-lg border-[3px] border-[#06064d] hover:bg-[#0b82c4] hover:text-white transition cursor-pointer"
        >
          Add Thought
        </button>
      </div>
    </form>
  );
}