"use client";

import { useState } from "react";

export default function SignupPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Signup attempt:", { username, email, password });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md border border-black">
        <h1 className="text-2xl font-bold mb-6 text-center text-black">Sign Up</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium text-black">Username</label>
            <input
              type="text"
              placeholder="Your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-black text-black"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-black">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-black text-black"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-black">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-black text-black"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition">
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-black">
          Already have an account? <a href="/login" className="underline">Login</a>
        </p>
      </div>
    </div>
  );
}