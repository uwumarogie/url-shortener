'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function ClientRedirect ({ originalUrl }: {originalUrl: string})  {
    const router = useRouter();

    useEffect(() => {
        router.replace(originalUrl);
    }, [originalUrl, router]);

    return null;
}