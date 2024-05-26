"use client";

import React, { useState } from "react";
import * as z from "zod"

const responseSchema = z.object({
  success: z.boolean(),
  shortCode: z.string().optional(),
  error: z.string().optional()
})

export default function HomePage() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortCode, setShortCode] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
   e.preventDefault();
    const response = await fetch("/api/shorten", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: originalUrl }),
    });
    const data: unknown = await response.json();
    const result = responseSchema.parse(data);

    if (result.success) {
      setShortCode(result.shortCode ?? "");
    } else {
      console.error("Error:", result.error);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 ">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <h1 className="mb-6 text-center text-3xl font-bold text-gray-800">
          URL Shortener
        </h1>
        <form className="space-y-4" onSubmit={(e) => handleSubmit(e)}>
          <div>
            <label
              className="mb-2 block font-medium text-gray-700"
              htmlFor="longUrl"
            >
              Long URL
            </label>
            <input
              className="w-full"
              id="longUrl"
              placeholder="Enter your long URL"
              required
              type="url"
              onChange={(e) => setOriginalUrl(e.target.value)}
            />
          </div>
          <button className="w-full" type="submit">
            Shorten URL
          </button>
        </form>
        <div className="mt-6">
          <h2 className="mb-2 text-lg font-semibold text-gray-700">
            Short URL
          </h2>
          <div className="flex items-center justify-between rounded-md bg-gray-200 px-4 py-2">
            <span className="truncate text-gray-800">
              {"http://localhost:3000/" + shortCode}
            </span>
            <button onClick={async () => {
              await window.navigator.clipboard.writeText(`http://localhost:3000/${shortCode}`).then(() => alert("Copied")).catch(() => alert("Failed to copy"))
            }} >Copy</button>
          </div>
        </div>
      </div>
    </div>
  );
}
