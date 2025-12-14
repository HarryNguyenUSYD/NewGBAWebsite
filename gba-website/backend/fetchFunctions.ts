import { ArticlesType } from "./tables";

async function fetchJson<T>(
    url: string,
    options?: RequestInit
): Promise<T> {
    const base = process.env.NEXT_PUBLIC_CLOUDFRONT_BASE!;

    const res = await fetch(`${base}/${url}`, {
        next: { revalidate: 300 },
        ...options,
    });

    if (!res.ok) {
        throw new Error(`Failed to fetch ${url}: ${res.status}`);
    }

    return res.json() as Promise<T>;
}

export function fetchImageOrFile(url: string) {
    const base = process.env.NEXT_PUBLIC_CLOUDFRONT_BASE!;

    return `${base}/${url}`;
}

export async function fetchArticles() {
    return fetchJson<ArticlesType>("Blogs/blogsList.json");
}