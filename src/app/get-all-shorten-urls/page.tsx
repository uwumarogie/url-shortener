"use client";

import { useEffect, useState } from "react";
import type { URL } from "../_util/zod";
import { getManyUrlResponseSchema } from "../_util/zod";

export default function AllShortenURLFromUser() {
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

  return (
    <div className="flex flex-row items-center justify-center text-white">
      <h1>All Urls from user {userId}</h1>
      <ul>
        {urls.map((url) => (
          <li key={url.shortCode}>{url.originalUrl}</li>
        ))}
      </ul>
    </div>
  );
}
