"use client";

import { useEffect, useState } from "react";
import type { URL } from "../_util/zod";
import {
  getManyUrlResponseSchema,
  deleteUrlResponseSchema,
} from "../_util/zod";
import Link from "next/link";

export default function EveryShortenURLFromUser() {
  const [urls, setUrls] = useState<URL[]>([]);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const storeUserId = localStorage.getItem("userId");

    setUserId(storeUserId ?? "");
    async function retrieveUrl() {
      const response = await fetch(`/api/retrieve-url`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });
      const data: unknown = await response.json();
      const validData = getManyUrlResponseSchema.parse(data);

      if (validData.success) {
        setUrls(validData.urls);
      } else {
        console.error("Failed to fetch urls:", validData.error);
      }
    }

    if (storeUserId) {
      retrieveUrl().catch((error) =>
        console.error("Failed to fetch urls:", error),
      );
    }
  }, [userId]);

  async function handleDelete(shortCode: string, originalUrl: string) {
    const response = await fetch(`/api/delete-url`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ shortCode, originalUrl }),
    });

    const data: unknown = await response.json();
    const validData = deleteUrlResponseSchema.parse(data);
    if (validData.success) {
      console.log("Url deleted successfully");
    } else {
      console.error("Failed to delete url:", validData.error);
    }
  }
  return urls.length === 0 ? (
    <div className="flex min-h-screen flex-col items-center justify-center space-y-9 border border-2 border-white">
      <h1 className="text-3xl font-extrabold">No Urls found</h1>
      <h2>Please create a new url</h2>
      <Link
        href="/"
        prefetch
        className="rounded-xl bg-white p-4 text-black hover:bg-gray-200 focus:bg-gray-200"
      >
        Go back to the homepage
      </Link>
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center space-y-10 bg-black text-white">
      <h1 className="text-3xl font-extrabold">All Urls from user</h1>
      <ul>
        {urls.map((url) => (
          <div
            key={url.shortCode}
            className="flex flex-col items-center justify-center space-y-2 rounded-xl border border-white p-4"
          >
            <Link href={`/${url.shortCode}`} className="text-white">
              {`${window.location.origin}/${url.shortCode}`}
            </Link>
            <li key={url.shortCode}>{url.originalUrl}</li>
            <div className="flex flex-row items-center justify-center space-x-5">
              <button
                className="rounded-xl p-4 hover:bg-gray-200 hover:text-black focus:bg-gray-200"
                onClick={() => handleDelete(url.shortCode, url.originalUrl)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
}
