import { getUrl } from "@/server/actions";
import {redirect} from "next/navigation";

export default async function Shortcode({
  params,
}: {
  params: {
    shortCode: string;
  };
}) {

  const originalUrl = await getUrl(params.shortCode);

  if (originalUrl) {
    return redirect(originalUrl);
  } else {
    return <h1>404 - URL Not Found</h1>;
  }
}
