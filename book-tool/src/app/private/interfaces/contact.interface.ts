
export type Status = 'OPEN' | 'TRANSIT' | 'CLOSED' ;

export type Priority = 'LOW' | 'MEDIUM' | 'HIGH' ;

export interface Contact {
    cid:string,
    motive:string,
    text?:string,
    priority?:Priority,
    creationDate?:string,
    userEmail?:string,
    status?:Status
}