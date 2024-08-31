"use server";

import { NextResponse, type NextRequest } from "next/server";
import { revalidatePath } from "next/cache";

import * as z from "zod";
import { url } from "@/server/db/schema";
import { db } from "@/server/db";
import { eq, and } from "drizzle-orm/sql/expressions/conditions";
const requestSchema = z.object({
  shortCode: z.string(),
  originalUrl: z.string(),
});
export async function POST(req: NextRequest) {
  const _context: unknown = await req.json();
  const { shortCode, originalUrl } = requestSchema.parse(_context);

  try {
    await db
      .delete(url)
      .where(
        and(eq(url.shortCode, shortCode), eq(url.originalUrl, originalUrl)),
      )
      .execute();
    revalidatePath("/get-all-shorten-urls");
    return new NextResponse(JSON.stringify({ success: true }), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new NextResponse(
      JSON.stringify({
        success: false,
        error: "Internal Server Error",
      }),
      { status: 500 },
    );
  }
}
