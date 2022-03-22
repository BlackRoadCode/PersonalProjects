
export interface GeneratedName {
    name?:Name,
    lastName?:LastName,
}

export interface Name {
    id?: number, 
    name?:string,
    origin?:string,
    gender?:string,
    meaning?: string
}

export interface LastName {
    id?: number, 
    lastname?:string,
    origin?:string,
    meaning?: string
}