
export interface Timeline { 
    tlid:string,
    title:string,
    type?:string,
    creationDate?:string,
    nodes:TimelineNode[]
}

export interface TimelineNode {
    nid:string,
    nodeTitle?:string,
    textNode?:string,
    factDate?:string,
    nodeColor?:string,
    nodeClass?:string
}