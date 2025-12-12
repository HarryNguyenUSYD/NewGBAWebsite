export interface Project {
    name: string,
    id: string,
    startDate: string,
    endDate: string,
    clientName: string,
    serviceType: string,
    siteAddress: string,
    scale: number,
    projectType: string,
    folderName: string,
    coverImage: string,
    images: string[]
}

export interface Client {
    name: string,
    logoSrc: string,
    projects: string[]
}

export interface Career {
    name: string,
    jobDescFileName: string,
    count: number
    status: "fulltime" | "parttime" | "internship"
}