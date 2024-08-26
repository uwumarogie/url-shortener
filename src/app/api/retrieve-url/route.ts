import { NextResponse, type NextRequest } from "next/server";
import * as z from "zod";
import { url } from "@/server/db/schema";
import { db } from "@/server/db";
import { eq } from "drizzle-orm/sql/expressions/conditions";

const requestSchema = z.object({
  userId: z.string(),
});
export async function POST(req: NextRequest) {
  const _context: unknown = await req.json();
  const { userId } = requestSchema.parse(_context);

  try {
    const entries = await db.select().from(url).where(eq(url.userId, userId));
    const urls = entries.map((entry) => {
      return { originalUrl: entry.originalUrl, shortCode: entry.shortCode };
    });
    if (urls.length === 0) {
      return new NextResponse(
        JSON.stringify({
          success: false,
          urls: [],
        }),
        {
          status: 404,
        },
      );
    }

    return new NextResponse(JSON.stringify({ success: true, urls }), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new NextResponse(
      JSON.stringify({
        success: false,
        error: "Internal Server Error",
        urls: [],
      }),
      { status: 500 },
    );
  }
}
