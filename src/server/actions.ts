import {db} from "@/server/db";
import {url} from "@/server/db/schema";
import {eq} from "drizzle-orm/sql/expressions/conditions";

export async function getUrl (shortCode: string) {
    const result = await fetchUrlByShortCode(shortCode);
    if (result[0] !== undefined) {
        return result[0].originalUrl;
    }
    return "";
}

export async function fetchUrlByShortCode(shortCode: string) {
    return await db.select().from(url).where(eq(url.shortCode, shortCode)).execute();
}