export type ProjectsTableType = {
    projectDir: string,
    projects: ProjectTableType[]
}

export type ProjectTableType = {
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

export type ClientTableType = {
    name: string,
    logoSrc: string,
    projects: string[]
}

export type CareerTableType ={
    name: string,
    jobDescFileName: string,
    count: number
    status: "fulltime" | "parttime" | "internship"
}

export type ArticlesTableType = {
    newestProject: { title: string, url: string },
    newestAward: { title: string, url: string },
    newestEvent: { title: string, url: string },
    iframes: { src: string, width: number, height: number }[]
}