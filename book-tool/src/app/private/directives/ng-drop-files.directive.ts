import { Directive, EventEmitter, ElementRef, HostListener, Input, Output } from '@angular/core';
import { FileItem } from '../models/file-item';

@Directive({
  selector: '[appNgDropFiles]'
})
export class NgDropFilesDirective {

  @Input() files:FileItem[] = [];
  @Output() mouseOver:EventEmitter<boolean> = new EventEmitter();
  @Output() droped:EventEmitter<boolean> = new EventEmitter();

  public toastSize = false;

  constructor() { }

  @HostListener('dragover', ['$event'])
  public onDragEnter( event:any ){
    this.mouseOver.emit(true);
    this._preventAndStop( event );
  }
  
  @HostListener('dragleave', ['$event'])
  public onDragLeave( event:any ){
    this.mouseOver.emit(false);
  }
  
  @HostListener('drop', ['$event'])
  public onDrop( event:any ){
    
    const transfer = this._getTransfer( event );
    
    if( !transfer ){ return; }
    
    this._extractFile( transfer.files );
    this._preventAndStop( event );
    this.droped.emit(true);
    
    this.mouseOver.emit(false);
  }

  private _getTransfer( event:any ){    
    return event.dataTransfer ? event.dataTransfer : event.originalEvent.dataTransfer;
  }

  private _extractFile( listFiles:FileList ){

    for ( const property in Object.getOwnPropertyNames( listFiles ) ){
      const fileTemp = listFiles[property]; 

      if ( this._fileCanBeSaved( fileTemp ) ){
        const newFile = new FileItem( fileTemp );
        this.files.push(newFile);

      }
    }


  }

  // Validaciones

  private _fileCanBeSaved( file:File):boolean{
    if( !this._fileAlreadyDropped( file.name ) && this._isImage( file.type ) && this._correctSize( file.size ) ){
      return true;
    }else{
      return false;
    }
  }

  private _preventAndStop( event ){
    event.preventDefault();
    event.stopPropagation();
  }

  private _fileAlreadyDropped( fileName:string ):boolean{

    for( const file of this.files ){
      if( file.name == fileName ){
        console.log('El archivo ' + fileName + ' ya existe');
        return true;
      }
    }

    return false;
  }

  private _isImage( fileType:string ):boolean{
    return ( fileType === '' || fileType === undefined ) ? false : fileType.startsWith('image');
  }

  private _correctSize( fileSize:number ):boolean{
    this.toastSize = true;
    return ( fileSize >= 155000 ) ? false : true;

  }

}
