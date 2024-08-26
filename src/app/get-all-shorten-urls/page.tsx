"use client";

import { useEffect, useState } from "react";
import { getManyUrlResponseSchema } from "../_util/zod";
import { URL } from "../_util/zod";
import { fetchData } from "../_util/generic-fetch";

export default function AllShortenURLFromUser() {
  const [urls, setUrls] = useState<URL[]>([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    async function retrieveUrl() {
      const result = await fetchData(
        "/api/retrieve-url",
        { userId },
        getManyUrlResponseSchema,
      );

      if (result.success) {
        setUrls(result.urls);
      }
    }
    retrieveUrl();
  }, [userId, urls]);

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
