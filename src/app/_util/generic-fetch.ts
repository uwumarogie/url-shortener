import * as z from "zod";

export async function fetchData(
  slug: string,
  body: object,
  schema: z.ZodTypeAny,
) {
  const response = await fetch(`/api/${slug}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const data: unknown = await response.json();
  return schema.parse(data);
}
