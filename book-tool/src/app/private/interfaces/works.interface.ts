
export interface Work {
    wid:string,
    woid?:number,
    author:string,
    title:string,
    idea?:string,
    bodyContent?:string,
    creationDate?:string
}

export interface EditorWork{
    atributtes:{
        font:string
    },
    insert:string
}
