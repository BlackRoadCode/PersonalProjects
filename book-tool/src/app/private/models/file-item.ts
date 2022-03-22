
export class FileItem {

    public file:File;
    public name:string;
    public fileUrl:string;
    public size:number;
    public itsUploading:boolean;
    public progress:number;

    constructor( file:File ){
        this.file = file;
        this.name = file.name;
        this.size = file.size;
        this.itsUploading = false;
        this.progress = 0;
    }

}