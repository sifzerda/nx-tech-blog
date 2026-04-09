"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../lib/authContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        login(data.token);
        router.push("/");
      } else {
        setMessage(data.error || "Login failed");
      }
    } catch (err) {
      setMessage("Login failed. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col items-center w-full mt-6 sm:mt-8 px-2 sm:px-4">
      <div className="w-full max-w-md border-[5px] border-[#06064d] rounded-lg shadow-lg">
        {/* Header */}
        <div className="bg-[#06064d] text-[#c8efbb] px-4 sm:px-6 py-3 sm:py-4 rounded-t-lg text-center">
          <h1 className="text-2xl sm:text-3xl font-bold">Login</h1>
        </div>

        {/* Form */}
        <div className="bg-[#c8efbb] border-t-[5px] border-[#06064d] px-4 sm:px-6 py-4 sm:py-6 rounded-b-lg space-y-4">
          {message && (
            <p className="text-red-600 text-sm text-center font-medium">{message}</p>
          )}

          <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
            <div>
              <label className="block mb-1 font-medium text-black text-sm sm:text-base">
                Email
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 sm:px-4 py-2 border border-black rounded-md focus:outline-none bg-white focus:ring-2 focus:ring-black text-black text-sm sm:text-base"
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-black text-sm sm:text-base">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 sm:px-4 py-2 border border-black rounded-md focus:outline-none bg-white focus:ring-2 focus:ring-black text-black text-sm sm:text-base"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#06064d] text-[#c8efbb] py-2 sm:py-2.5 rounded-md font-semibold hover:bg-[#05053c] transition text-sm sm:text-base">
              Login
            </button>
          </form>

          <p className="text-center text-xs sm:text-sm text-black mt-2">
            Don't have an account?{" "}
            <a href="/signup" className="underline">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}