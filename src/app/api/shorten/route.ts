import { NextResponse, type NextRequest } from "next/server";
import * as z from "zod";
import { url } from "@/server/db/schema";
import { db } from "@/server/db";
import { generateShortCode } from "@/app/_util/generate-short-code";
import { eq, and } from "drizzle-orm/sql/expressions/conditions";
const requestSchema = z.object({
  url: z.string().url(),
  userId: z.string().uuid(),
});

type RequestData = z.infer<typeof requestSchema>;

export async function POST(req: NextRequest) {
  const _context: unknown = await req.json();

  const data: RequestData = requestSchema.parse(_context);

  const shortCode = generateShortCode();

  try {
    const isUrlAlreadyExists = await db
      .select()
      .from(url)
      .where(and(eq(url.originalUrl, data.url), eq(url.userId, data.userId)));

    if (isUrlAlreadyExists.length > 0) {
      return new NextResponse(
        JSON.stringify({
          success: false,
          error: "URL already exists",
          shortCode,
        }),
        {
          status: 200,
        },
      );
    }

    await db
      .insert(url)
      .values({
        originalUrl: data.url,
        shortCode: shortCode,
        updatedAt: new Date(),
        userId: data.userId,
      })
      .execute();

    return new NextResponse(JSON.stringify({ success: true, shortCode }), {
      status: 200,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse(
        JSON.stringify({ success: false, error: error.errors }),
        { status: 400 },
      );
    }
    console.error(error);
    return new NextResponse(
      JSON.stringify({ success: false, error: "Internal Server Error" }),
      { status: 500 },
    );
  }
}
