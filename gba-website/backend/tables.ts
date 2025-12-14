export type ProjectType = {
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

export type ClientType = {
    name: string,
    logoSrc: string,
    projects: string[]
}

export type CareerType ={
    name: string,
    jobDescFileName: string,
    count: number
    status: "fulltime" | "parttime" | "internship"
}

export type ArticlesType = {
    newestProject: { title: string, url: string },
    newestAward: { title: string, url: string },
    newestEvent: { title: string, url: string },
    iframes: { src: string, width: number, height: number }[]
}