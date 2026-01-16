import { ArticlesTableType, CareersTableType, ClientsTableType, ProjectsTableType, VendorsTableType } from "./tables";

async function fetchJson<T>(
    url: string,
    options?: RequestInit
): Promise<T> {
    const base = process.env.NEXT_PUBLIC_CLOUDFRONT_BASE!;

    const res = await fetch(`${base}/${url}`, { cache: "force-cache", ...options });

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
    return fetchJson<ArticlesTableType>("Blogs/blogsList.json");
}

export async function fetchProjects() {
    return fetchJson<ProjectsTableType>("projectList.json")
}

export function fetchProjectImage(url: string) {
    const base = process.env.NEXT_PUBLIC_CLOUDFRONT_BASE!;

    return `${base}/Projects/${url}`;
}

export async function fetchCareers() {
    return fetchJson<CareersTableType>("careerList.json")
}

export async function fetchClients() {
    return fetchJson<ClientsTableType>("clientList.json")
}

export async function fetchVendors() {
    return fetchJson<VendorsTableType>("vendorList.json")
}