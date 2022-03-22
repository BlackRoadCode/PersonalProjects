export type Priority = 'clow' | 'bmedium' | 'ahigh' ;

export interface Note {
    nid:string,
    title:string,
    subtitle?:string,
    text?:string,
    textLink?:string,
    link?:string,
    priority?:Priority,
    creationDate?:string
}