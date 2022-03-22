
export type SourceType = 'webpage' | 'scientificMagazine' | 'book' | 'report' | 'image' ;

// export interface SourceList{
//     slid:string,
//     sources:Source[]
// }

export interface Source{
    sid:string,
    sourceType:SourceType,
    authors?:Author[],
    publicationDate?:SourceDate,
    consultDate?:SourceDate
    websiteName?:string,
    webPageTitle?:string,
    webPageUrl?:string,
    
    editorialName?:string,
    bookSourceDoi?:string,
    bookSourceUrl?:string,
    bookTitle?:string
}

export interface Author{
    initials?:string,
    lastName?:string,
    organization?:string
}

export interface SourceDate{
    day?:string,
    month?:string,
    year?:string
}
