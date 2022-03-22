import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/auth/interfaces/user.interface';
import { SourcesHelperService } from 'src/app/private/helpers/sources-helper.service';
import { SourceType } from 'src/app/private/interfaces/sources.interface';
import { SourcesService } from 'src/app/private/services/sources.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-book-source',
  templateUrl: './book-source.component.html',
  styleUrls: ['./book-source.component.css']
})
export class BookSourceComponent implements OnInit {

  @Input() bookSourceFlag = false;
  @Input() user:User;

  bookSourceForm: FormGroup;

  constructor( private _formBuilder: FormBuilder,
    private _sourcesService: SourcesService,
    private _router: Router,
    private _sourcesHelperService:SourcesHelperService ) { 
      this.createForm();
      this.addAuthorBook();
     }

  ngOnInit(): void { }

  createForm(){
    this.bookSourceForm = this._formBuilder.group({
      bookTitle: ['', Validators.required],
      authors: this._formBuilder.array([]),
      itsUnknowAuthor: [''],
      organization: [''],
      editorialName: ['', Validators.required],
      publishDateYear: ['', [Validators.required, Validators.min(1000), Validators.max(3000)]],
      bookSourceDoi: [''],
      bookSourceUrl: ['']
    });
  }

  addAuthorBook() {
    this.authorsBook.push(this._formBuilder.group(
      {
        authorInitials: [''],
        authorLastName: ['']
      }
    ));
  }

  saveSource( form: FormGroup, type: SourceType ) {

    if (form.valid) {
      
      const data = this._sourcesHelperService.setData(type, form);

      this._sourcesService.createSource(data, this.user).then(res => {
        Swal.fire({
          icon: 'success',
          title: 'Registro guardado',
          text: 'La fuente ha sido guardada exitosamente'
        });

        form.reset();
        // this.activateAddSource('noneClass');
        this._router.navigate(['private', 'dashboard', 'sources']);
      }).catch(error => {
        Swal.fire({
          title: 'Error al guardar el registro',
          icon: 'error',
          text: 'Hubo un error al guardar el registro'
        });
      });

    }

  }

  get authorsBook(): FormArray {
    return this.bookSourceForm.get('authors') as FormArray;
  }

  get bookTitleValid() {
    return this.bookSourceForm.get('bookTitle').valid && this.bookSourceForm.get('bookTitle').touched;
  }

  get bookTitleInvalid() {
    return this.bookSourceForm.get('bookTitle').invalid && this.bookSourceForm.get('bookTitle').touched;
  }
  
  get editorialNameValid() {
    return this.bookSourceForm.get('editorialName').valid && this.bookSourceForm.get('editorialName').touched;
  }

  get editorialNameInvalid() {
    return this.bookSourceForm.get('editorialName').invalid && this.bookSourceForm.get('editorialName').touched;
  }
  
  get publishDateYearValid() {
    return this.bookSourceForm.get('publishDateYear').valid && this.bookSourceForm.get('publishDateYear').touched;
  }

  get publishDateYearInvalid() {
    return this.bookSourceForm.get('publishDateYear').invalid && this.bookSourceForm.get('publishDateYear').touched;
  }



}
