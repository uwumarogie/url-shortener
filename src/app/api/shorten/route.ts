import { NextResponse, type NextRequest } from "next/server";
import * as z from "zod";
import { url } from "@/server/db/schema";
import { db } from "@/server/db";
import { generateShortCode } from "@/app/_util/generate-short-code";

const requestSchema = z.object({
  url: z.string().url(),
});

type RequestData = z.infer<typeof requestSchema>;

export async function POST(req: NextRequest) {
  const _context: unknown = await req.json();

  const data: RequestData = requestSchema.parse(_context);

  const shortCode = generateShortCode();
  try {
    await db
      .insert(url)
      .values({
        originalUrl: data.url,
        shortCode: shortCode,
        updatedAt: new Date(),
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
