"use client";

import React, { useState, useEffect, useRef } from "react";
import QRCodeGenerator from "@/app/_components/qr-code-generator";
import { v4 as uuidv4 } from "uuid";
import Link from "next/link";
import { responseShortenUrlSchema } from "./_util/zod";

export default function HomePage() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortCode, setShortCode] = useState<string | undefined>(undefined);
  const userRef = useRef("");

  useEffect(() => {
    const userId = uuidv4();
    userRef.current = userId;
    localStorage.setItem("userId", userId);
  }, []);

  if (typeof window === undefined) {
    return <div>Loading...</div>;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch(`/api/shorten`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: originalUrl, userId: userRef.current }),
    });
    const data: unknown = await response.json();
    const validData = responseShortenUrlSchema.parse(data);
    if (validData.success) {
      setShortCode(validData.shortCode ?? "");
    } else {
      console.error("Error:", validData.error);
    }
  };

  return (
    <>
      <Link
        href="/get-all-shorten-urls"
        prefetch
        className="rounded-xl bg-white p-4 text-black hover:bg-gray-200 focus:bg-gray-200"
      >
        List your shortened URLs
      </Link>
      <div className="flex min-h-screen flex-col items-center justify-center bg-black">
        <div className="w-full max-w-md scale-125 rounded-xl bg-white p-6 shadow-lg">
          <h1 className="mb-6 text-center text-3xl font-bold text-gray-800">
            URL Shortener
          </h1>
          <form className="space-y-4" onSubmit={(e) => handleSubmit(e)}>
            <div>
              <input
                className="w-full rounded-xl p-4 text-black"
                id="longUrl"
                placeholder="Enter your long URL"
                required
                type="url"
                onChange={(e) => setOriginalUrl(e.target.value)}
              />
            </div>
            <button
              className="w-full rounded-xl border border-black text-black hover:bg-gray-200 focus:bg-gray-200"
              type="submit"
            >
              Shorten
            </button>
          </form>
          <div className="mt-6">
            {shortCode && (
              <div className="mt-6">
                <h2 className="mb-2 text-lg font-semibold text-gray-700">
                  Short URL
                </h2>
                <div className="flex items-center justify-between rounded-xl bg-gray-200 px-4 py-2">
                  {typeof window !== "undefined" && (
                    <>
                      <span className="truncate text-gray-800">
                        {`${window.location.origin}/${shortCode}`}
                      </span>
                      <button
                        onClick={async () => {
                          await window.navigator.clipboard
                            .writeText(`${window.location.origin}/${shortCode}`)
                            .then(() => alert("Copied"))
                            .catch(() => alert("Failed to copy"));
                        }}
                        className="rounded-l-none hover:text-black"
                      >
                        Copy
                      </button>
                    </>
                  )}
                </div>
                {typeof window !== "undefined" && shortCode && (
                  <QRCodeGenerator
                    shortUrl={`${window.location.origin}/${shortCode}`}
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
