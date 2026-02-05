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
    vi: string,
    en: string,
    projects: string[],
    icon: string
}

export type ClientsTableType = ClientTableType[];

export type ArticlesTableType = {
    newestProject: { title: string, url: string },
    newestAward: { title: string, url: string },
    newestEvent: { title: string, url: string },
    iframes: { src: string, width: number, height: number }[]
}

export type CareerTableType = {
    nameEn: string,
    nameVi: string,
    jobDescFileName: string,
    status: "fulltime" | "parttime" | "internship"
}

export type CareersTableType = {
    careerDir: string
    careers: CareerTableType[],
}

export type VendorTableType = {
    nameEn: string,
    nameVi: string,
    jobDescFileName: string,
}

export type VendorsTableType = {
    vendorDir: string
    vendors: CareerTableType[],
}