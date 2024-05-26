import {ClientRedirect} from "@/app/_components/client";
import {getUrl} from "@/server/actions";

export default async function Shortcode({params}: {params: {
    shortCode: string
    }}) {

    const originalUrl = await getUrl(params.shortCode);

    if (originalUrl) {
        return (
            <ClientRedirect originalUrl={originalUrl} />
        );
    } else {
        return <h1>404 - URL Not Found</h1>;
    }
}