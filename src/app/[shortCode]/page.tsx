import { getOriginalUrl } from "@/server/actions";
import { redirect } from "next/navigation";

export default async function ShortCode({
  params,
}: {
  params: {
    shortCode: string;
  };
}) {
  const originalUrl = await getOriginalUrl(params.shortCode);

  if (originalUrl) {
    return redirect(originalUrl);
  } else {
    return <h1>404 - URL Not Found</h1>;
  }
}
