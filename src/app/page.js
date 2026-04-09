"use client";

import ThoughtForm from "../components/ThoughtForm";
import ThoughtList from "../components/ThoughtList";
import { useState, useEffect } from "react";

export default function HomePage() {
  const [thoughts, setThoughts] = useState([]);

  useEffect(() => {
    async function fetchThoughts() {
      try {
        const res = await fetch("/api/thoughts");
        const data = await res.json();
        const mapped = data.map((t) => ({
          ...t,
          author: t.user?.username || "Anonymous",
          date: t.createdAt,
        }));
        setThoughts(mapped);
      } catch (err) {
        console.error(err);
      }
    }
    fetchThoughts();
  }, []);

  const posts = [
    {
      title: "Why MVC is so important",
      author: "Amiko",
      date: "March 28, 2024",
      content:
        "MVC allows developers to maintain a true separation of concerns by keeping the Controller layer for application logic.",
    },
    {
      title: "Authentication vs. Authorization",
      author: "Amiko",
      date: "March 28, 2024",
      content:
        "Authentication and Authorization serve different purposes; one verifies identity, the other verifies permissions.",
    },
    {
      title: "Understanding State Management",
      author: "Amiko",
      date: "March 28, 2024",
      content:
        "State management is crucial in React apps to maintain consistency and prevent unnecessary re-renders.",
    },
    {
      title: "React Hooks Deep Dive",
      author: "Jordan",
      date: "April 1, 2024",
      content:
        "Hooks let you use state and other React features without writing a class component.",
    },
    {
      title: "Optimizing Web Performance",
      author: "Taylor",
      date: "April 2, 2024",
      content:
        "Learn strategies to reduce load times and improve user experience with modern performance optimization techniques.",
    },
    {
      title: "Tailwind CSS Tips and Tricks",
      author: "Amiko",
      date: "April 3, 2024",
      content:
        "Tailwind CSS can speed up your UI development — discover hidden features and shortcuts for rapid styling.",
    },
    {
      title: "Deploying Next.js Apps",
      author: "Jordan",
      date: "April 4, 2024",
      content:
        "Explore different deployment options for Next.js applications, including Vercel, Netlify, and custom server setups.",
    },
    {
      title: "Understanding API Routes",
      author: "Taylor",
      date: "April 5, 2024",
      content:
        "API routes in Next.js allow you to build backend endpoints directly in your app for full-stack functionality.",
    },
    {
      title: "JavaScript ES2024 Features",
      author: "Amiko",
      date: "April 6, 2024",
      content:
        "Stay up to date with the latest JavaScript features, from logical assignment operators to new Array methods.",
    },
    {
      title: "Writing Effective Unit Tests",
      author: "Jordan",
      date: "April 7, 2024",
      content:
        "Unit tests are essential for catching bugs early — learn best practices and tools for testing your React components.",
    },
  ];

  return (
    <main className="min-h-screen flex flex-col">
      <section className="flex-1 flex justify-center py-12 px-4">
        <div className="w-full max-w-4xl space-y-6">

          <ThoughtForm onAddThought={(newThought) => setThoughts((prevThoughts) => [newThought, ...prevThoughts])} />
          <ThoughtList thoughts={thoughts} />

          {/* Dummy posts for styling demo */}

          {/*        {posts.map((post, index) => (
            <article key={index} className="border-[5px] border-[#06064d]">
              <div className="bg-[#06064d] text-[#c8efbb] flex flex-col sm:flex-row justify-between items-start sm:items-center px-4 py-4 gap-4">
                <h2 className="text-2xl sm:text-4xl font-bold leading-tight sm:max-w-[70%] break-words">
                  {post.title}
                </h2>
                <div className="text-right text-sm sm:text-base leading-snug font-medium flex-shrink-0 mt-2 sm:mt-0">
                  <p>{post.author} • {post.date}</p>
                </div>
              </div>

              <div className="px-4 py-5 text-[#222] text-base sm:text-xl leading-relaxed max-w-3xl">
                {post.content}
              </div>
            </article>   

          ))}      */}

        </div>
      </section>

      {/* Footer */}

    </main>
  );
}