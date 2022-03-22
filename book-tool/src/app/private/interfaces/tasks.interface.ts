
export interface TasksList { 
    lid:string,
    tltitle:string,
    tasks:Task[]
}

export interface Task{
    description:string,
    creationDate:string,
    status?:boolean,
    endDate?:string
}