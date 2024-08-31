import * as z from "zod";

export const responseShortenUrlSchema = z.object({
  success: z.boolean(),
  shortCode: z.string().optional(),
  error: z.string().optional(),
});

export const getManyUrlSchema = z.object({
  originalUrl: z.string(),
  shortCode: z.string(),
});

export type URL = z.infer<typeof getManyUrlSchema>;

export const getManyUrlResponseSchema = z.object({
  success: z.boolean(),
  urls: z.array(z.object({ originalUrl: z.string(), shortCode: z.string() })),
  error: z.string().optional(),
});

export const deleteUrlResponseSchema = z.object({
  success: z.boolean(),
  error: z.string().optional(),
});
